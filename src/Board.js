import React, {useState, useEffect} from 'react';
import './Board.css';

function Board(props) {
  const [moves, setMoves] = useState(["0;0"]);
  const [curr_x, setCurr_x] = useState(0);
  const [curr_y, setCurr_y] = useState(0);
  const [board, setBoard] = useState([])
  const MAX_WIDTH = 10000;  // Used to create unique html index keys.

  useEffect(generate_board, [moves])

  function generate_board() {
    let moves_set = new Set(moves)
    let newBoard = []

    // Since the moves are encoded as strings (e.g. "2;5"),
    // we use a regex to extract the coordinates.
    let min_x = Math.min(...moves.map(mv=>+mv.match(/-?\d+/g)[0]));
    let max_x = Math.max(...moves.map(mv=>+mv.match(/-?\d+/g)[0]));
    let min_y = Math.min(...moves.map(mv=>+mv.match(/-?\d+/g)[1]));
    let max_y = Math.max(...moves.map(mv=>+mv.match(/-?\d+/g)[1]));

    for (let y = min_y; y <= max_y; y++) {
      newBoard.push([])
      for (let x = min_x; x <= max_x; x++) {
        // Since min_y can be negative we use y-min_y instead of just y
        // so that the indices starts at 0.
        const sq = x+";"+y;
        let state = {
          in_path: moves_set.has(sq),
          is_start: sq === moves[0],
          is_end: sq === moves[moves.length-1],
        }
        newBoard[y-min_y].push(state);
      }
    }
    setBoard(newBoard)
    const grid = newBoard.map(row=>row.map(
      state => state.is_start ? "S" :
               state.is_end ? "F" :
               state.in_path ? "1" : "0"));
    props.setGrid(grid);
    console.log(grid);
  }

  function exec_mv(dx, dy) {
    const sq = (curr_x+dx)+";"+(curr_y+dy);
    if (sq === moves[moves.length-2]) {
      // Undo move.
      setCurr_x(curr_x + dx);
      setCurr_y(curr_y + dy);
      setMoves(moves.slice(0, -1))
    } else if (moves.includes(sq)) {
      // Todo(azeezah@): Surface alert for invalid moves.
      console.log('invalid');
    } else {
      // Do move.
      setCurr_x(curr_x + dx);
      setCurr_y(curr_y + dy);
      setMoves([...moves, sq])
    }
  }

  document.onkeydown = function (e) {
    e = e || window.event;
    const up = 38, down = 40, left = 37, right = 39;
    switch (e.keyCode) {
      case up: {
        exec_mv(0, -1);
        break;
      }
      case down: {
        exec_mv(0, 1);
        break;
      }
      case right: {
        exec_mv(1, 0);
        break;
      }
      case left: {
        exec_mv(-1, 0);
        break;
      }
      default: {
        break;
      }
    }
  }
  return (
    <div className="board">
    <table>
      {
        board.map((row, i) => {
          return (
            <tr key={i}>
            {row.map((mv, j)=>{
              return (<td key={i*MAX_WIDTH+j}
                          className={
                            (mv.in_path ? "seen" : "")
                          + (mv.is_start ? " start" : "")
                          + (mv.is_end ? " end" : "")}>
                      </td>);
            })}
            </tr>
          );
        })
      }
    </table>
    </div>
  );
}

export default Board;
