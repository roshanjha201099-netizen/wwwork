import { useEffect, type FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchCurrentUser } from './store/slices/authSlice';
import { fetchApplications } from './store/slices/applicationsSlice';
import { selectAuthInitialized } from './store/selectors/authSelectors';
import { AppRoutes } from './routes';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectAuthInitialized);

  // Initial application bootstrap - runs strictly once on startup
  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchApplications());
  }, [dispatch]);

  // Prevent briefly displaying unauthenticated states before the session check completes
  if (!initialized) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center p-4 text-[13px] text-[#737373] space-y-3">
        <div className="w-5 h-5 border-2 border-[#171717] border-t-transparent rounded-full animate-spin" />
        <p className="font-medium tracking-tight">Initializing workspace...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
