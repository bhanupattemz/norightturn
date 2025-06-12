import { useEffect, useState, useRef, Fragment } from "react"
import { GetAllSolution } from './Solution'
import { GenMaze } from "./GenMaze"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "./GenPuzzle.css"
export default function App() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const singlePageRef = useRef(null);
    const multiPageContainerRef = useRef(null);
    const [solutions, setSolutions] = useState([])
    const [formData, setFormData] = useState({
        size: [15, 15],
        rotation: 1,
        start: [0, 14],
        end: [14, 0]
    })
    const [game, setGame] = useState({
        size: [25, 25],
        path: [
            [5, 0], [6, 0], [7, 0], [8, 0], [8, 1], [8, 2], [8, 3], [2, 1], [3, 1],
            [5, 7], [5, 8], [5, 9], [4, 9], [3, 9], [3, 8], [3, 7], [5, 7], [7, 7],
            [8, 7], [8, 8], [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [7, 13],
            [6, 13], [5, 13], [4, 13], [3, 13], [3, 12], [3, 11], [4, 11], [5, 11],
            [5, 12], [5, 13], [5, 14], [5, 15], [5, 16], [5, 17], [5, 18], [4, 18],
            [3, 18], [2, 18], [1, 18], [0, 18], [0, 17], [0, 16], [1, 16], [2, 16],
            [3, 16], [4, 16], [5, 16], [6, 21], [6, 23], [5, 23], [4, 23], [4, 21],
            [5, 21], [6, 21], [7, 21], [8, 21], [9, 21], [10, 21], [11, 21], [12, 21],
            [13, 21], [13, 22], [13, 23], [12, 23], [11, 23], [11, 22], [11, 21],
            [11, 20], [11, 19], [11, 18], [12, 18], [13, 18], [14, 18], [15, 18],
            [15, 19], [15, 20], [14, 20], [13, 20], [13, 19], [13, 18], [13, 17],
            [13, 16], [13, 15], [15, 15], [16, 15], [17, 15], [18, 15], [19, 15],
            [20, 15], [21, 15], [22, 15], [23, 15], [23, 16], [23, 17], [23, 18],
            [23, 19], [23, 20], [23, 21], [23, 22], [23, 23], [23, 24], [20, 24],
            [17, 24], [16, 24], [15, 24], [15, 23], [15, 22], [15, 20], [15, 19],
            [16, 19], [17, 19], [18, 19], [19, 19], [20, 19], [21, 19], [22, 19],
            [23, 19], [23, 21], [22, 21], [21, 21], [20, 21], [19, 21], [18, 19],
            [18, 18], [18, 17], [18, 16], [18, 15], [18, 14], [18, 13], [18, 12],
            [18, 11], [18, 10], [18, 9], [19, 9], [20, 9], [21, 9], [22, 9], [23, 9],
            [23, 10], [23, 11], [23, 12], [22, 12], [21, 12], [20, 12], [19, 12],
            [18, 12], [17, 12], [16, 12], [15, 12], [14, 12], [13, 12], [13, 11],
            [13, 10], [13, 9], [13, 8], [13, 7], [13, 6], [15, 8], [13, 8], [12, 8],
            [11, 8], [10, 8], [10, 7], [10, 6], [10, 5], [10, 4], [10, 3], [10, 2],
            [10, 1], [10, 0], [11, 0], [12, 0], [13, 0], [13, 2], [13, 3], [12, 3],
            [13, 3], [14, 3], [15, 3], [16, 3], [18, 3], [20, 5], [20, 6], [20, 7],
            [19, 7], [18, 7], [18, 6], [18, 5], [18, 4], [18, 3], [18, 2], [18, 0],
            [19, 0], [20, 0], [7, 23], [7, 22], [7, 20], [7, 19], [7, 18], [14, 8],
            [16, 0], [15, 0], [14, 0], [20, 1], [20, 3], [20, 4], [19, 3], [18, 1],
            [20, 2], [11, 3], [1, 1], [3, 2], [3, 5], [3, 6], [1, 9], [1, 7], [1, 8],
            [2, 7], [4, 7], [3, 10], [2, 13], [1, 13], [1, 12], [1, 11], [1, 10],
            [17, 3], [16, 1], [16, 2], [23, 13], [23, 14], [6, 18], [5, 19], [5, 20],
            [3, 21], [2, 21], [0, 21], [1, 21], [0, 20], [0, 19], [13, 5], [14, 5],
            [15, 5], [16, 5], [16, 6], [16, 7], [16, 8], [10, 9], [10, 10], [11, 10],
            [11, 11], [11, 12], [12, 12], [21, 3], [22, 3], [22, 4], [22, 5], [22, 7],
            [22, 8], [22, 6], [9, 15], [9, 16], [9, 17], [9, 18], [9, 19], [9, 20],
            [6, 16], [7, 16], [7, 14], [7, 15], [11, 15], [12, 15], [15, 17], [15, 16],
            [19, 17], [20, 17], [21, 17], [21, 13], [21, 14], [20, 22], [20, 23],
            [14, 10], [15, 10], [16, 11], [9, 0], [23, 3], [24, 3], [24, 5], [24, 6],
            [24, 4], [23, 6], [8, 4], [1, 4], [1, 5], [1, 6], [2, 14], [2, 15],
            [9, 10], [12, 13], [12, 14], [8, 23], [9, 23], [9, 22], [8, 15], [9, 12],
            [10, 12], [14, 14], [14, 13], [16, 13], [15, 21], [17, 21], [17, 22],
            [17, 23], [18, 21], [20, 20], [20, 10], [11, 6], [12, 6], [14, 4], [4, 22],
            [2, 17], [6, 11], [6, 9], [17, 7], [19, 8], [13, 1], [7, 4], [6, 4],
            [5, 4], [4, 4], [3, 4], [2, 4], [3, 3], [5, 1], [5, 2], [6, 2], [7, 2],
            [4, 2], [0, 4], [0, 3], [0, 2], [0, 1], [19, 23], [21, 23], [17, 17],
            [16, 10], [9, 2], [6, 3], [22, 23], [16, 17], [6, 7], [7, 5], [7, 6],
            [24, 2], [24, 1], [23, 1], [22, 1], [22, 0], [21, 0], [2, 24], [1, 24],
            [0, 24], [0, 22], [0, 23], [2, 22], [2, 23], [10, 13], [14, 15], [11, 16],
            [5, 5], [3, 0], [10, 16], [10, 19], [8, 19], [21, 11]
        ],
        start: [5, 0],
        end: [20, 0],
        rotation: 2
    })
    const [grid, setGrid] = useState({})
    const [grids, setGrids] = useState([])
    const [loading, setLoading] = useState(false)
    const [previousGame, setPreviousGame] = useState(null)
    const downloadPDF = async () => {
        setLoading(true)
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();

        const singleCanvas = await html2canvas(singlePageRef.current, { scale: 2 });
        const singleImgData = singleCanvas.toDataURL('image/png');
        const singleImgProps = pdf.getImageProperties(singleImgData);
        const singleImgHeight = (singleImgProps.height * pdfWidth) / singleImgProps.width;


        pdf.addImage(singleImgData, 'PNG', 0, 0, pdfWidth, singleImgHeight);

        const childDivs = multiPageContainerRef.current.querySelectorAll('.maze-solution-container');
        for (let i = 0; i < childDivs.length; i++) {
            const child = childDivs[i];
            pdf.addPage();

            const solutionTitle = `Solution ${i + 1}`;
            pdf.setFontSize(16);
            pdf.text(solutionTitle, 10, 20);

            const childCanvas = await html2canvas(child, { scale: 2 });
            const imgData = childCanvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 30, pdfWidth, imgHeight);
        }

        pdf.save('puzzle_solutions.pdf');
        setLoading(false)
    };
    useEffect(() => {
        // setGame(prev => {
        //     let path = GenMaze(prev.size[0], prev.size[1], prev.start, prev.end, prev.rotation)
        //     let tempGame = localStorage.getItem("game")
        //     if (tempGame) {
        //         setPreviousGame(tempGame)
        //     }
        //     if (path) {
        //         return path
        //     }
        //     return prev
        // })
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    useEffect(() => {
        if (!game) return;
        setLoading(true)
        const tempBlocked = game.path.map(item => `${item[0]},${item[1]}`);
        const grid = [];

        for (let i = 0; i < game.size[0]; i++) {
            const row = [];
            for (let j = 0; j < game.size[1]; j++) {
                row.push({
                    isBlocked: !tempBlocked.includes(`${i},${j}`),
                    color: null,
                    num: []
                });
            }
            grid.push(row);
        }
        setGrid(grid)

        let direction = [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1]
        ];

        for (let i = 0; i < game.rotation; i += 1) {
            direction = [direction[3], ...direction.slice(0, 3)]
        }

        let tempGrids = []
        let solutions = GetAllSolution(grid, game.start, game.end, direction, game.size)
        if (solutions) {
            for (let i = 0; i < solutions.length; i += 1) {
                let num = 0
                let tempgrid = JSON.parse(JSON.stringify(grid))
                for (let [x, y] of solutions[i]) {
                    tempgrid[x][y].color = "lightgreen";
                    tempgrid[x][y].num.push(num)
                    num += 1
                }
                tempGrids.push(tempgrid)
            }
        }
        setLoading(false)
        setSolutions(solutions)
        setGrids(tempGrids);
    }, [game]);

    if (!game || !grid.length) return <div className="loading-conatiner"><img src="/maze_loading.gif" alt="loading-gif" /></div>;

    const cellSize = screenWidth < 600 ? 15 : 20;

    return (
        <Fragment>

            <main className="maze-game-main">
                <h1>Puzzle Generation</h1>
                <p>Set the starting point, ending point, and the size of the maze. A path will be generated between the start and end points. You can further customize the maze by removing blocks with a click. All possible solutions will be displayed below the maze.</p>
                <form className="gen-maze-form" onSubmit={(e) => {
                    e.preventDefault();
                    if (formData.start[0] < 0 || formData.start[0] >= formData.size[0] || formData.end[0] < 0 || formData.end[0] >= formData.size[0] || formData.start[1] < 0 || formData.start[1] >= formData.size[1] || formData.end[1] < 0 || formData.end[1] >= formData.size[1]) {
                        return
                    }
                    setGame(prev => {
                        let game = GenMaze(formData.size[0], formData.size[1], formData.start, formData.end, formData.rotation)
                        return game
                    })
                }}>
                    <div className="gen-maze-form-conatiner">
                        <div>
                            <label htmlFor="size">Grid Size :
                                <input type="number" min={1} max={25} value={formData.size[0]} onChange={e => setFormData(prev => ({ ...prev, size: [parseInt(e.target.value), prev.size[1]] }))} />X
                                <input type="number" min={1} max={25} value={formData.size[1]} onChange={e => setFormData(prev => ({ ...prev, size: [prev.size[0], parseInt(e.target.value)] }))} />
                            </label>

                        </div>
                        <div>
                            <label htmlFor="size">Starting Point :
                                <input type="number" min={0} max={formData.size[0] - 1} value={formData.start[0]} onChange={e => setFormData(prev => ({ ...prev, start: [parseInt(e.target.value), prev.start[1]] }))} />X
                                <input type="number" min={0} max={formData.size[1] - 1} value={formData.start[1]} onChange={e => setFormData(prev => ({ ...prev, start: [prev.start[0], parseInt(e.target.value)] }))} />
                            </label>

                        </div>
                        <div>
                            <label htmlFor="size">Ending Point :
                                <input type="number" min={0} max={formData.size[0] - 1} value={formData.end[0]} onChange={e => setFormData(prev => ({ ...prev, end: [parseInt(e.target.value), prev.end[1]] }))} />X
                                <input type="number" min={0} max={formData.size[1] - 1} value={formData.end[1]} onChange={e => setFormData(prev => ({ ...prev, end: [prev.end[0], parseInt(e.target.value)] }))} />
                            </label>

                        </div>

                        <div>
                            <label htmlFor="size">Facing :
                                <select name="roation" value={formData.rotation} onChange={e => setFormData(prev => ({ ...prev, rotation: parseInt(e.target.value) }))} >
                                    <option value="4">Front</option>
                                    <option value="1">Left</option>
                                    <option value="2">Back</option>
                                    <option value="3">Right</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <button>Set</button>
                </form>
                {previousGame && <div style={{
                    margin: "20px 0px 10px 0px"
                }}>
                    <a href="/maze/own">Play previously generated game</a>
                </div>}
                <div className="maze-generation-container">
                    <div
                        className='maze-grid-container'
                        ref={singlePageRef}
                        style={{
                            display: 'grid',
                            gridTemplateRows: `repeat(${game.size[0]}, ${cellSize}px)`,
                            gridTemplateColumns: `repeat(${game.size[1]}, ${cellSize}px)`
                        }}
                    >
                        {grid.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className='maze-grid-cell gen-maze-cell'
                                    style={{
                                        backgroundColor: game.start[0] === rowIndex && game.start[1] === colIndex ? "green" :
                                            game.end[0] === rowIndex && game.end[1] === colIndex ? "red" :
                                                cell.isBlocked ? 'blue' : 'white'
                                    }}
                                    onClick={() => {
                                        if (!(game.start[0] === rowIndex && game.start[1] === colIndex) && !(game.end[0] === rowIndex && game.end[1] === colIndex)) {
                                            setGame(prev => {
                                                let path = JSON.parse(JSON.stringify(prev.path))
                                                if (cell.isBlocked) {
                                                    path.push([rowIndex, colIndex])
                                                } else {
                                                    path = path.filter(([x, y]) => !(x == rowIndex && y == colIndex))

                                                }
                                                return {
                                                    ...prev,
                                                    path: path
                                                }
                                            })
                                        }
                                    }}
                                >
                                    {game.start[0] == rowIndex && game.start[1] == colIndex && <img
                                        width={screenWidth < 600 ? 10 : 20}
                                        src='/rabbit.png'
                                        alt='rabbit-img'
                                        style={{
                                            transform: `rotate(${-90 * (game.rotation)}deg)`,
                                            transition: 'transform 0.2s ease',
                                            zIndex: "1"
                                        }}
                                    />}
                                    <div className='maze-text'>
                                        {game.start[0] === rowIndex && game.start[1] === colIndex && "X"}
                                        {game.end[0] === rowIndex && game.end[1] === colIndex && "O"}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="gen_maze-btns">
                        {loading ? <button>Download <img style={{ backgroundColor: "" }} width={30} src="/maze_loading.gif" alt="loading-gif" /></button> : <button onClick={downloadPDF}>Download</button>}
                        <button onClick={() => {
                            let tempgame = JSON.parse(JSON.stringify(game))
                            if (solutions.length == 0) {
                                alert("game want atleast one solution to save")
                                return
                            }
                            tempgame.solution = solutions[0]
                            localStorage.setItem("game", JSON.stringify(tempgame))
                            window.location.href = "/maze/own"
                        }}>Save</button>
                    </div>

                </div>
                <div className="maze-solutions-container" ref={multiPageContainerRef}>
                    <h2>Total solutions: {grids.length <= 50 ? grids.length : "50+"}</h2>

                    {grids.map((grid, inx) => (
                        <div
                            key={inx}
                            className='maze-grid-container maze-solution-container'
                            style={{
                                display: 'grid',
                                gridTemplateRows: `repeat(${game.size[0]}, ${cellSize}px)`,
                                gridTemplateColumns: `repeat(${game.size[1]}, ${cellSize}px)`,
                                marginBottom: '20px'
                            }}
                        >
                            {grid.map((row, rowIndex) =>
                                row.map((cell, colIndex) => (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className='maze-grid-cell'
                                        style={{
                                            backgroundColor: game.start[0] === rowIndex && game.start[1] === colIndex ? "green" :
                                                game.end[0] === rowIndex && game.end[1] === colIndex ? "red" :
                                                    cell.color ? cell.color :
                                                        cell.isBlocked ? 'blue' : 'white'
                                        }}
                                    >
                                        <div className='maze-text'>
                                            {game.start[0] === rowIndex && game.start[1] === colIndex && "X"}
                                            {game.end[0] === rowIndex && game.end[1] === colIndex && "O"}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </Fragment >

    )
}