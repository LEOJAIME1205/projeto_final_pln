import axios from 'axios';
import type { AxiosError, AxiosInstance } from 'axios';
import { config } from '../utils/config';

export interface ApiError {
  status: number;
  message: string;
  details?: string;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.API_BASE_URL,
      timeout: config.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<{ detail?: string }>) => {
        const apiError: ApiError = {
          status: error.response?.status || 500,
          message: error.message || 'Unknown error occurred',
          details: error.response?.data?.detail,
        };

        if (config.ENABLE_DEBUG) {
          console.error('API Error:', apiError);
        }

        return Promise.reject(apiError);
      }
    );
  }

  public get instance() {
    return this.client;
  }
}

export const apiClient = new ApiClient();
