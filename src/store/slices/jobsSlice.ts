import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { jobService } from '../../services/jobService';
import type { Job, JobFiltersState, JobSearchParams, JobListResponse } from '../../types/job';

export interface JobsState {
  jobs: Job[];
  selectedJob: Job | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  totalJobs: number;
  catalogTotalCount: number;
  filters: JobFiltersState;
}

const initialFilters: JobFiltersState = {
  search: '',
  technologies: [],
  dateRange: 'all',
  experienceLevel: 'all',
};

const initialState: JobsState = {
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  totalJobs: 0,
  catalogTotalCount: 0,
  filters: initialFilters,
};

export const fetchJobs = createAsyncThunk<
  JobListResponse,
  Partial<JobSearchParams> | void,
  { state: { jobs: JobsState }; rejectValue: string }
>(
  'jobs/fetchJobs',
  async (params, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { currentPage, pageSize, filters } = state.jobs;

      const mergedParams: JobSearchParams = {
        page: params?.page ?? currentPage,
        pageSize: params?.pageSize ?? pageSize,
        search: params?.search ?? filters.search,
        technologies: params?.technologies ?? filters.technologies,
        dateRange: params?.dateRange ?? filters.dateRange,
        experienceLevel: params?.experienceLevel ?? filters.experienceLevel,
      };

      const response = await jobService.getJobs(mergedParams);
      return response;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch job opportunities.';
      return rejectWithValue(message);
    }
  }
);

export const fetchJobById = createAsyncThunk<
  Job,
  string,
  { rejectValue: string }
>(
  'jobs/fetchJobById',
  async (id: string, { rejectWithValue }) => {
    try {
      const job = await jobService.getJobById(id);
      if (!job) {
        return rejectWithValue('Job not found.');
      }
      return job;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch job details.';
      return rejectWithValue(message);
    }
  }
);

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs(state, action: PayloadAction<Job[]>) {
      state.jobs = action.payload;
    },
    setSelectedJob(state, action: PayloadAction<Job | null>) {
      state.selectedJob = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = Math.max(1, action.payload);
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = Math.max(1, action.payload);
      state.currentPage = 1;
    },
    setFilters(state, action: PayloadAction<Partial<JobFiltersState>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    clearFilters(state) {
      state.filters = initialFilters;
      state.currentPage = 1;
    },
    clearJobs(state) {
      state.jobs = [];
      state.totalJobs = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchJobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.total;
        state.currentPage = action.payload.page;
        state.pageSize = action.payload.pageSize;

        const hasActiveFilters =
          Boolean(state.filters.search.trim()) ||
          state.filters.technologies.length > 0 ||
          state.filters.dateRange !== 'all' ||
          state.filters.experienceLevel !== 'all';

        if (!hasActiveFilters || state.catalogTotalCount === 0) {
          state.catalogTotalCount = action.payload.total;
        }
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch job opportunities.';
      })
      // fetchJobById
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch job details.';
      });
  },
});

export const {
  setJobs,
  setSelectedJob,
  setLoading,
  setError,
  setCurrentPage,
  setPageSize,
  setFilters,
  clearFilters,
  clearJobs,
} = jobsSlice.actions;

export default jobsSlice.reducer;
