class AnalyzeService:
    """
    Camada de Serviço (Business Logic).
    No futuro, esta classe carregará e fará a inferência com o modelo PLN/BERTimbau.
    Por enquanto, implementa uma heurística simulada (Mock) focada em palavras-chave.
    """
    
    async def evaluate_message(self, message: str) -> dict:
        """
        Avalia a mensagem simulando o processamento de linguagem natural.
        
        Args:
            message (str): O texto da mensagem a ser avaliada.
            
        Returns:
            dict: Dicionário contendo os dados brutos da predição.
        """
        # Palavras-chave comuns em golpes de WhatsApp/SMS no Brasil
        risk_keywords = [
            "pix", "promoção", "urgente", "clique", "banco", 
            "senha", "conta bloqueada", "link", "grátis", "brinde",
            "sorteio", "recadastramento"
        ]
        
        msg_lower = message.lower()
        score = 0.0
        
        # Lógica simulada: aumenta o risco baseando-se em gatilhos textuais
        for kw in risk_keywords:
            if kw in msg_lower:
                score += 0.35  # Cada palavra de risco aumenta a "certeza" de ser golpe
                
        confidence = min(score + 0.15, 0.99)  # Limita a confiança máxima a 99%
        is_phishing = confidence >= 0.60
        
        # Ajuste de confiança para mensagens consideradas seguras
        if not is_phishing:
            confidence = 0.95  # 95% de confiança de que é uma mensagem normal
            
        alert_msg = "Risco Alto de Fraude" if is_phishing else "Seguro"
        
        return {
            "is_phishing": is_phishing,
            "confidence": round(confidence, 2),
            "alert": alert_msg
        }