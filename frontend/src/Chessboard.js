import React from 'react';
import whitePawn from './assets/pieces/whitePawn.svg';
import blackPawn from './assets/pieces/blackPawn.svg';

function Chessboard() {
  const rows = 8;
  const cols = 8;

  // Generate the grid
  const squares = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const isEvenRow = i % 2 === 0;
      const isEvenCol = j % 2 === 0;
      const isDarkSquare = (isEvenRow && !isEvenCol) || (!isEvenRow && isEvenCol);
      const squareClass = isDarkSquare ? 'bg-black' : 'bg-white';

      squares.push(<div key={`${i}-${j}`} className={`w-10 h-10 ${squareClass}`} />);
    }
  }

  return (
    <div className="flex flex-wrap w-80 h-80 center">
      {squares}
    </div>
  );
}

export default Chessboard;

