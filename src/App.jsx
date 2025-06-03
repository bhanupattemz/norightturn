import { useEffect, useState, useRef } from 'react'
import "./App.css"
function App() {
  const [curr, setcurr] = useState([0, 0])
  const currRef = useRef(curr)
  const [game, setGame] = useState({
    size: [19, 19],
    path: [
      [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10], [0, 11], [0, 12], [0, 13], [0, 14], [0, 15], [0, 16], [0, 17], [0, 18],
      [1, 0], [1, 6], [1, 12], [1, 15], [1, 18],
      [2, 0], [2, 6], [2, 12], [2, 15], [2, 18],
      [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [3, 11], [3, 12], [3, 13], [3, 14], [3, 15], [3, 18],
      [4, 0], [4, 3], [4, 12], [4, 15], [4, 18],
      [5, 0], [5, 3], [5, 12], [5, 15], [5, 18],
      [6, 0], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 15], [6, 18],
      [7, 0], [7, 3], [7, 6], [7, 9], [7, 15], [7, 18],
      [8, 0], [8, 3], [8, 6], [8, 9], [8, 15], [8, 18],
      [9, 0], [9, 3], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10], [9, 11], [9, 12], [9, 13], [9, 14], [9, 15], [9, 16], [9, 17], [9, 18],
      [10, 0], [10, 3], [10, 9], [10, 15],
      [11, 0], [11, 3], [11, 9], [11, 15],
      [12, 0], [12, 3], [12, 4], [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12], [12, 13], [12, 14], [12, 15],
      [13, 0], [13, 3], [13, 6], [13, 15],
      [14, 0], [14, 3], [14, 6], [14, 15],
      [15, 0], [15, 1], [15, 2], [15, 3], [15, 4], [15, 5], [15, 6], [15, 7], [15, 8], [15, 9], [15, 10], [15, 11], [15, 12], [15, 13], [15, 14], [15, 15],
      [16, 3], [16, 15],
      [17, 3], [17, 15],
      [18, 3], [18, 15],
    ],
    start: [18, 3],
    end: [18, 15]
  })
  const [prevPath, setPrevPath] = useState([])
  const screenWidth = window.innerWidth
  const [grid, setGrid] = useState([])
  const [direction, setDirection] = useState([
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ])
  const directionRef = useRef(direction)
  const getRotationAngle = (dir) => {
    const [dx, dy] = dir
    if (dx === -1 && dy === 0) return 0
    if (dx === 0 && dy === 1) return 90
    if (dx === 1 && dy === 0) return 180
    if (dx === 0 && dy === -1) return 270
    return 0
  }

  const handleKeyPress = (event) => {
    if (grid.length < 0) return
    let key = event.key.toLowerCase()

    if (key == "w") {
      setcurr(prev => {
        let dx = prev[0] + directionRef.current[0][0]
        let dy = prev[1] + directionRef.current[0][1]
        if (dx < 0 || dx >= game.size[0] || dy < 0 || dy >= game.size[1] || (grid[dx][dy] && grid[dx][dy].isBlocked)) return prev
        setPrevPath(moves => [...moves, `${prev[0]}${prev[1]}`])
        return [dx, dy]
      })
    } else if (key == "a") {
      let [x, y] = currRef.current
      let dx = x + directionRef.current[3][0]
      let dy = y + directionRef.current[3][1]
      if (dx < 0 || dx >= game.size[0] || dy < 0 || dy >= game.size[1] || (grid[dx][dy] && grid[dx][dy].isBlocked)) return
      setcurr([dx, dy])
      setDirection((list) => [list[3], ...list.slice(0, 3)])
    }
  }
  useEffect(() => {
    const tempBlocked = game.path.map(item => `${item[0]},${item[1]}`)
    const tempgrid = []

    for (let i = 0; i < game.size[0]; i++) {
      const row = []
      for (let j = 0; j < game.size[1]; j++) {
        row.push({
          isBlocked: !tempBlocked.includes(`${i},${j}`)
        })
      }
      tempgrid.push(row)
    }

    setGrid(tempgrid)
    setcurr(game.start)
  }, [game])
  useEffect(() => {
    if (grid.length === 0) return;

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [grid]);
  useEffect(() => {
    directionRef.current = direction
  }, [direction])
  useEffect(() => {
    currRef.current = curr
  }, [curr])
  return (
    <main className='maze-game-main'>
      {curr[0] == game.end[0] && curr[1] == game.end[1] && <div>Reached Destination </div>}
      <div>
        <h1>No Right Turn Puzzle</h1>
        <h2>Press W to move forward,
        Press A to move left</h2>
      </div>
      <div
        className='maze-grid-container'
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${game.size[0]}, ${screenWidth < 600 ? 10 : 20}px)`,
          gridTemplateColumns: `repeat(${game.size[1]}, ${screenWidth < 600 ? 10 : 20}px)`
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className='maze-grid-cell'
              style={{
                backgroundColor: game.start[0] == rowIndex && game.start[1] == colIndex ? "green" : game.end[0] == rowIndex && game.end[1] == colIndex ? "red" : cell.isBlocked ? 'blue' : 'white',
                // border: '1px solid #ccc'
              }}
            >
              {curr[0] == rowIndex && curr[1] == colIndex && <img
                width={screenWidth < 600 ? 10 : 20}
                src='/rabbit.png'
                alt='rabbit-img'
                style={{
                  transform: `rotate(${getRotationAngle(direction[0])}deg)`,
                  transition: 'transform 0.2s ease'
                }}
              />}
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

export default App