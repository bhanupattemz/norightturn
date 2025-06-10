import { useEffect, useState } from "react"
import { GetSolution } from './Solution'
// import "./App.css"
export default function App() {
  const screenWidth = window.innerWidth;

  const [game, setGame] = useState({
    size: [17, 17],
    path: [
      [1, 1], [1, 2], [1, 3], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1, 12], [1, 13], [1, 14], [1, 15],
      [2, 1], [2, 3], [2, 5], [2, 9], [2, 13], [2, 15],
      [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 9], [3, 10], [3, 11], [3, 13], [3, 14], [3, 15],
      [4, 1], [4, 3], [4, 5], [4, 7], [4, 9], [4, 11], [4, 13],
      [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 7], [5, 8], [5, 9], [5, 10], [5, 11], [5, 12], [5, 13], [5, 14], [5, 15],
      [6, 3], [6, 5], [6, 7], [6, 11], [6, 15],
      [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 7], [7, 8], [7, 9], [7, 10], [7, 11], [7, 12], [7, 13], [7, 14], [7, 15],
      [8, 1], [8, 3], [8, 5], [8, 7], [8, 9], [8, 13], [8, 15],
      [9, 1], [9, 2], [9, 3], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10], [9, 11], [9, 12], [9, 13], [9, 15],
      [10, 1], [10, 3], [10, 5], [10, 9], [10, 11], [10, 13], [10, 15],
      [11, 1], [11, 2], [11, 3], [11, 4], [11, 5], [11, 7], [11, 8], [11, 9], [11, 10], [11, 11], [11, 12], [11, 13], [11, 15],
      [12, 1], [12, 5], [12, 7], [12, 9], [12, 11], [12, 13], [12, 15],
      [13, 1], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 11], [13, 12], [13, 13], [13, 14], [13, 15],
      [14, 3], [14, 7], [14, 11], [14, 13], [14, 15],
      [15, 1], [15, 2], [15, 3], [15, 4], [15, 5], [15, 6], [15, 7], [15, 8], [15, 9], [15, 10], [15, 11], [15, 13], [15, 14], [15, 15],

    ],
    start: [15, 1],
    end: [13, 1],
    rotations: 3
  })

  // const [game, setGame] = useState({
  //   size: [19, 19],
  //   path: [
  //     [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10], [0, 11], [0, 12], [0, 13], [0, 14], [0, 15], [0, 16], [0, 17], [0, 18],
  //     [1, 0], [1, 6], [1, 12], [1, 15], [1, 18],
  //     [2, 0], [2, 6], [2, 12], [2, 15], [2, 18],
  //     [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [3, 11], [3, 12], [3, 13], [3, 14], [3, 15], [3, 18],
  //     [4, 0], [4, 3], [4, 12], [4, 15], [4, 18],
  //     [5, 0], [5, 3], [5, 12], [5, 15], [5, 18],
  //     [6, 0], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 15], [6, 18],
  //     [7, 0], [7, 3], [7, 6], [7, 9], [7, 15], [7, 18],
  //     [8, 0], [8, 3], [8, 6], [8, 9], [8, 15], [8, 18],
  //     [9, 0], [9, 3], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10], [9, 11], [9, 12], [9, 13], [9, 14], [9, 15], [9, 16], [9, 17], [9, 18],
  //     [10, 0], [10, 3], [10, 9], [10, 15],
  //     [11, 0], [11, 3], [11, 9], [11, 15],
  //     [12, 0], [12, 3], [12, 4], [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12], [12, 13], [12, 14], [12, 15],
  //     [13, 0], [13, 3], [13, 6], [13, 15],
  //     [14, 0], [14, 3], [14, 6], [14, 15],
  //     [15, 0], [15, 1], [15, 2], [15, 3], [15, 4], [15, 5], [15, 6], [15, 7], [15, 8], [15, 9], [15, 10], [15, 11], [15, 12], [15, 13], [15, 14], [15, 15],
  //     [16, 3], [16, 15],
  //     [17, 3], [17, 15],
  //     [18, 3], [18, 15],
  //   ],
  //   start: [18, 3],
  //   end: [18, 15]
  // })

  const [grid, setGrid] = useState([])
  useEffect(() => {
    if (!game) return;

    const tempBlocked = game.path.map(item => `${item[0]},${item[1]}`);
    const tempgrid = [];

    for (let i = 0; i < game.size[0]; i++) {
      const row = [];
      for (let j = 0; j < game.size[1]; j++) {
        row.push({
          isBlocked: !tempBlocked.includes(`${i},${j}`),
          color: null,
          num: []
        });
      }
      tempgrid.push(row);
    }

    let tempSolution = [];
    let direction = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1]
    ];
    for (let i = 0; i < game.rotations; i += 1) {
      direction = [direction[3], ...direction.slice(0, 3)]
    }
    if (GetSolution(tempgrid, game.start, game.end, tempSolution, direction, game.size)) {
      let num = 0
      for (let [x, y] of tempSolution) {
        tempgrid[x][y].color = "lightgreen";
        tempgrid[x][y].num.push(num)
        num += 1
      }
      console.log(JSON.stringify(tempSolution))
    }

    setGrid(tempgrid);
  }, [game]);

  return (
    <main>
      <div
        className='maze-grid-container'
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${game.size[0]}, ${screenWidth < 600 ? 30 : 50}px)`,
          gridTemplateColumns: `repeat(${game.size[1]}, ${screenWidth < 600 ? 30 : 50}px)`
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className='maze-grid-cell'
              style={{
                backgroundColor: game.start[0] == rowIndex && game.start[1] == colIndex ? "green" : game.end[0] == rowIndex && game.end[1] == colIndex ? "red" : cell.color ? cell.color : cell.isBlocked ? 'blue' : 'white',
                // border: '1px solid #ccc'
              }}
            >
              <b>{cell.num && `${cell.num}`}</b>

              <div className='maze-text'>
                {game.start[0] == rowIndex && game.start[1] == colIndex && "X"}
                {game.end[0] == rowIndex && game.end[1] == colIndex && "O"}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}