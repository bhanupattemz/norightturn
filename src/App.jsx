import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Fragment } from "react"
import "./App.css"
import Game from "./Game"
import MutiSolution from "./MutiSolution"
import Home from "./Home"
import Ownmaze from "./OwnMaze"
import Headers from "./Header"
import Nothing from "./duplicate"
export default function App() {
  return (
    <Fragment>
      <Headers />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maze/own" element={<Ownmaze />} />
          <Route path="/maze/:level" element={<Game />} />
          <Route path="/gen_maze" element={<MutiSolution />} />
          {/* <Route path="/nothing" element={<Nothing />} /> */}
        </Routes>
      </Router>
    </Fragment>
  )
}