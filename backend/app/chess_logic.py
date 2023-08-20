# backend/app/chess_logic.py
from models import Piece, Board

def initialize_board() -> Board:
    initial_pieces = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        [None] * 8,
        [None] * 8,
        [None] * 8,
        [None] * 8,
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ]

    squares = [
        [Piece(type=piece, color='white') if piece and piece.isupper() else Piece(type=piece, color='black') if piece else None
         for piece in row]
        for row in initial_pieces
    ]

    return Board(squares=squares)
