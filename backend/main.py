from fastapi import FastAPI
from routes.libraries import libraries

app = FastAPI()


@app.get("/")
def root():
    return {"message": 'Welcome to Nova Library!'}

app.include_router(libraries.router)
