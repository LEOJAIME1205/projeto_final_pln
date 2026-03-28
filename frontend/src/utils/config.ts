const getConfig = () => ({
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '5000', 10),
  ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
});

export const config = getConfig();
