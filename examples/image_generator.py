# import gradio as gr
# from gradio.inputs import Textbox

import torch
from diffusers import StableDiffusionPipeline
import boto3
from io import BytesIO
import os

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
S3_BUCKET_NAME = os.getenv("BUCKET_NAME")

model_id = "CompVis/stable-diffusion-v1-4"
device = "cuda" if torch.cuda.is_available() else "cpu"

pipe = StableDiffusionPipeline.from_pretrained(
    model_id, torch_dtype=torch.float32)

pipe = pipe.to(device)


def text_to_image(summary, image_name):

    # Crea una instancia del cliente de S3
    s3 = boto3.client('s3',
                      aws_access_key_id=AWS_ACCESS_KEY_ID,
                      aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

    image_name = '-'.join(image_name.split()) + ".webp"

    def save_image_to_s3(image):
        # Crea un objeto de BytesIO para almacenar la imagen
        image_buffer = BytesIO()
        image.save(image_buffer, format='WEBP')
        image_buffer.seek(0)

        # Ruta completa del archivo en el bucket
        s3_key = "public/" + image_name

        # Sube la imagen al bucket de S3
        s3.upload_fileobj(image_buffer, S3_BUCKET_NAME, s3_key)

    def generator_image(summary):
        prompt = summary
        image = pipe(prompt).images[0]

        # Guarda la imagen en S3
        save_image_to_s3(image)

    # generate image
    generator_image(summary)

    return image_name


# iface = gr.Interface(fn=text_to_image, inputs=[Textbox(label="Summary"), Textbox(label="Image Name")], outputs="text")
# iface.launch()
