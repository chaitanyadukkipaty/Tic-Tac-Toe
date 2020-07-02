import React from "react";
import Square from "./Squares";

const style = {
  border: "4px solid darkblue",
  borderRadius: "10px",
  width: "250px",
  height: "250px",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
};

const Board = ({ squares, onClick }) => {
  return (
    <div style={style}>
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

export default Board;
