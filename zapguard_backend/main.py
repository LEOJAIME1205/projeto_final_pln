from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1.routers import analyze_router

def create_app() -> FastAPI:
    """
    Factory function para criação e configuração da aplicação FastAPI.
    """
    app = FastAPI(
        title="ZapGuard API",
        description="Backend do projeto NLP ZapGuard - Detector de Golpes e Phishing.",
        version="1.0.0"
    )

    # Configuração MANDATÓRIA do CORS para comunicação com o Frontend (Lovable)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Em produção, substitua pelo domínio específico do frontend
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Registro das rotas (Routers)
    app.include_router(analyze_router.router)

    return app

# Instância global da aplicação consumida pelo Uvicorn
app = create_app()

if __name__ == "__main__":
    import uvicorn
    # Facilidade para rodar o projeto localmente com "python main.py"
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)