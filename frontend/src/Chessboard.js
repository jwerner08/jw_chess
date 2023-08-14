import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming you are using axios for HTTP requests
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

function Chessboard() {
  const [board, setBoard] = useState(null);
  const getPieceImage = (piece) => {
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
  const squares = [];
  if (board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const isEvenRow = i % 2 === 0;
        const isEvenCol = j % 2 === 0;
        const isDarkSquare = (isEvenRow && !isEvenCol) || (!isEvenRow && isEvenCol);
        const squareClass = isDarkSquare ? 'bg-black' : 'bg-white';

        // Add the piece image if there is a piece on this square
        const pieceImage = getPieceImage(board[i][j]);
        const pieceElement = pieceImage ? <img src={pieceImage} alt="" /> : null;

        squares.push(
          <div key={`${i}-${j}`} className={`w-10 h-10 ${squareClass}`}>
            {pieceElement}
          </div>
        );
      }
    }
  }

  return (
    <div className="flex flex-wrap w-80 h-80 center">
      {squares}
    </div>
  );
}

export default Chessboard;
