import "./Home.css"
export default function Home() {
    const level = localStorage.getItem("level")
    return (
        <main className="maze-game-main maze-home-page-main">
            <img src="/home-img.png" alt="maze-img" />
            <div className="maze-home-page-conatiner">
                <button onClick={() => window.location.href = `/maze/${level ? level : 1}`}>Play Now</button>
                <button onClick={() => window.location.href = "/gen_maze"}>Generate Own</button>
            </div>
        </main>
    )
}