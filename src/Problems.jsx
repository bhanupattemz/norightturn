import { useEffect, useState, useRef } from "react"
import { GenProblems } from "./Solution"
import { GenMaze } from "./GenMaze"
export default function Problems() {
    const screenWidth = window.innerWidth
    const [game, setGame] = useState(null)
    const hasInitialized = useRef(false)
    const [direction, setDirection] = useState([
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ])
    const [grid, setGrid] = useState([])
    useEffect(() => {
        if (!game || !game.start || !game.end || !game.size) return
        const tempBlocked = game.path.map(item => `${item[0]},${item[1]}`)
        const tempgrid = []
        let tempDirections = JSON.parse(JSON.stringify(direction))
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
    }, [game])
    useEffect(() => {
        if (!hasInitialized.current) {
            setGame(GenMaze(25, 25))
            hasInitialized.current = true
        }
    }, [])
    if (!game || !game.start || !game.end || !game.size || !game.path) return
    return (
        <main>
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