import pandas as pd
import numpy as np
import requests
import json
import os
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import joblib
from PIL import Image
import pytesseract

def embedding_creater(text_of_image):
    url = "http://localhost:11434/api/embed"
    payload = {
        "model": "nomic-embed-text:latest",
        "input": text_of_image, 
        "stream": False
    }
    req = requests.post(url, json=payload)
    if req.status_code != 200:
        raise Exception(f"Request failed: {req.status_code}, {req.text}")
    embeddings = req.json()["embeddings"]
    return embeddings

image_text_list = []

image_directory = os.listdir("Photos")
for image in image_directory:
    img = Image.open(f"Photos/{image}")
    extracted_text = pytesseract.image_to_string(img)
    image_data = { "image_name": image, 
                    "text": extracted_text,
                    "embeddings": embedding_creater(extracted_text),
                 }
    image_text_list.append(image_data)
# jsons = os.listdir("jsons")
# for json_file in jsons:
#     with open(f"jsons/{json_file}") as f:
#         content = json.load(f)
#     print(f"Creating embeddings for {json_file}")
#     embeddings = embedding_creater([c['text'] for c in content['chunks']])

#     for i,chunk in enumerate(content['chunks']):
#         chunk['id'] = chunk_id
#         chunk_id = chunk_id + 1
#         chunk['embedding'] = embeddings[i]
#         chunks_list.append(chunk)
image_text_list = pd.DataFrame(image_text_list)
joblib.dump(image_text_list['embeddings'], 'embeddings.joblib')