import { AnalyzeForm } from '../components/AnalyzeForm';
import { ResultCard } from '../components/ResultCard';
import { HistoryList } from '../components/HistoryList';
import { Header } from '../components/Header';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAnalyze } from '../hooks/useAnalyze';
import { useHistory } from '../hooks/useHistory';

export const AnalyzePage = () => {
  const { data, loading, error, analyze, reset } = useAnalyze();
  const { history, isLoaded, addRecord, removeRecord, clearHistory } = useHistory();

  const handleAnalyze = async (message: string) => {
    const record = await analyze(message);
    if (record) {
      addRecord(record);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form and Result */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
              <AnalyzeForm onSubmit={handleAnalyze} isLoading={loading} />
            </div>

            {/* Result or Loading or Error */}
            {loading && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                <LoadingSpinner />
              </div>
            )}

            {error && !loading && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">❌</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-800 dark:text-red-200 mb-2">
                      Erro ao conectar
                    </h3>
                    <p className="text-red-700 dark:text-red-300 mb-2">
                      {error.message}
                    </p>
                    {error.details && (
                      <p className="text-red-600 dark:text-red-400 text-sm border-t border-red-300 dark:border-red-700 pt-2 mt-2">
                        {error.details}
                      </p>
                    )}
                    <p className="text-sm text-red-600 dark:text-red-400 mt-4">
                      💡 Dica: Verifique se o backend está rodando em http://localhost:8000
                    </p>
                  </div>
                </div>
              </div>
            )}

            {data && !loading && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                     Resultado da Análise
                  </h2>
                  <button
                    onClick={reset}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    ↺ Nova Análise
                  </button>
                </div>
                <ResultCard result={data} />
              </div>
            )}
          </div>

          {/* Right Column - History (Sticky) */}
          {isLoaded && (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100 dark:border-gray-700 sticky top-4 max-h-[calc(100vh-100px)] overflow-hidden flex flex-col">
                <HistoryList
                  records={history}
                  onRemove={removeRecord}
                  onClear={clearHistory}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
             ZapGuard ajuda a proteger contra phishing e fraudes. Use com responsabilidade.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
};
