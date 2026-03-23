from fastapi import APIRouter, Depends
from api.v1.schemas.analyze_schema import AnalyzeRequest, AnalyzeResponse
from api.v1.controllers.analyze_controller import AnalyzeController
from api.v1.services.analyze_service import AnalyzeService

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
    return await controller.process_analysis(request)