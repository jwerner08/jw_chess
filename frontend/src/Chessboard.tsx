import React, { useEffect, useState, ReactElement, ReactNode } from 'react';
import axios from 'axios';
import whitePawn from './assets/pieces/whitePawn.svg';
import blackPawn from './assets/pieces/blackPawn.svg';
import whiteKing from './assets/pieces/whiteKing.svg';
import blackKing from './assets/pieces/blackKing.svg';
import whiteQueen from './assets/pieces/whiteQueen.svg';
import blackQueen from './assets/pieces/blackQueen.svg';
import whiteRook from './assets/pieces/whiteRook.svg';
import blackRook from './assets/pieces/blackRook.svg';
import whiteBishop from './assets/pieces/whiteBishop.svg';
import blackBishop from './assets/pieces/blackBishop.svg';
import whiteKnight from './assets/pieces/whiteKnight.svg';
import blackKnight from './assets/pieces/blackKnight.svg';

type PieceType = 'P' | 'p' | 'K' | 'k' | 'Q' | 'q' | 'R' | 'r' | 'B' | 'b' | 'N' | 'n';
type BoardType = (Piece | null)[][];
interface Piece {
  type: PieceType;
  color: 'white' | 'black';
}

function Chessboard(): ReactElement {
  const [board, setBoard] = useState<BoardType | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<{ piece: Piece, x: number, y: number } | null>(null);
  const getPieceImage = (piece: Piece | null): string | null => {
    if (!piece) return null;
    if (piece.type === 'P' && piece.color === 'white') return whitePawn;
    if (piece.type === 'p' && piece.color === 'black') return blackPawn;
    if (piece.type === 'K' && piece.color === 'white') return whiteKing;
    if (piece.type === 'k' && piece.color === 'black') return blackKing;
    if (piece.type === 'Q' && piece.color === 'white') return whiteQueen;
    if (piece.type === 'q' && piece.color === 'black') return blackQueen;
    if (piece.type === 'R' && piece.color === 'white') return whiteRook;
    if (piece.type === 'r' && piece.color === 'black') return blackRook;
    if (piece.type === 'B' && piece.color === 'white') return whiteBishop;
    if (piece.type === 'b' && piece.color === 'black') return blackBishop;
    if (piece.type === 'N' && piece.color === 'white') return whiteKnight;
    if (piece.type === 'n' && piece.color === 'black') return blackKnight;
    return null;
  };

  const handleSquareClick = (x: number, y: number) => {
    if (board) {
      const piece = board[x][y];
      if (selectedPiece) {
        if (piece) {
          // If there is already a selected piece and a new piece is clicked, select the new piece
          setSelectedPiece({ piece, x, y });
          console.log('Piece selected:', { piece, x, y }); // Log the selected piece information
        } else {
          // Move the selected piece if an empty square is clicked
          const from = { x: selectedPiece.x, y: selectedPiece.y };
          const to = { x, y };
  
          // Create a copy of the board
          const newBoard = board.map(row => row.slice());
  
          // Move the piece
          newBoard[from.x][from.y] = null;
          newBoard[to.x][to.y] = selectedPiece.piece;
  
          // Update the board state
          setBoard(newBoard);
  
          // Deselect the piece
          setSelectedPiece(null);
        }
      } else if (piece) {
        // If no piece is selected and a piece is clicked, select it
        setSelectedPiece({ piece, x, y });
        console.log('Piece selected:', { piece, x, y }); // Log the selected piece information
      }
    }
  };    

  useEffect(() => {
    // Fetch the initial board from the server
    axios.get('http://127.0.0.1:8000/board')
      .then(response => {
        setBoard(response.data.squares);
      })
      .catch(error => {
        console.error("An error occurred while fetching the board data:", error);
      });
  }, []);

  // Generate the grid
  const squares: ReactNode[] = [];
  if (board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const isDarkSquare = (i + j) % 2 !== 0;
        const squareClass = isDarkSquare ? 'bg-black' : 'bg-white';

        // Check if this square contains the selected piece
        const isSelected = selectedPiece && selectedPiece.x === i && selectedPiece.y === j;
        const selectedClass = isSelected ? 'border-2 border-red-500' : '';

        // Add the piece image if there is a piece on this square
        const pieceImage = getPieceImage(board[i][j]);
        const pieceElement = pieceImage ? <img className={`w-full h-full ${selectedClass}`} src={pieceImage} alt="" /> : null;

        squares.push(
          <div key={`${i}-${j}`} className={`w-16 h-16 ${squareClass} ${selectedClass}`} onClick={() => handleSquareClick(i, j)}>
            {pieceElement}
          </div>
        );
      }
    }
  }

  return (
    <div className="display-inline items-center grid grid-cols-8">
      {squares}
    </div>
  );
}

export default Chessboard;
