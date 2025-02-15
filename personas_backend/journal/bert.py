import torch
from transformers import AutoTokenizer, AutoModel
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Load BERT model & tokenizer once (for efficiency)
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained("bert-base-uncased")

# Blue Lock personas and descriptions
blue_lock_personas = {
    "Isagi": "strategic thinker, adaptive, team player",
    "Bachira": "creative, unpredictable, instinctive dribbler",
    "Nagi": "lazy genius, effortless, high potential",
    "Barou": "egoistic, dominant, powerful",
    "Rin": "calculated, technical, perfectionist"
}

# Function to generate sentence embeddings
def get_embedding(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).numpy().flatten()  # Mean pooling

# Precompute persona embeddings (do this once)
persona_vectors = {p: get_embedding(desc) for p, desc in blue_lock_personas.items()}

def classify_persona(journal_entry):
    # Get journal entry embedding
    journal_vector = get_embedding(journal_entry)

    # Compute cosine similarity
    similarities = {p: cosine_similarity([journal_vector], [vec])[0][0] for p, vec in persona_vectors.items()}

    # Find the closest matching persona
    best_match = max(similarities, key=similarities.get)
    return best_match