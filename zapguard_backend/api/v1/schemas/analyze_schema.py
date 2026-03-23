from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    """
    Schema de entrada para a requisição de análise.
    Valida se a mensagem não está vazia e define exemplos para a documentação do Swagger.
    """
    message: str = Field(
        ..., 
        min_length=1, 
        description="O texto da mensagem curta que será analisada pelo modelo de PLN."
    )

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "message": "Promoção imperdível! Clique no link para resgatar seus R$500 no PIX agora mesmo: http://link-falso.com"
                }
            ]
        }
    }


class AnalyzeResponse(BaseModel):
    """
    Schema de saída para a resposta da API.
    Garante o contrato de dados que o frontend (Lovable) espera receber.
    """
    is_phishing: bool = Field(..., description="Booleano indicando se a mensagem é um golpe.")
    confidence: float = Field(..., description="Nível de confiança da predição (0.0 a 1.0).")
    alert: str = Field(..., description="Mensagem de alerta legível para o usuário final.")

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "is_phishing": True,
                    "confidence": 0.98,
                    "alert": "Risco Alto de Fraude"
                }
            ]
        }
    }