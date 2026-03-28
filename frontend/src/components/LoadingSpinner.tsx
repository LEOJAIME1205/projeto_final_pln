export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center">
        <div className="inline-block">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-spin" 
                 style={{
                   borderRadius: '50%',
                   background: 'conic-gradient(from 0deg, #0ea5e9, #06b6d4, #0ea5e9)',
                   WebkitMaskImage: 'radial-gradient(closest-side, transparent calc(100% - 3px), black calc(100% - 3px))'
                 }}>
            </div>
            <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-full"></div>
          </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
          Analisando mensagem...
        </p>
      </div>
    </div>
  );
};
