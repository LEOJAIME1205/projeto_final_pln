import type { AnalyzeResponse } from '../types/analyze';

interface ResultCardProps {
  result: AnalyzeResponse;
}

export const ResultCard = ({ result }: ResultCardProps) => {
  const { is_phishing, confidence, alert } = result;
  const confidencePercentage = Math.round(confidence * 100);
  const isHighRisk = is_phishing;

  return (
    <div
      className={`p-8 rounded-2xl border-2 backdrop-blur-sm transition-all duration-500 ${
        isHighRisk
          ? 'bg-red-50/80 dark:bg-red-900/20 border-red-300 dark:border-red-700 shadow-red-100 dark:shadow-red-900/20'
          : 'bg-green-50/80 dark:bg-green-900/20 border-green-300 dark:border-green-700 shadow-green-100 dark:shadow-green-900/20'
      } shadow-xl`}
    >
      <div className="flex items-start gap-6">
        <div
          className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold animate-bounce ${
            isHighRisk ? 'bg-red-200 dark:bg-red-800' : 'bg-green-200 dark:bg-green-800'
          }`}
        >
          {isHighRisk ? '🚨' : '✅'}
        </div>

        <div className="flex-1">
          <h3 className={`text-2xl font-bold mb-2 ${isHighRisk ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'}`}>
            {alert}
          </h3>

          <p className={`text-sm font-semibold mb-4 ${isHighRisk ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}`}>
            Nível de confiança: {confidencePercentage}%
          </p>

          <div className="space-y-3">
            {/* Progress Bar */}
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className={`h-full transition-all duration-700 ${
                  isHighRisk 
                    ? 'bg-gradient-to-r from-red-400 to-red-600' 
                    : 'bg-gradient-to-r from-green-400 to-green-600'
                }`}
                style={{ width: `${confidencePercentage}%` }}
              />
            </div>

            {/* Message */}
            <p className={`text-sm leading-relaxed ${isHighRisk ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}`}>
              {isHighRisk
                ? '⚠️ Esta mensagem apresenta características de phishing ou fraude. Tenha cuidado ao interagir com links, anexos ou informações solicitadas.'
                : ' Esta mensagem passou nas verificações de segurança e parece ser confiável.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
