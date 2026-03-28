import { apiClient } from './client';
import type { AnalyzeRequest, AnalyzeResponse } from '../types/analyze';

export const analyzeMessage = async (request: AnalyzeRequest): Promise<AnalyzeResponse> => {
  const response = await apiClient.instance.post<AnalyzeResponse>('/api/v1/analyze', request);
  return response.data;
};
