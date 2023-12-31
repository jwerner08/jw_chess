from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Board  # Assuming models.py is in the same package
from chess_logic import initialize_board  # Assuming chess_logic.py is in the same package

app = FastAPI()

origins = [
    "http://localhost:3000", # Allow the frontend to access
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the chessboard with the starting pieces
current_board = initialize_board()

@app.get("/board", response_model=Board)
def get_board():
    return current_board

@app.post("/reset")
def reset_board():
    global current_board
    current_board = initialize_board()
    return {"message": "Board reset"}

