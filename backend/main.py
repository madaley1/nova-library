from fastapi import FastAPI
from routes.libraries import libraries
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:5001',
    'https://localhost:5001',
    'http://127.0.0.1:5001',
    'https://127.0.0.1:5001',
    'http://172.17.0.1:5001',
    'https://172.17.0.1s:5001'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": 'Welcome to Nova Library!'}

app.include_router(libraries.router)
