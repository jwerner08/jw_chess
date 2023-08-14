from django.shortcuts import render

def initialize_board(chessboard):
    # Define the initial positions of the pieces
    initial_pieces = [
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ]

    # convert to a single string to store the whole board in one database field
    chessboard.squares = ''.join([''.join(row) for row in initial_pieces])
    chessboard.save()

    # Create Piece instances for each piece on the board
    for row_index, row in enumerate(initial_pieces):
        for col_index, piece_char in enumerate(row):
            if piece_char != ' ':
                color = 'W' if piece_char.isupper() else 'B'
                position = row_index * 8 + col_index
                Piece.objects.create(
                    type=piece_char.upper(),
                    color=color,
                    position=position,
                    chessboard=chessboard
                )

