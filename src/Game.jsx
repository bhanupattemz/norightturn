import { useEffect, useState, useRef, Fragment } from 'react'
import "./App.css"
import { getGame, getTLevels } from "./Games"
import { GetSolution } from "./Solution"
import { useParams, useNavigate } from "react-router-dom"
import { MdCancel } from "react-icons/md";
import { FaArrowUp, FaArrowLeft } from "react-icons/fa";
import { IoIosUndo } from "react-icons/io";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
function App() {
  const [curr, setcurr] = useState([0, 0])
  const currRef = useRef(curr)
  const [game, setGame] = useState(null)
  const [prevPath, setPrevPath] = useState([])
  const PrevRef = useRef(prevPath)
  const [sGrid, setSGrid] = useState({})
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const singlePageRef = useRef(null)
  const screenWidth = window.innerWidth
  const [tsteps, setTSteps] = useState(0)
  const params = useParams()
  let level = parseInt(params.level)
  const tLevels = getTLevels()
  const [grid, setGrid] = useState([])
  const [direction, setDirection] = useState([
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ])
  const directionRef = useRef(direction)

  const downloadPDF = async () => {
    try {
      setLoading(true);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const marginTop = 30; // Leave space for title

      // Capture canvas
      const canvas = await html2canvas(singlePageRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.setFontSize(16);
      pdf.text(`No Right Turn Maze - Level ${level}`, 10, 20);

      pdf.addImage(imgData, 'PNG', 0, marginTop, pdfWidth, imgHeight);

      pdf.save(`maze_level_${level}.pdf`);
    } catch (error) {
      console.error('PDF download failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRotationAngle = (dir) => {
    const [dx, dy] = dir
    if (dx === -1 && dy === 0) return 0
    if (dx === 0 && dy === 1) return 90
    if (dx === 1 && dy === 0) return 180
    if (dx === 0 && dy === -1) return 270
    return 0
  }
  const movePrevious = () => {
    let path = JSON.parse(JSON.stringify(PrevRef.current))
    if (path.length > 0) {
      let prev = path.pop()
      setcurr(prev.cell)
      if (prev.isRotated) {
        setDirection((list) => [...list.slice(1), list[0]])
      }
      setPrevPath(path)
    }
  }
  const moveForward = () => {
    let [x, y] = currRef.current
    setPrevPath(moves => [...moves, { cell: [x, y], isRotated: false }])
    setcurr(prev => {
      const dx = prev[0] + directionRef.current[0][0]
      const dy = prev[1] + directionRef.current[0][1]
      if (dx < 0 || dx >= game.size[0] || dy < 0 || dy >= game.size[1] || (grid[dx][dy] && grid[dx][dy].isBlocked)) return prev
      return [dx, dy]
    })
  }
  const moveLeft = () => {
    let [x, y] = currRef.current
    let dx = x + directionRef.current[3][0]
    let dy = y + directionRef.current[3][1]
    if (dx < 0 || dx >= game.size[0] || dy < 0 || dy >= game.size[1] || (grid[dx][dy] && grid[dx][dy].isBlocked)) return
    setPrevPath(moves => [...moves, { cell: [x, y], isRotated: true }])
    setcurr([dx, dy])
    setDirection((list) => [list[3], ...list.slice(0, 3)])
  }

  const handleKeyPress = (event) => {
    if (grid.length < 0) return
    let key = event.key.toLowerCase()

    if (key == "w" || key == "arrowup") {
      moveForward()
    } else if (key == "a" || key == "arrowleft") {
      moveLeft()
    } else if (key == "s" || key == "arrowdown") {
      movePrevious()
    }
  }
  const handleSolutionClick = () => {
    setLoading(true)
    setOpen(true)
    let tempgrid = JSON.parse(JSON.stringify(grid))
    let tempSolution = [];
    let tempdirection = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1]
    ];
    for (let i = 0; i < game.rotation; i += 1) {
      tempdirection = [tempdirection[3], ...tempdirection.slice(0, 3)]
    }
    if (GetSolution(tempgrid, game.start, game.end, tempSolution, tempdirection, game.size)) {
      let num = 0
      for (let [x, y] of tempSolution) {
        tempgrid[x][y].color = "lightgreen";
        num += 1
      }
      setTSteps(num)
    }

    setSGrid(tempgrid)
    setLoading(false)
  }
  useEffect(() => {
    if (!game) return
    const tempBlocked = game.path.map(item => `${item[0]},${item[1]}`)
    const tempgrid = []
    let tempDirections = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1]
    ]
    for (let i = 0; i < game.rotation; i += 1) {
      tempDirections = [tempDirections[3], ...tempDirections.slice(0, 3)]
    }
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
    setDirection(tempDirections)
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
  useEffect(() => {
    if (level <= 0) {
      window.location.href = "/maze/1"
    } else if (level > tLevels) {
      window.location.href = `/maze/${tLevels}`
    }
    localStorage.setItem("level", level)
    setGame(getGame(level))
  }, [level])
  useEffect(() => {
    PrevRef.current = prevPath
  }, [prevPath])
  if (!game || game.path.length == 0 || !game.size || !game.start || !game.end) return
  return (
    <Fragment>
      {open && <div className='maze-pop-up-container'>
        <div className='maze-pop-up-body'>
          <div className='maze-pop-up-cancel'><span onClick={() => setOpen(false)}><MdCancel /></span></div>
          <h2>Solution</h2>
          <p>Reaching the destination requires {tsteps} steps.</p>
          {sGrid.length > 0 ? <div
            className='maze-grid-container'
            style={{
              display: 'grid',
              gridTemplateRows: `repeat(${game.size[0]}, ${screenWidth < 600 ? 10 : 20}px)`,
              gridTemplateColumns: `repeat(${game.size[1]}, ${screenWidth < 600 ? 10 : 20}px)`
            }}
          >
            {sGrid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className='maze-grid-cell'
                  style={{
                    backgroundColor: game.start[0] == rowIndex && game.start[1] == colIndex ? "green" : game.end[0] == rowIndex && game.end[1] == colIndex ? "red" : cell.color ? cell.color : cell.isBlocked ? 'blue' : 'white',
                    // border: '1px solid #ccc'
                  }}
                >
                  {/* <b>{cell.num && `${cell.num}`}</b> */}

                  <div className='maze-text'>
                    {game.start[0] == rowIndex && game.start[1] == colIndex && "X"}
                    {game.end[0] == rowIndex && game.end[1] == colIndex && "O"}
                  </div>
                </div>
              ))
            )}
          </div> : <div className='maze-loading-div'><img src="/maze_loading.gif" alt="loading-gif" /></div>}
        </div>
      </div>}
      <main className='maze-game-main'>
        <div >
          <h2>Level {level}</h2>
          {curr[0] == game.end[0] && curr[1] == game.end[1] && <div className='maze-success-msg'>Destination Reached</div>}
        </div>
        <div
          className='maze-grid-container'
          ref={singlePageRef}
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(${game.size[0]}, ${screenWidth < 600 ? 12 : 20}px)`,
            gridTemplateColumns: `repeat(${game.size[1]}, ${screenWidth < 600 ? 12 : 20}px)`
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              let ispath = false
              let path = prevPath
              if (rowIndex == curr[0] && colIndex == curr[1]) {
                ispath = true
              } else {
                for (let i = 0; i < path.length; i += 1) {
                  if (path[i].cell[0] == rowIndex && path[i].cell[1] == colIndex) {
                    ispath = true
                  }
                }
              }

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className='maze-grid-cell'
                  style={{
                    backgroundColor: game.start[0] == rowIndex && game.start[1] == colIndex ? "green" : game.end[0] == rowIndex && game.end[1] == colIndex ? "red" : cell.isBlocked ? 'blue' : ispath ? "#384c6179" : 'white',
                    backgroundImage: `${cell.isBlocked ? 'url("/")' : ""}`,
                    backgroundPosition: "center",
                    backgroundSize: "auto"
                    // border: '1px solid #ccc'
                  }}
                >
                  {curr[0] == rowIndex && curr[1] == colIndex && <img
                    width={screenWidth < 600 ? 10 : 20}
                    src='/rabbit.png'
                    alt='rabbit-img'
                    style={{
                      transform: `rotate(${getRotationAngle(direction[0])}deg)`,
                      transition: 'transform 0.2s ease',
                      zIndex: "1"
                    }}
                  />}
                  <div className='maze-text'>
                    {game.start[0] == rowIndex && game.start[1] == colIndex && "X"}
                    {game.end[0] == rowIndex && game.end[1] == colIndex && "O"}
                  </div>
                </div>
              )
            })
          )}
        </div>
        <div className='maze-movement-btns'>
          <button onClick={moveLeft}>Move Left <FaArrowLeft /></button>
          <button onClick={moveForward}>Move Front <FaArrowUp /></button>
          <button onClick={movePrevious}>Move Previous <IoIosUndo /></button>

        </div>
        <div className='maze-feature-btns'>
          <button
            onClick={() => {
              window.location.href = `/maze/${level - 1}`
            }}
            style={{ cursor: `${1 >= level ? "no-drop" : "pointer"}` }}
          >Previous</button>
          <button onClick={() => window.location.href = `/maze/${level}`}>Refresh</button>
          <button onClick={() => {
            handleSolutionClick()
          }}>Solution</button>
          {loading ? <button>Download <img style={{ backgroundColor: "" }} width={30} src="/maze_loading.gif" alt="loading-gif" /></button> : <button onClick={downloadPDF}>Download</button>}
          <button
            onClick={() => {
              window.location.href = `/maze/${level + 1}`
            }}
            style={{ cursor: `${tLevels <= level ? "no-drop" : "pointer"}` }}
          >Next</button>
        </div>
      </main>
    </Fragment>
  )
}

export default App