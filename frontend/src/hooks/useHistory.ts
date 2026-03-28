import { useState, useEffect, useCallback } from 'react';
import type { AnalysisRecord } from '../types/analyze';

const STORAGE_KEY = 'zapguard_analysis_history';
const MAX_HISTORY_ITEMS = 50;

export const useHistory = () => {
  const [history, setHistory] = useState<AnalysisRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AnalysisRecord[];
        setHistory(parsed);
      }
    } catch (error) {
      console.error('Failed to load history from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      } catch (error) {
        console.error('Failed to save history to localStorage:', error);
      }
    }
  }, [history, isLoaded]);

  const addRecord = useCallback((record: AnalysisRecord) => {
    setHistory((prev) => {
      // Add new record at the beginning
      const newHistory = [record, ...prev];
      // Keep only the last MAX_HISTORY_ITEMS
      return newHistory.slice(0, MAX_HISTORY_ITEMS);
    });
  }, []);

  const removeRecord = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    isLoaded,
    addRecord,
    removeRecord,
    clearHistory,
  };
};
