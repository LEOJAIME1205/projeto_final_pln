export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl font-bold"></div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">ZapGuard</h1>
              <p className="text-blue-100 text-sm">Proteção contra phishing e fraudes</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-blue-100">
            <span className="inline-block w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
            Sistema Ativo
          </div>
        </div>
      </div>
    </header>
  );
};
