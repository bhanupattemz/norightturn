import { useState, Fragment } from "react"
import "./Header.css"
import { MdCancel } from "react-icons/md";
export default function Headers() {
    const [open, setOpen] = useState(false)
    const location = window.location.pathname
    const level = localStorage.getItem("level")
    return (
        <Fragment>
            {open && <div className="maze-pop-up-container">
                <div className="maze-pop-up-body">
                    <div className='maze-pop-up-cancel'><span onClick={() => setOpen(false)}><MdCancel /></span></div>
                    <h2>About Game</h2>
                    <div>
                        <p>
                            This is a maze game where your goal is to navigate from the starting position (green) to the ending position (red). You can only move forward or to the left — moving to the right is not allowed. You can also undo your move to return to the previous step.
                        </p>

                    </div>
                    <div>
                        <h3>Generate Your Own Maze</h3>
                        <p>
                            You have the option to generate your own puzzle. Set the starting point, ending point, and the size of the maze. A path will be generated between the start and end points. You can further customize the maze by removing blocks with a click. All possible solutions will be displayed below the maze.
                        </p>
                    </div>
                    <div>
                        <h3>Controls</h3>
                        <ul style={{ textAlign: "left" }}>
                            <li>W / Up Arrow: Move Forward</li>
                            <li>A / Left Arrow: Move Left</li>
                            <li>S / Down Arrow: Undo Previous Move</li>
                        </ul>
                    </div>
                </div>

            </div>}
            <header className="maze-Header">
                <h1>No Right Turn Maze</h1>
                <div>
                    {location != "/" && <button onClick={() => window.location.href = "/"}>Home</button>}
                    {!location.includes(`/maze/`) && <button onClick={() => window.location.href = `/maze/${level ? level : 1}`}>Play Levels</button>}
                    {location != "/gen_maze" && <button onClick={() => window.location.href = "/gen_maze"}>Generate Own Puzzles</button>}
                    <button onClick={() => { setOpen(true) }}>About</button>
                </div>
            </header>
        </Fragment>
    )
}