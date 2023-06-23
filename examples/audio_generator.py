import re
from transformers import SpeechT5Processor, SpeechT5ForTextToSpeech, SpeechT5HifiGan
from datasets import load_dataset
import torch
import random
import string
import soundfile as sf
import boto3
from io import BytesIO
import os

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
S3_BUCKET_NAME = os.getenv("BUCKET_NAME")

device = "cuda" if torch.cuda.is_available() else "cpu"
# load the processor
processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_tts")
# load the model
model = SpeechT5ForTextToSpeech.from_pretrained(
    "microsoft/speecht5_tts").to(device)
# load the vocoder, that is the voice encoder
vocoder = SpeechT5HifiGan.from_pretrained(
    "microsoft/speecht5_hifigan").to(device)
# we load this dataset to get the speaker embeddings
embeddings_dataset = load_dataset(
    "Matthijs/cmu-arctic-xvectors", split="validation")

# speaker ids from the embeddings dataset
speakers = {
    'awb': 0,     # Scottish male
    'bdl': 1138,  # US male
    'clb': 2271,  # US female
    'jmk': 3403,  # Canadian male
    'ksp': 4535,  # Indian male
    'rms': 5667,  # US male
    'slt': 6799   # US female
}


def generateAudio(text_to_audio, s3_save_as):

    s3_save_as = '-'.join(s3_save_as.split()) + ".wav"

    def cut_text(text, max_tokens=500):
        # Remove non-alphanumeric characters, except periods and commas
        text = re.sub(r"[^\w\s.,]", "", text)

        # Replace multiple spaces with a single space
        text = re.sub(r"\s{2,}", " ", text)

        # Remove line breaks
        text = re.sub(r"\n", " ", text)

        return text

    def save_audio_to_s3(audio):
        # Create an instance of the S3 client
        s3 = boto3.client('s3',
                          aws_access_key_id=AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

        # Full path of the file in the bucket
        s3_key = "public/" + s3_save_as

        # Upload the audio file to the S3 bucket
        s3.upload_fileobj(audio, S3_BUCKET_NAME, s3_key)

    def save_text_to_speech(text, speaker=None):
        # Preprocess text and recortar
        text = cut_text(text, max_tokens=500)

        # Divide el texto en segmentos de 30 palabras
        palabras = text.split()
        segmentos = [' '.join(palabras[i:i+30])
                     for i in range(0, len(palabras), 30)]

        # Generar audio para cada segmento y combinarlos
        audio_segments = []
        for segment in segmentos:
            inputs = processor(text=segment, return_tensors="pt").to(device)
            if speaker is not None:
                speaker_embeddings = torch.tensor(
                    embeddings_dataset[speaker]["xvector"]).unsqueeze(0).to(device)
            else:
                speaker_embeddings = torch.randn((1, 512)).to(device)
            speech = model.generate_speech(
                inputs["input_ids"], speaker_embeddings, vocoder=vocoder)
            audio_segments.append(speech)

        combined_audio = torch.cat(audio_segments, dim=0)

        # Crear objeto BytesIO para almacenar el audio
        audio_buffer = BytesIO()
        sf.write(audio_buffer, combined_audio.cpu().numpy(),
                 samplerate=16000, format='WAV')
        audio_buffer.seek(0)

        # Guardar el audio combinado en S3
        save_audio_to_s3(audio_buffer)

    save_text_to_speech(text_to_audio, 2271)
    return s3_save_as
