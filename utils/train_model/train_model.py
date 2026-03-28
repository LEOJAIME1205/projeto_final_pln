import pandas as pd
import torch
from sklearn.model_selection import train_test_split
from datasets import Dataset
from transformers import (
    AutoTokenizer, 
    AutoModelForSequenceClassification, 
    TrainingArguments, 
    Trainer
)
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

def compute_metrics(pred):
    """
    Função para calcular as métricas no final de cada época.
    Lembra que no relatório definimos focar no Recall de fraudes? 
    É aqui que calculamos isso.
    """
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    precision, recall, f1, _ = precision_recall_fscore_support(labels, preds, average='binary')
    acc = accuracy_score(labels, preds)
    return {
        'accuracy': acc,
        'f1': f1,
        'precision': precision,
        'recall': recall
    }

def main():
    print("🚀 Iniciando o treinamento do ZapGuard com BERTimbau...")

    # 1. CARREGAR OS DADOS
    # Lendo o arquivo limpo e consolidado que você gerou
    df = pd.read_csv('dataset_pt_completo.csv')

    # Modelos esperam números, não textos. Vamos converter: ham -> 0, spam -> 1
    df['label'] = df['labels'].map({'ham': 0, 'spam': 1})
    df = df.dropna(subset=['text', 'label']) # Garante que não há linhas vazias

    # 2. DIVISÃO (TREINO vs TESTE)
    # Separando 20% dos dados para testar o modelo com coisas que ele nunca viu
    train_df, test_df = train_test_split(df, test_size=0.2, random_state=42, stratify=df['label'])

    # Convertendo do formato Pandas para o formato Dataset do Hugging Face
    train_dataset = Dataset.from_pandas(train_df)
    test_dataset = Dataset.from_pandas(test_df)

    # 3. TOKENIZADOR
    # O BERTimbau (neuralmind) é o modelo de linguagem treinado pelo Google/Unicamp em português
    model_name = "neuralmind/bert-base-portuguese-cased"
    print(f"📦 Baixando Tokenizador: {model_name}")
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    def tokenize_function(examples):
        # Transforma o texto em Tensors (números) com um tamanho fixo de 128 tokens
        return tokenizer(examples["text"], padding="max_length", truncation=True, max_length=128)

    print("⚙️ Tokenizando os dados...")
    tokenized_train = train_dataset.map(tokenize_function, batched=True)
    tokenized_test = test_dataset.map(tokenize_function, batched=True)

    # 4. CARREGAR O MODELO PRÉ-TREINADO
    # Carregamos o BERTimbau avisando que teremos 2 classes de saída (0 ou 1)
    print("🧠 Carregando a Rede Neural BERTimbau...")
    model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=2)

    # 5. CONFIGURAÇÕES DE TREINAMENTO
    training_args = TrainingArguments(
        output_dir="./zapguard_checkpoints", # Onde salvar checkpoints parciais
        eval_strategy="epoch",               # Avalia o modelo a cada época (rodada)
        save_strategy="epoch",
        learning_rate=2e-5,                  # Taxa de aprendizado padrão para fine-tuning
        per_device_train_batch_size=16,      # Quantidade de mensagens processadas por vez
        per_device_eval_batch_size=16,
        num_train_epochs=3,                  # 3 rodadas sobre todo o dataset são suficientes
        weight_decay=0.01,
        load_best_model_at_end=True,         # No final, guarda a melhor versão
        metric_for_best_model="recall",      # O modelo vencedor é o que tiver maior Recall!
    )

    # 6. INICIAR O TREINAMENTO
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_train,
        eval_dataset=tokenized_test,
        compute_metrics=compute_metrics,
    )

    print("🔥 Iniciando Fine-Tuning... (Isso pode demorar dependendo do seu computador)")
    trainer.train()

    # 7. EXPORTAR O MODELO FINAL
    final_dir = "./zapguard_model_final"
    print(f"✅ Treinamento concluído! Salvando modelo final em: {final_dir}")
    model.save_pretrained(final_dir)
    tokenizer.save_pretrained(final_dir)

if __name__ == "__main__":
    main()