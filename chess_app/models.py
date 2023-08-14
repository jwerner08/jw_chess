from django.db import models

class Chessboard(models.Model):
    # Representation of 8x8 chessboard
    squares = models.CharField(max_length=64, default=' ' * 64) # Initial empty board

class Piece(models.Model):
    PIECE_TYPE_CHOICES = [
        ('K', 'King'),
        ('Q', 'Queen'),
        ('R', 'Rook'),
        ('N', 'Knight'),
        ('B', 'Bishop'),
        ('P', 'Pawn'),
    ]
    PIECE_COLOR_CHOICES = [
        ('W', 'White'),
        ('B', 'Black'),
    ]
    type = models.CharField(max_length=1, choices=PIECE_TYPE_CHOICES)
    color = models.CharField(max_length=1, choices=PIECE_COLOR_CHOICES)
    position = models.PositiveIntegerField() # Position on the board (0-63)
    chessboard = models.ForeignKey(Chessboard, on_delete=models.CASCADE)
