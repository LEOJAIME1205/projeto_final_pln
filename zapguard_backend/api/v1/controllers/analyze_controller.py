from fastapi import HTTPException
from api.v1.schemas.analyze_schema import AnalyzeRequest, AnalyzeResponse
from api.v1.services.analyze_service import AnalyzeService


class AnalyzeController:
    """
    Camada de Controle.
    Responsável por orquestrar a requisição, tratar exceções de negócio 
    e formatar o Output através do Schema de Resposta.
    """
    def __init__(self, service: AnalyzeService):
        # Injeção de dependência do serviço
        self.service = service

    async def process_analysis(self, request_data: AnalyzeRequest) -> AnalyzeResponse:
        """
        Processa o fluxo de análise orquestrando o serviço e os schemas.
        """
        try:
            # Chama a camada de negócios
            result_dict = await self.service.evaluate_message(request_data.message)
            
            # Valida e encapsula o retorno no Validator/Schema de Resposta
            return AnalyzeResponse(**result_dict)
            
        except ValueError as ve:
            # Tratamento de erros de validação da lógica de negócios (se houvesse)
            raise HTTPException(status_code=400, detail=str(ve))
        except Exception as e:
            # Tratamento genérico para erros de servidor/falha no modelo
            raise HTTPException(
                status_code=500, 
                detail=f"Erro interno ao processar a mensagem no ZapGuard: {str(e)}"
            )