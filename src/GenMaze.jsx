// function GenPath(r, c, P0, Pf, direction) {
//     const ROWS = r;
//     const COLS = c;

//     const seen = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
//     let Solution = []
//     function dfs(x, y, dir, path, prev, seen, isRotated) {
//         path.push(x, y)
//         prev.push(`${[x, y]}`)
//         if (x === Pf[0] && y === Pf[1]) {
//             if (Solution.length < path.length) {
//                 Solution = path
//             }
//             console.log("hello", path)
//             return true;
//         }
//         const to_stack = [];

//         let noTobe = new Set()
//         let inx = prev.indexOf(`${[x, y]}`)
//         if (inx != prev.length - 1) {
//             for (let i = 0; i < prev.length - 1; i += 1) {
//                 if (`${[x, y]}` == prev[i]) {
//                     noTobe.add(prev[i + 1])
//                 }
//             }
//         }
//         let dx = x + direction[0][0];
//         let dy = y + direction[0][1];

//         if (dx >= 0 && dx < ROWS && dy >= 0 && dy < COLS && !seen[dx][dy] && !noTobe.has(`${[dx, dy]}`)) {
//             to_stack.push([dx, dy]);
//         }
//         dx = x + direction[3][0];
//         dy = y + direction[3][1];

//         if (dx >= 0 && dx < ROWS && dy >= 0 && dy < COLS && !seen[dx][dy] && !noTobe.has(`${[dx, dy]}`) && !isRotated) {
//             to_stack.push([dx, dy]);
//         }
//         for (let i = to_stack.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [to_stack[i], to_stack[j]] = [to_stack[j], to_stack[i]];
//         }

//         for (const [nx, ny] of to_stack) {
//             if (nx == dx && ny == dy) {
//                 dfs(nx, ny, [dir[3], ...dir.slice(0, 3)], path, prev, seen, true);
//             } else {
//                 dfs(nx, ny, dir, path, prev, seen, false);
//             }
//         }
//         path.pop()
//         return false
//     }

//     dfs(P0[0], P0[1], direction, [], [], seen, false);
//     console.log(Solution)
//     return Solution;
// }
const GenPath = (start, end, solution, direction, size, min, max) => {
    if (!size || size.length !== 2) return false;
    let curr = JSON.parse(JSON.stringify(start))
    const path = [];
    const prev = []
    let seen = Array.from({ length: size[0] }, () => Array(size[1]).fill(null));
    let maze = Array.from({ length: size[0] }, () => Array(size[1]).fill(0));
    const isEqual = (arr1, arr2) => {
        return arr1[0] == arr2[0] && arr1[1] == arr2[1]
    }
    const dfs = (x, y, dir, seen, isLeft) => {

        const key = `${x},${y}`;
        if (isEqual([x, y], end)) {
            path.push([x, y]);
            let len = path.length
            return len > min;
        }
        let isSeen = false
        if (seen[x][y]) {
            isSeen = true
        }
        path.push([x, y]);
        prev.push(key);
        let noTobe = new Set()

        let inx = prev.indexOf(key)
        if (inx != prev.length - 1) {
            for (let i = 0; i < prev.length - 1; i += 1) {
                if (key == prev[i]) {
                    noTobe.add(prev[i + 1])
                }
            }
        }
        const to_stack = [];
        let [dx, dy] = [x + dir[0][0], y + dir[0][1]];
        if (
            dx >= 0 && dx < size[0] && dy >= 0 && dy < size[1] && !(noTobe.has(`${[dx, dy]}`))
        ) {
            to_stack.push([dx, dy])

        }

        [dx, dy] = [x + dir[3][0], y + dir[3][1]];
        if (
            dx >= 0 && dx < size[0] && dy >= 0 && dy < size[1] && !(noTobe.has(`${[dx, dy]}`)) && !isLeft
        ) {
            to_stack.push([dx, dy])
        }
        for (let i = to_stack.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [to_stack[i], to_stack[j]] = [to_stack[j], to_stack[i]];
        }
        for (const [nx, ny] of to_stack) {
            maze[nx][ny] = 1
            if (nx == dx && ny == dy) {
                const newDir = [dir[3], ...dir.slice(0, 3)];
                let ax = nx + newDir[1][0]
                let ay = ny + newDir[1][1]
                let bx = nx + newDir[3][0]
                let by = ny + newDir[3][1]
                let cx = nx + dir[0][0]
                let cy = ny + dir[0][1]
                if (ax >= 0 && ax < size[0] && ay >= 0 && ay < size[1]) {
                    if (isSeen && seen[ax][ay]) {
                        continue
                    }
                    seen[ax][ay] = [nx, ny]
                }
                if (bx >= 0 && bx < size[0] && by >= 0 && by < size[1]) {
                    if (isSeen && maze[bx][bx] == 1) {
                        continue
                    }
                    seen[bx][by] = [nx, ny]
                }
                // if (cx >= 0 && cx < size[0] && cy >= 0 && cy < size[1]) {
                //     if (isSeen && maze[cx][cy] == 1) {
                //         continue
                //     }
                //     seen[cx][cy] = [nx, ny]
                // }
                if (dfs(nx, ny, newDir, seen, true)) return true;
                if (ax >= 0 && ax < size[0] && ay >= 0 && ay < size[1]) {
                    seen[ax][ay] = null
                }
                if (bx >= 0 && bx < size[0] && by >= 0 && by < size[1]) {
                    seen[bx][by] = null
                }
            } else {
                let ax = nx + dir[1][0]
                let ay = ny + dir[1][1]
                let bx = nx + dir[3][0]
                let by = ny + dir[3][1]

                if (ax >= 0 && ax < size[0] && ay >= 0 && ay < size[1]) {
                    if (isSeen && seen[ax][ay]) {
                        continue
                    }

                    seen[ax][ay] = [nx, ny]
                }
                if (bx >= 0 && bx < size[0] && by >= 0 && by < size[1]) {
                    if (isSeen && seen[bx][by]) {
                        continue
                    }
                    seen[bx][by] = [nx, ny]
                }
                if (dfs(nx, ny, dir, seen, false)) return true;
                if (ax >= 0 && ax < size[0] && ay >= 0 && ay < size[1]) {
                    seen[ax][ay] = null
                }
                if (bx >= 0 && bx < size[0] && by >= 0 && by < size[1]) {
                    seen[bx][by] = null
                }
            }
            maze[nx][ny] = 0

        }
        path.pop();
        return false;
    };

    if (dfs(curr[0], curr[1], direction, seen, false)) {
        solution.push(...path);
        return true;
    }


    return false;
};




