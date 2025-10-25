# import pandas as pd
# import numpy as np
# import requests
# import json
# import os
# from sklearn.metrics.pairwise import cosine_similarity
# import joblib
# from PIL import Image
# import pytesseract
# import argparse
# from pathlib import Path

# def model(prompt):
#     r = requests.post("http://localhost:11434/api/generate", json={
#         "model": "llama3.2",    
#         "prompt": prompt,
#         "stream": False,
#     })
#     r.raise_for_status()
#     response = r.json()["response"]
#     return response

# def embedding_creater(query):
#     url = "http://localhost:11434/api/embed"
#     payload = {
#         "model": "nomic-embed-text:latest",
#         "input": query,
#         "stream": False
#     }
#     req = requests.post(url, json=payload)
#     if req.status_code != 200:
#         raise Exception(f"Request failed: {req.status_code}, {req.text}")
#     embeddings = req.json()["embeddings"]
#     return embeddings

# image_text_list = []

# # Use the original absolute Photos path first, fallback to script-relative "Photos"
# PHOTOS_DIR = Path(r"D:\Swamiraj\Programing\Projects\High lvl\NeuroX\Machine Learning\Photos")
# if not PHOTOS_DIR.exists():
#     PHOTOS_DIR = Path(__file__).resolve().parent / "Photos"

# if not PHOTOS_DIR.exists():
#     raise FileNotFoundError(f"Photos directory not found. Checked: {PHOTOS_DIR}")

# for image_path in PHOTOS_DIR.iterdir():
#     if not image_path.is_file():
#         continue
#     try:
#         img = Image.open(image_path)
#         extracted_text = pytesseract.image_to_string(img)
#     except Exception as e:
#         # skip files that can't be opened/read as images
#         print(f"Skipping {image_path.name}: {e}")
#         continue
#     image_data = {"image_name": image_path.name,
#                   "text": extracted_text,
#                  }
#     image_text_list.append(image_data)

# # Robust embeddings loading/creation
# EMBEDDINGS_FILE = Path(__file__).resolve().parent / "embeddings.joblib"

# if not EMBEDDINGS_FILE.exists():
#     if len(image_text_list) == 0:
#         raise FileNotFoundError(f"embeddings.joblib not found and no images found to build embeddings. Checked: {EMBEDDINGS_FILE}")
#     print(f"embeddings.joblib not found. Creating embeddings and saving to: {EMBEDDINGS_FILE}")
#     try:
#         texts = [it["text"] for it in image_text_list]
#         embeddings_list = []
#         for t in texts:
#             emb = embedding_creater(t)
#             # ensure numpy array shape consistency
#             emb_arr = np.array(emb, dtype=float)
#             embeddings_list.append(emb_arr)
#         # stack into 2D array if possible
#         embeddings_array = np.vstack(embeddings_list)
#         joblib.dump(embeddings_array, EMBEDDINGS_FILE)
#         embeddings = embeddings_array
#     except Exception as e:
#         raise RuntimeError(f"Failed creating embeddings: {e}")
# else:
#     embeddings = joblib.load(EMBEDDINGS_FILE)

# def main():
#     script_dir = Path(__file__).resolve().parent
#     query_file = script_dir / "query.txt"
#     response_file = script_dir / "response.txt"

#     parser = argparse.ArgumentParser()
#     parser.add_argument('--query', '-q', required=False, help='User query')
#     args = parser.parse_args()

#     if args.query:
#         query = args.query
#     elif query_file.exists():
#         # Read query written by GUI (GUI writes Machine Learning/query.txt)
#         query = query_file.read_text(encoding="utf-8").strip()
#     else:
#         query = input("Enter your question: ")

#     # use image_text_list as Data
#     Data = image_text_list[0] if len(image_text_list) > 0 else {"text": ""}
#     prompt_for_llm = f"""Here are some text extracted from an image, given to you to
# process them to answer user's question by the page's text only.
# {Data['text']}

