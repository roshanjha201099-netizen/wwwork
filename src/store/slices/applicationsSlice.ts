import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { applicationService } from '../../services/applicationService';
import type { Job } from '../../types/job';

export interface ApplicationsState {
  appliedJobIds: string[];
  appliedJobs: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: ApplicationsState = {
  appliedJobIds: [],
  appliedJobs: [],
  loading: false,
  error: null,
};

export const fetchApplications = createAsyncThunk<
  { ids: string[]; jobs: Job[] },
  void,
  { rejectValue: string }
>(
  'applications/fetchApplications',
  async (_, { rejectWithValue }) => {
    try {
      const [ids, jobs] = await Promise.all([
        applicationService.getAppliedJobIds(),
        applicationService.getAppliedJobs(),
      ]);
      return { ids, jobs };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch application records.';
      return rejectWithValue(message);
    }
  }
);

export const applyJob = createAsyncThunk<
  string,
  Job,
  { rejectValue: string }
>(
  'applications/applyJob',
  async (job, { rejectWithValue }) => {
    try {
      await applicationService.applyToJob(job.id);
      return job.id;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to record application.';
      return rejectWithValue(message);
    }
  }
);

export const unapplyJob = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'applications/unapplyJob',
  async (jobId, { rejectWithValue }) => {
    try {
      await applicationService.removeApplication(jobId);
      return jobId;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to remove application.';
      return rejectWithValue(message);
    }
  }
);

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications(state, action: PayloadAction<Job[]>) {
      state.appliedJobs = action.payload;
      state.appliedJobIds = action.payload.map((j) => j.id);
    },
    addApplication(state, action: PayloadAction<string>) {
      if (!state.appliedJobIds.includes(action.payload)) {
        state.appliedJobIds.push(action.payload);
      }
    },
    removeApplication(state, action: PayloadAction<string>) {
      state.appliedJobIds = state.appliedJobIds.filter((id) => id !== action.payload);
      state.appliedJobs = state.appliedJobs.filter((job) => job.id !== action.payload);
    },
    clearApplications(state) {
      state.appliedJobIds = [];
      state.appliedJobs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchApplications
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedJobIds = action.payload.ids;
        state.appliedJobs = action.payload.jobs;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch application records.';
      })
      // applyJob
      .addCase(applyJob.pending, (state, action) => {
        const jobId = action.meta.arg.id;
        if (!state.appliedJobIds.includes(jobId)) {
          state.appliedJobIds.push(jobId);
          state.appliedJobs.push(action.meta.arg);
        }
      })
      .addCase(applyJob.rejected, (state, action) => {
        const jobId = action.meta.arg.id;
        state.appliedJobIds = state.appliedJobIds.filter((id) => id !== jobId);
        state.appliedJobs = state.appliedJobs.filter((job) => job.id !== jobId);
        state.error = action.payload || 'Failed to record application.';
      })
      // unapplyJob
      .addCase(unapplyJob.pending, (state, action) => {
        const jobId = action.meta.arg;
        state.appliedJobIds = state.appliedJobIds.filter((id) => id !== jobId);
        state.appliedJobs = state.appliedJobs.filter((job) => job.id !== jobId);
      })
      .addCase(unapplyJob.rejected, (state, action) => {
        state.error = action.payload || 'Failed to remove application.';
      });
  },
});

export const {
  setApplications,
  addApplication,
  removeApplication,
  clearApplications,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