function random_maze_generator(r, c, P0, Pf, direction) {
    const ROWS = r;
    const COLS = c;

    const maze = [...Array(ROWS)].map(() => Array(COLS).fill(0));
    const seen = [...Array(ROWS)].map(() => Array(COLS).fill(false));
    const previous = [...Array(ROWS)].map(() => Array(COLS).fill([-1, -1]));
    const rotated = [...Array(ROWS)].map(() => Array(COLS).fill(false));
    const S = [];

    S.push(P0);

    while (S.length > 0) {

        const [x, y] = S.pop();

        seen[x][y] = true;

        if (x + 1 < ROWS && maze[x + 1][y] === 1 && !isEqual(previous[x][y], [x + 1, y])) continue;
        if (x > 0 && maze[x - 1][y] === 1 && !isEqual(previous[x][y], [x - 1, y])) continue;
        if (y + 1 < COLS && maze[x][y + 1] === 1 && !isEqual(previous[x][y], [x, y + 1])) continue;
        if (y > 0 && maze[x][y - 1] === 1 && !isEqual(previous[x][y], [x, y - 1])) continue;

        maze[x][y] = 1;
        const to_stack = [];
        let dx = x + direction[0][0]
        let dy = y + direction[0][1]
        if (dx < ROWS && dx >= 0 && dy < COLS && dy >= 0 && !seen[dx][dy]) {

            seen[dx][dy] = true;
            to_stack.push([dx, dy]);

            previous[dx][dy] = [x, y];
        }
        dx = x + direction[1][0]
        dy = y + direction[1][1]
        if (dx < ROWS && dx >= 0 && dy < COLS && dy >= 0 && !seen[dx][dy]) {

            seen[dx][dy] = true;

            to_stack.push([dx, dy]);

            previous[dx][dy] = [x, y];
            rotated[dx][dy] = true
        }
        dx = x + direction[2][0]
        dy = y + direction[2][1]
        if (dx < ROWS && dx >= 0 && dy < COLS && dy >= 0 && !seen[dx][dy]) {

            seen[dx][dy] = true;

            to_stack.push([dx, dy]);

            previous[dx][dy] = [x, y];
            rotated[dx][dy] = true
        }
        dx = x + direction[3][0]
        dy = y + direction[3][1]
        if (dx < ROWS && dx >= 0 && dy < COLS && dy >= 0 && !seen[dx][dy]) {

            seen[dx][dy] = true;

            to_stack.push([dx, dy]);

            previous[dx][dy] = [x, y];
            rotated[dx][dy] = true
        }

        let pf_flag = false;

        while (to_stack.length > 0) {
            const index = Math.floor(Math.random() * to_stack.length);
            const neighbour = to_stack.splice(index, 1)[0];

            if (isEqual(neighbour, Pf)) {
                pf_flag = true;
            } else {

                S.push(neighbour);
            }
        }

        if (pf_flag) {
            S.push(Pf);
        }
    }

    const [x0, y0] = P0;
    const [xf, yf] = Pf;
    maze[x0][y0] = 2;
    maze[xf][yf] = 3;

    return maze;
}
function isEqual(arr1, arr2) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}


// // Driver code
// const N = 16;
// const M = 16;
// const P0 = [0, 0];
// const P1 = [15, 15];
// const maze = random_maze_generator(N, M, P0, P1);
// for (const line of maze) {
//     console.log(line);
// }

const GenMaze = (r, c, start, end, rotation) => {
    const P1 = end;
    const P0 = start;
    let direction = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1]
    ];
    for (let i = 0; i < rotation; i += 1) {
        direction = [direction[3], ...direction.slice(0, 3)]
    }
    const maze = random_maze_generator(r, c, P0, P1, direction);
    let solution = []
    let issuccess = false
    let min = 60
   
    let i=0
    while (solution.length == 0 && !issuccess && i<r) {
        if (GenPath(P0, P1, solution, direction, [r, c], 0, 200)) {
            issuccess = true
        }
        i+=1
    }

    let game = {
        path: [],
        start: P0,
        end: P1,
        size: [r, c],
        rotation: rotation
    }
    for (let i = 0; i < r; i += 1) {
        for (let j = 0; j < c; j += 1) {
            if (maze[i][j] != 0) {
                game.path.push([i, j])
            }
        }
    }
    game.path = solution
    return game
}

export { GenMaze }