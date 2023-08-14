from typing import List

from pydantic import BaseModel

class Piece(BaseModel):
    type: str  # Type of the piece like "P", "R", "N", etc.
    color: str  # "white" or "black"

class Board(BaseModel):
    squares: List[List[Piece]]  # 8x8 grid representing the chessboard
