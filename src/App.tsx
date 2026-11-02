import type { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApplicationProvider } from './context/ApplicationContext';
import { AppRoutes } from './routes';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <ApplicationProvider>
        <AppRoutes />
      </ApplicationProvider>
    </BrowserRouter>
  );
};

export default App;
