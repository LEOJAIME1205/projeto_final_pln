import { useState } from 'react';
import type { FormEvent } from 'react';

interface AnalyzeFormProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

export const AnalyzeForm = ({ onSubmit, isLoading }: AnalyzeFormProps) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!message.trim()) {
      setError('Por favor, digite uma mensagem para analisar');
      return;
    }

    if (message.trim().length < 1) {
      setError('A mensagem deve ter pelo menos 1 caractere');
      return;
    }

    onSubmit(message.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
           Digite a mensagem para analisar
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          placeholder="Cole aqui a mensagem que deseja verificar se é phishing ou fraude..."
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          rows={5}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
            <span>⚠️</span>
            {error}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Dica: Mensagens com erros ortográficos, urgência ou pedidos de dados são suspeitas
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚙️</span>
            Analisando...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
             Analisar Mensagem
          </span>
        )}
      </button>
    </form>
  );
};
