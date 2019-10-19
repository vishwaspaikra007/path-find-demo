var MAX = Infinity;
var grid = new Array(400).fill(MAX);
var cellDetails = {};
var searchColor = "#0000ff";
var cellFrameRate = 20;
var frameItr = 0;
var itr;
var visited = [[]];

var dijkstraAlgoritm = () => {
  var itr = start;
  while (i < 400) {
    var cond = i % 4;

    if (cond == 0) {
      Math.min(grid[itr - 20]);
    } else if (cond == 1) {
    } else if (cond == 2) {
    } else {
    }
  }
};
var initNeighbour = () => {
  grid[start] = 0;
  visited[0][0] = [start, 0, [start]];
  var cellAll = document.querySelectorAll(".cell");
  for (let i = 0; i < visited.length; i++) {
    var arr = [];
    for (let j = 0; j < visited[i].length; j++) {
      itr = visited[i][j][0];
      let n = itr - 20;
      let s = itr + 20;
      let e = itr + 1;
      let w = itr - 1;
      if (n == end) return 0;
      if (s == end) return 0;
      if (e == end) return 0;
      if (w == end) return 0;
      if (grid[n] != undefined) {
        console.log(n);
        if (grid[n] > visited[i][j][1] + 1) {
          grid[n] = visited[i][j][1] + 1;
          var arr2 = [n, grid[n], visited[i][j][2].concat([n])];
          arr.push(arr2);
          setTimeout(() => {
            cellAll[n].style.transition = "0.5s";
            cellAll[n].style.background = searchColor;
          }, cellFrameRate * frameItr++);
        }
      }
      if (grid[s] != undefined) {
        if (grid[s] > visited[i][j][1] + 1) {
          grid[s] = visited[i][j][1] + 1;
          var arr2 = [s, grid[s], visited[i][j][2].concat([s])];
          arr.push(arr2);
          setTimeout(() => {
            let x = s;
            cellAll[s].style.transition = "0.5s";
            cellAll[s].style.background = searchColor;
          }, cellFrameRate * frameItr++);
        }
      }
      if (grid[e] != undefined) {
        if (grid[e] > visited[i][j][1] + 1) {
          grid[e] = visited[i][j][1] + 1;
          var arr2 = [e, grid[e], visited[i][j][2].concat([e])];
          arr.push(arr2);
          setTimeout(() => {
            let x = e;
            cellAll[e].style.transition = "0.5s";
            cellAll[e].style.background = searchColor;
          }, cellFrameRate * frameItr++);
        }
      }
      if (grid[w] != undefined) {
        if (grid[w] > visited[i][j][1] + 1) {
          grid[w] = visited[i][j][1] + 1;
          var arr2 = [w, grid[w], visited[i][j][2].concat([w])];
          arr.push(arr2);
          setTimeout(() => {
            let x = w;
            cellAll[w].style.transition = "0.5s";
            cellAll[w].style.background = searchColor;
          }, cellFrameRate * frameItr++);
        }
      }
      if (arr.length > 0) visited.push(arr);
    }
  }
  // setTimeout(() => {
  //   cellAll[start - 20].style.transition = "0.5s";
  //   cellAll[start - 20].style.background = searchColor;
  // }, 200);
  // setTimeout(() => {
  //   cellAll[start + 1].style.transition = "0.5s";
  //   cellAll[start + 1].style.background = searchColor;
  // }, 400);
  // setTimeout(() => {
  //   cellAll[start + 20].style.transition = "0.5s";
  //   cellAll[start + 20].style.background = searchColor;
  // }, 600);
  // setTimeout(() => {
  //   cellAll[start - 1].style.transition = "0.5s";
  //   cellAll[start - 1].style.background = searchColor;
  // }, 800);
};
