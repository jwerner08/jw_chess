from typing import List

from pydantic import BaseModel

class Piece(BaseModel):
    type: str  # Type of the piece like "P", "R", "N", etc.
    color: str  # "white" or "black"

class Board(BaseModel):
    squares: List[List[Piece]]  # 8x8 grid representing the chessboard

def initialize_board() -> Board:
    initial_pieces = [
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        [None] * 8,
        [None] * 8,
        [None] * 8,
        [None] * 8,
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ]

    squares = [
        [Piece(type=piece, color='white') if piece and piece.isupper() else Piece(type=piece, color='black') if piece else None
            for piece in row]
        for row in initial_pieces
    ]

    return Board(squares=squares)