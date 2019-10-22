var MAX = Infinity;
var searchColor = "purple";
var pathColor = "radial-gradient(black, transparent)";
var cellFrameRate = 20;
var pathFrameRate = 200;
var frameItr = 0;
var itr;
var block = document.querySelector(".block");
var found = false;

var dijkstraAlgoritm = () => {
  let grid = new Array(400).fill(MAX);
  let visited = [[]];

  reset();
  block.style.display = "block";
  grid[start] = 0;
  visited[0][0] = [start, 0, [start]];
  var cellAll = document.querySelectorAll(".cell");
  for (let i = 0; i < visited.length; i++) {
    let arr = [];
    for (let j = 0; j < visited[i].length; j++) {
      itr = visited[i][j][0];
      let n = itr - 20;
      let s = itr + 20;
      let e = itr + 1;
      let w = itr - 1;

      if (grid[n] != undefined) {
        if (
          grid[n] > visited[i][j][1] + 1 &&
          cellAll[n].style.background != "orange"
        ) {
          grid[n] = visited[i][j][1] + 1;
          let arr2 = [n, grid[n], visited[i][j][2].concat([n])];
          arr.push(arr2);
          if (n == end) {
            pathDraw(arr2);
            return;
          }
          setTimeout(() => {
            cellAll[n].style.transition = "0.5s";
            cellAll[n].style.background = searchColor;
          }, cellFrameRate * ++frameItr);
        }
      }
      if (grid[s] != undefined) {
        if (
          grid[s] > visited[i][j][1] + 1 &&
          cellAll[s].style.background != "orange"
        ) {
          grid[s] = visited[i][j][1] + 1;
          var arr2 = [s, grid[s], visited[i][j][2].concat([s])];
          arr.push(arr2);
          if (s == end) {
            pathDraw(arr2);
            return;
          }
          setTimeout(() => {
            let x = s;
            cellAll[s].style.transition = "0.5s";
            cellAll[s].style.background = searchColor;
          }, cellFrameRate * ++frameItr);
        }
      }
      if (grid[e] != undefined) {
        if (
          grid[e] > visited[i][j][1] + 1 &&
          parseInt(e / 20) == parseInt((e - 1) / 20) &&
          cellAll[e].style.background != "orange"
        ) {
          grid[e] = visited[i][j][1] + 1;
          var arr2 = [e, grid[e], visited[i][j][2].concat([e])];
          arr.push(arr2);
          if (e == end) {
            pathDraw(arr2);
            return;
          }
          setTimeout(() => {
            let x = e;
            cellAll[e].style.transition = "0.5s";
            cellAll[e].style.background = searchColor;
          }, cellFrameRate * ++frameItr);
        }
      }
      if (grid[w] != undefined) {
        if (
          grid[w] > visited[i][j][1] + 1 &&
          parseInt(w / 20) == parseInt((w + 1) / 20) &&
          cellAll[w].style.background != "orange"
        ) {
          grid[w] = visited[i][j][1] + 1;
          var arr2 = [w, grid[w], visited[i][j][2].concat([w])];
          arr.push(arr2);
          if (w == end) {
            pathDraw(arr2);
            return;
          }
          setTimeout(() => {
            let x = w;
            cellAll[w].style.transition = "0.5s";
            cellAll[w].style.background = searchColor;
          }, cellFrameRate * ++frameItr);
        }
      }
      if (arr.length > 0) visited.push(arr);
    }
  }
  if (!found) {
    block.style.display = "none";
    active(1, document.querySelector("#wallBtn"));
  }
};
var pathDraw = cellInfo => {
  found = true;
  setTimeout(() => {
    var cellAll = document.querySelectorAll(".cell");
    var i = 1;
    var pathLoop = setInterval(() => {
      cellAll[cellInfo[2][i++]].style.background = pathColor;
      if (i >= cellInfo[2].length - 1) {
        block.style.display = "none";
        active(1, document.querySelector("#wallBtn"));
        clearInterval(pathLoop);
      }
    }, pathFrameRate);
  }, cellFrameRate * frameItr);
};
var reset = () => {
  found = false;
  // visited = [[]];
  // grid.fill(MAX);
  clearSearch();
};
var clearSearch = () => {
  let cellAll = document.querySelectorAll(".cell");
  for (let i = 0; i < 400; i++) {
    if (
      cellAll[i].style.background != wallColor &&
      cellAll[i].style.background != endColor &&
      cellAll[i].style.background != startColor
    ) {
      cellAll[i].style.background = "none";
    }
  }
};
