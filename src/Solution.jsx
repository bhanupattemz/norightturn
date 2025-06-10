const GetSolution = (grid, curr, end, solution, direction, size) => {
    if (!size || size.length !== 2) return false;
    const path = [];
    const prev = []
    const dfs = (x, y, dir) => {
        const key = `${x},${y}`;
        if (x === end[0] && y === end[1]) {
            path.push([x, y]);
            return true;
        }
        path.push([x, y]);
        prev.push(`${[x, y]}`);
        let noTobe = new Set()

        let inx = prev.indexOf(`${[x, y]}`)
        if (inx != prev.length - 1) {
            for (let i = 0; i < prev.length - 1; i += 1) {
                if (`${[x, y]}` == prev[i]) {
                    noTobe.add(prev[i + 1])
                }
            }
        }
        let [dx, dy] = [x + dir[0][0], y + dir[0][1]];
        if (
            dx >= 0 && dx < size[0] && dy >= 0 && dy < size[1] &&
            (!grid[dx][dy] || !grid[dx][dy].isBlocked) && !(noTobe.has(`${[dx, dy]}`))
        ) {
            if (dfs(dx, dy, [...dir])) return true;
        }

        [dx, dy] = [x + dir[3][0], y + dir[3][1]];
        if (
            dx >= 0 && dx < size[0] && dy >= 0 && dy < size[1] &&
            (!grid[dx][dy] || !grid[dx][dy].isBlocked) && !(noTobe.has(`${[dx, dy]}`))
        ) {
            const newDir = [dir[3], ...dir.slice(0, 3)];
            if (dfs(dx, dy, newDir)) return true;
        }

        path.pop();
        return false;
    };

    if (dfs(curr[0], curr[1], direction)) {
        solution.push(...path);
       
        return true;
    }
    return false;
};


const GetAllSolution = (grid, curr, end, direction, size) => {
    if (!size || size.length !== 2) return false;
    const tSolution = []
    const dfs = (x, y, dir, path, prev) => {
        if(tSolution.length>50){
            return
        }
        const key = `${x},${y}`;
        if (x === end[0] && y === end[1]) {
            path.push([x, y]);
            tSolution.push([...path])
            return;
        }
        path.push([x, y]);
        prev.push(`${[x, y]}`);
        let noTobe = new Set()

        let inx = prev.indexOf(`${[x, y]}`)
        if (inx != prev.length - 1) {
            for (let i = 0; i < prev.length - 1; i += 1) {
                if (`${[x, y]}` == prev[i]) {
                    noTobe.add(prev[i + 1])
                }
            }
        }
        let [dx, dy] = [x + dir[0][0], y + dir[0][1]];
        if (
            dx >= 0 && dx < size[0] && dy >= 0 && dy < size[1] &&
            (!grid[dx][dy] || !grid[dx][dy].isBlocked) && !(noTobe.has(`${[dx, dy]}`))
        ) {
            dfs(dx, dy, [...dir], [...path], [...prev])
        }

        [dx, dy] = [x + dir[3][0], y + dir[3][1]];
        if (
            dx >= 0 && dx < size[0] && dy >= 0 && dy < size[1] &&
            (!grid[dx][dy] || !grid[dx][dy].isBlocked) && !(noTobe.has(`${[dx, dy]}`))
        ) {
            const newDir = [dir[3], ...dir.slice(0, 3)];
            dfs(dx, dy, newDir, [...path], [...prev])
        }
    };
    dfs(curr[0], curr[1], direction, [], [])
    return tSolution
};

const GenProblems = (size, steps) => {
    let game = {
        size: size,
        path: [],
        start: [0, 0],
        end: [0, 0],
        rotation: 0
    }
    let rand = Math.floor(Math.random() * 2)
    game.start[rand] = 0
    game.start[rand == 1 ? 1 : 0] = Math.floor(Math.random() * size[rand])
    rand = Math.floor(Math.random() * 2)
    game.rotation = Math.floor(Math.random() * 4)
    let direction = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ]
    for (let i = 0; i < game.rotation; i += 1) {
        direction = [direction[3], ...direction.slice(0, 3)]
    }
    let cDir = [...Array(10).fill(0), 3]
    game.path.push(game.start)
    let curr = game.start
    let solution = []
    const prev = []
    for (let i = 0; i < steps; i += 1) {
        let dcurr = [-1, -1]
        let r = Math.floor(Math.random() * 10)
        let tempDirection = direction[cDir[r]]
        let noTobe = new Set()
        let inx = prev.indexOf(`${curr}`)
        if (inx != prev.length - 1) {
            for (let i = 0; i < prev.length - 1; i += 1) {
                if (`${curr}` == prev[i]) {
                    noTobe.add(prev[i + 1])
                }
            }
        }
        if (r == 1) {
            direction = [direction[3], ...direction.slice(0, 3)]
            isTrun = true
        }
        dcurr = [curr[0] + tempDirection[0], curr[1] + tempDirection[1]]
        if (noTobe.has(`${dcurr}`) || dcurr[0] < 0 || dcurr[0] >= game.size[0] || dcurr[1] < 0 || dcurr[1] >= game.size[1] || (dcurr[0] == game.start[0] && dcurr[1] != game.start[1])) {
            continue
        }
        solution.push(dcurr)
        prev.push(`${dcurr}`)
        curr = dcurr
    }
    game.path = solution
    game.end = solution[solution.length - 1]
    return game

}

export { GetSolution, GetAllSolution, GenProblems };
