import React, {useState, useEffect} from 'react';
import './Board.css';

function Board(props) {
  // props:
  //    setGrid: string[][] => void
  //        This callback sends the grid to the parent.
  //    grid: string[][]
  //        If this is set, the moves are restricted to the marked squares in this grid.
  //    finishGame: void => void
  //        This callback is called when the grid is filled.
  const [board, setBoard] = useState([])
  const MAX_WIDTH = 10000;  // Used to create unique html index keys.

  // Count the number of 1's in the grid, and add 2 for the start and end.
  const BOARD_SIZE = !props.grid ? null
    : 2 + props.grid.reduce((sum, row) =>
                            sum + row.reduce((a, b)=>a+(+b||0), 0), 0);
  let start = {x:0, y:0};
  if (props.grid) {
    for (let y=0; y<props.grid.length; y++) {
      for (let x=0; x<props.grid[0].length; x++) {
        if (props.grid[y][x] === "S") {
          start = {x:x, y:y};
        }
      }
    }
  }
  const [moves, setMoves] = useState([start.x+';'+start.y]);
  const [curr_x, setCurr_x] = useState(start.x);
  const [curr_y, setCurr_y] = useState(start.y);
  const [frozen, setFrozen] = useState(false);

  useEffect(generate_board, [moves])
  useEffect(maybe_finish_game, [moves])

  function valid_move(x, y) {
    if (!props.grid) return true;
    return 0 <= y && y < props.grid.length &&
           0 <= x && x < props.grid[0].length &&
           ["1", "S", "F"].includes(props.grid[y][x]);
  }

  function maybe_finish_game() {
    if (moves.length === BOARD_SIZE && props.finishGame) {
      props.finishGame();
      setFrozen(true);
    }
  }

  function generate_board() {
    let moves_set = new Set(moves)
    let newBoard = []

    // Since the moves are encoded as strings (e.g. "2;5"),
    // we use a regex to extract the coordinates.
    let min_x = Math.min(...moves.map(mv=>+mv.match(/-?\d+/g)[0]));
    let max_x = Math.max(...moves.map(mv=>+mv.match(/-?\d+/g)[0]));
    let min_y = Math.min(...moves.map(mv=>+mv.match(/-?\d+/g)[1]));
    let max_y = Math.max(...moves.map(mv=>+mv.match(/-?\d+/g)[1]));

    if (props.grid) {
      min_x = 0;
      max_x = props.grid[0].length - 1;
      min_y = 0;
      max_y = props.grid.length - 1;
    }

    for (let y = min_y; y <= max_y; y++) {
      newBoard.push([]);
      for (let x = min_x; x <= max_x; x++) {
        const sq = x+";"+y;
        const state = {
          in_path: moves_set.has(sq),
          is_start: sq === moves[0],
          is_end: sq === moves[moves.length-1],
          on_board: props.grid ? ["1", "S", "F"].includes(props.grid[y-min_y][x-min_x]) : true,
        }
        // Since min_y can be negative we use y-min_y instead of just y
        // so that the indices start at 0.
        newBoard[y-min_y].push(state);
      }
    }
    setBoard(newBoard);
    if (props.setGrid) {
      const grid = newBoard.map(row=>row.map(
        state => state.is_start ? "S" :
               state.is_end ? "F" :
               state.in_path ? "1" : "0"));
      props.setGrid(grid);
    }
    if (props.setSolution) {
      // Reinidex moves to have nonegative indices.
      const reindexed_moves = moves.map(
        mv=>mv.match(/-?\d+/g).map((str,i)=>(+str)-[min_x, min_y][i]));
      props.setSolution(reindexed_moves);
    }
  }

  function exec_mv(dx, dy) {
    if (frozen) { return; }
    const sq = (curr_x+dx)+";"+(curr_y+dy);
    if (sq === moves[moves.length-2]) {
      // Undo move.
      setCurr_x(curr_x + dx);
      setCurr_y(curr_y + dy);
      setMoves(moves.slice(0, -1))
    } else if (moves.includes(sq)) {
      // Todo(azeezah@): Surface alert for invalid moves.
      console.log('invalid');
    } else if (valid_move(curr_x+dx, curr_y+dy)) {
      // Do move.
      setCurr_x(curr_x + dx);
      setCurr_y(curr_y + dy);
      setMoves([...moves, sq]);
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
    <table><tbody>
      {
        board.map((row, i) => {
          return (
            <tr key={i}>
            {row.map((mv, j)=>{
              return (<td key={i*MAX_WIDTH+j}
                          className={
                            (mv.in_path ? "seen" : "")
                          + (mv.is_start ? " start" : "")
                          + (mv.is_end ? " end" : "")
                          + (mv.on_board ? " on-board" : "")}>
                      </td>);
            })}
            </tr>
          );
        })
      }
    </tbody></table>
    </div>
  );
}

export default Board;