# User's Question: "{query}"
# """

#     try:
#         req = model(prompt_for_llm)
#     except Exception as e:
#         # ensure GUI can read an error response
#         err_msg = f"ERROR: {e}"
#         response_file.write_text(err_msg, encoding="utf-8")
#         print(err_msg)
#         return

#     # write response next to this script so GUI can read it
#     response_file.write_text(req, encoding="utf-8")
#     print(req)

# if __name__ == "__main__":
#     main()

# print("\n✅ All done! Response saved to 'response.txt'.")
import pandas as pd
import numpy as np
import requests
import json
import os
from sklearn.metrics.pairwise import cosine_similarity
import joblib
from PIL import Image
import pytesseract
import argparse
from pathlib import Path
import sys

# Ensure UTF-8 console output to avoid emoji errors
sys.stdout.reconfigure(encoding='utf-8')

def model(prompt):
    r = requests.post("http://localhost:11434/api/generate", json={
        "model": "llama3.2",
        "prompt": prompt,
        "stream": False,
    })
    r.raise_for_status()
    return r.json()["response"]

def embedding_creater(query):
    url = "http://localhost:11434/api/embed"
    payload = {
        "model": "nomic-embed-text:latest",
        "input": query,
        "stream": False
    }
    req = requests.post(url, json=payload)
    if req.status_code != 200:
        raise Exception(f"Request failed: {req.status_code}, {req.text}")
    return req.json()["embeddings"]

# Load or create image text embeddings (for your local RAG system)
image_text_list = []
PHOTOS_DIR = Path(r"D:\Swamiraj\Programing\Projects\High lvl\NeuroX\Machine Learning\Photos")
if not PHOTOS_DIR.exists():
    PHOTOS_DIR = Path(__file__).resolve().parent / "Photos"

if PHOTOS_DIR.exists():
    for image_path in PHOTOS_DIR.iterdir():
        if not image_path.is_file():
            continue
        try:
            img = Image.open(image_path)
            extracted_text = pytesseract.image_to_string(img)
        except Exception as e:
            print(f"Skipping {image_path.name}: {e}")
            continue
        image_text_list.append({"image_name": image_path.name, "text": extracted_text})

EMBEDDINGS_FILE = Path(__file__).resolve().parent / "embeddings.joblib"
if not EMBEDDINGS_FILE.exists() and image_text_list:
    texts = [it["text"] for it in image_text_list]
    embeddings_list = [np.array(embedding_creater(t), dtype=float) for t in texts]
    embeddings_array = np.vstack(embeddings_list)
    joblib.dump(embeddings_array, EMBEDDINGS_FILE)
    embeddings = embeddings_array
elif EMBEDDINGS_FILE.exists():
    embeddings = joblib.load(EMBEDDINGS_FILE)
else:
    embeddings = np.array([])  # no images, empty embeddings

def main():
    script_dir = Path(__file__).resolve().parent
    query_file = script_dir / "query.txt"
    response_file = script_dir / "response.txt"

    parser = argparse.ArgumentParser()
    parser.add_argument('--query', '-q', required=False, help='User query')
    args = parser.parse_args()

    if args.query:
        query = args.query
    elif query_file.exists():
        query = query_file.read_text(encoding="utf-8").strip()
    else:
        query = input("Enter your question: ")

    Data = image_text_list[0] if image_text_list else {"text": ""}
    prompt_for_llm = f"""Here are some text extracted from an image, given to you to
process them to answer user's question by the page's text only.
{Data['text']}

User's Question: "{query}"
"""

    try:
        req = model(prompt_for_llm)
    except Exception as e:
        err_msg = f"ERROR: {e}"
        response_file.write_text(err_msg, encoding="utf-8")
        print(err_msg)
        return

    response_file.write_text(req, encoding="utf-8")
    print("All done! Response saved to 'response.txt'.")

if __name__ == "__main__":
    main()
