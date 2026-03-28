import os
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Caminho absoluto até a pasta do modelo treinado
_MODEL_DIR = os.path.join(
    os.path.dirname(__file__),        # …/services/
    "..", "..", "..", "..",            # …/zapguard_backend/  →  projeto_final_pln/
    "utils", "train_model", "zapguard_model_final"
)
_MODEL_DIR = os.path.normpath(_MODEL_DIR)

# Carrega modelo e tokenizador UMA VEZ na inicialização do módulo
_device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
_tokenizer = AutoTokenizer.from_pretrained(_MODEL_DIR)
_model = AutoModelForSequenceClassification.from_pretrained(_MODEL_DIR).to(_device)
_model.eval()


class AnalyzeService:
    """
    Camada de Serviço (Business Logic).
    Carrega o modelo BERTimbau fine-tunado e executa a inferência real.
    """

    async def evaluate_message(self, message: str) -> dict:
        """
        Avalia a mensagem usando o modelo BERTimbau treinado.

        Args:
            message (str): O texto da mensagem a ser avaliada.

        Returns:
            dict: Dicionário contendo os dados brutos da predição.
        """
        # Tokeniza a mensagem no mesmo formato usado no treinamento
        inputs = _tokenizer(
            message,
            padding="max_length",
            truncation=True,
            max_length=128,
            return_tensors="pt"
        ).to(_device)

        # Inferência sem calcular gradientes (mais rápido e usa menos memória)
        with torch.no_grad():
            outputs = _model(**inputs)

        # Converte logits em probabilidades via softmax
        probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
        spam_prob = probs[0][1].item()   # Probabilidade da classe 1 (spam/phishing)

        is_phishing = spam_prob >= 0.5
        confidence = round(spam_prob if is_phishing else (1 - spam_prob), 2)
        alert_msg = "Risco Alto de Fraude" if is_phishing else "Seguro"

        return {
            "is_phishing": is_phishing,
            "confidence": confidence,
            "alert": alert_msg,
        }