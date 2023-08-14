from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Chess App Backend!"}

# You can continue to define other endpoints related to chess gameplay here
