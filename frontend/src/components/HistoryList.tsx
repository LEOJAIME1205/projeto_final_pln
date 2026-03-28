import type { AnalysisRecord } from '../types/analyze';
import { EmptyState } from './EmptyState';

interface HistoryListProps {
  records: AnalysisRecord[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const HistoryList = ({ records, onRemove, onClear }: HistoryListProps) => {
  if (records.length === 0) {
    return <EmptyState />;
  }

  const formatDate = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 60000) return 'Agora mesmo';
    if (diff < 3600000) return `há ${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `há ${Math.floor(diff / 3600000)}h`;
    
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span></span>
          Histórico ({records.length})
        </h3>
        <button
          onClick={onClear}
          className="text-sm px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
        >
          🗑️ Limpar
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {records.map((record) => (
          <div
            key={record.id}
            className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
              record.is_phishing
                ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-700 hover:border-red-400'
                : 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-700 hover:border-green-400'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-lg ${record.is_phishing ? '🚨' : '✅'}`}></span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {record.message}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(record.timestamp)}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-bold rounded-lg ${
                      record.is_phishing
                        ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                        : 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                    }`}
                  >
                    {Math.round(record.confidence * 100)}%
                  </span>
                </div>
              </div>
              <button
                onClick={() => onRemove(record.id)}
                className="flex-shrink-0 text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                title="Remover"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
