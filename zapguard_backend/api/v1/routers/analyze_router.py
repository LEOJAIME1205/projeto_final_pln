import asyncio
from fastapi import APIRouter, Depends, HTTPException
from api.v1.schemas.analyze_schema import AnalyzeRequest, AnalyzeResponse
from api.v1.controllers.analyze_controller import AnalyzeController
from api.v1.services.analyze_service import AnalyzeService

ROUTE_TIMEOUT_SECONDS = 6

router = APIRouter(prefix="/api/v1", tags=["Analysis"])

# Função provedora de dependências (Dependency Injection)
def get_analyze_controller() -> AnalyzeController:
    """
    Instancia as camadas inferiores e retorna o Controller pronto para uso.
    Facilita enormemente o Mocking durante testes unitários.
    """
    service = AnalyzeService()
    return AnalyzeController(service)

@router.post(
    "/analyze", 
    response_model=AnalyzeResponse,
    summary="Analisa uma mensagem curta",
    description="Recebe o texto de uma mensagem e retorna a predição do modelo PLN sobre ser um Phishing ou não."
)
async def analyze_message(
    request: AnalyzeRequest,
    controller: AnalyzeController = Depends(get_analyze_controller)
) -> AnalyzeResponse:
    """
    Rota enxuta: NENHUMA lógica aqui. 
    Apenas define o Endpoint, injeta as dependências e repassa ao Controller.
    """
    try:
        return await asyncio.wait_for(
            controller.process_analysis(request),
            timeout=ROUTE_TIMEOUT_SECONDS
        )
    except asyncio.TimeoutError:
        raise HTTPException(
            status_code=504,
            detail=f"O modelo demorou mais de {ROUTE_TIMEOUT_SECONDS}s para responder. Tente novamente."
        )