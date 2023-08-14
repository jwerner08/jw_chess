import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming you are using axios for HTTP requests
import whitePawn from './assets/pieces/whitePawn.svg';
import blackPawn from './assets/pieces/blackPawn.svg';

function Chessboard() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    // Fetch the initial board from the server
    axios.get("/board")
      .then(response => {
        setBoard(response.data.squares);
      })
      .catch(error => {
        console.error("An error occurred while fetching the board data:", error);
      });
  }, []);

  // Function to get the SVG for a piece
  const getPieceImage = (piece) => {
    if (!piece) return null;
    if (piece.type === 'P' && piece.color === 'white') return whitePawn;
    if (piece.type === 'P' && piece.color === 'black') return blackPawn;
    // Add other piece types here...
  };

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


