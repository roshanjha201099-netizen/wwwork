export type DataMode = 'mock' | 'api';

export interface AppConfig {
  apiBaseUrl: string;
  dataMode: DataMode;
  isMock: boolean;
  isApi: boolean;
}

const rawMode = (import.meta.env.VITE_DATA_MODE || 'mock').toLowerCase().trim();
const validMode: DataMode = rawMode === 'api' ? 'api' : 'mock';

export const config: AppConfig = {
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/+$/, ''),
  dataMode: validMode,
  isMock: validMode === 'mock',
  isApi: validMode === 'api',
};

export default config;
