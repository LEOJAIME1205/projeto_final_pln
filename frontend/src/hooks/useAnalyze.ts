import { useState, useCallback } from 'react';
import { analyzeMessage } from '../api/analyze.api';
import type { AnalyzeResponse, AnalysisRecord } from '../types/analyze';
import type { ApiError } from '../api/client';

interface UseAnalyzeState {
  data: AnalyzeResponse | null;
  loading: boolean;
  error: ApiError | null;
}

export const useAnalyze = () => {
  const [state, setState] = useState<UseAnalyzeState>({
    data: null,
    loading: false,
    error: null,
  });

  const analyze = useCallback(async (message: string): Promise<AnalysisRecord | null> => {
    setState({ data: null, loading: true, error: null });

    try {
      const response = await analyzeMessage({ message });
      setState({ data: response, loading: false, error: null });

      // Return analysis record with metadata
      return {
        id: `${Date.now()}`,
        message,
        timestamp: Date.now(),
        ...response,
      };
    } catch (err) {
      const apiError = err as ApiError;
      setState({ data: null, loading: false, error: apiError });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    analyze,
    reset,
  };
};
