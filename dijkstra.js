var MAX = Infinity;
var searchColor = "purple";
var pathColorT = "radial-gradient(white 20%, purple 60%)";
var pathColorS = "radial-gradient(white 20%, silver 60%)";
var pathColorG = "radial-gradient(white 20%, gray 60%)";
var pathColorSG = "radial-gradient(white 20%, slategray 60%)";
var pathColorDSG = "radial-gradient(white 20%, darkslategray 60%)";
var cellFrameRate = 10;
var pathFrameRate = 100;
var frameItr = 0;
var itr;
var block = document.querySelector(".block");
var found = false;
var cellAll = document.querySelectorAll(".cell");
var grid = new Array(400).fill(MAX);
var visited = [[]];
var final = [];

var dijkstraAlgoritm = () => {
  grid.fill(MAX);
  visited = [[]];
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
          grid[n] > visited[i][j][1] + weight[n] &&
          cellAll[n].style.background != "orange"
        ) {
          grid[n] = visited[i][j][1] + weight[n];
          let arr2 = [n, grid[n], visited[i][j][2].concat([n])];
          arr.push(arr2);
          if (n == end) {
            found = true;
            final = arr2;
          }
          setSearchColor(n);
        }
      }
      if (grid[s] != undefined) {
        if (
          grid[s] > visited[i][j][1] + weight[s] &&
          cellAll[s].style.background != "orange"
        ) {
          grid[s] = visited[i][j][1] + weight[s];
          var arr2 = [s, grid[s], visited[i][j][2].concat([s])];
          arr.push(arr2);
          if (s == end) {
            found = true;
            final = arr2;
          }
          setSearchColor(s);
        }
      }
      if (grid[e] != undefined) {
        if (
          grid[e] > visited[i][j][1] + weight[e] &&
          parseInt(e / 20) == parseInt((e - 1) / 20) &&
          cellAll[e].style.background != "orange"
        ) {
          grid[e] = visited[i][j][1] + weight[e];
          var arr2 = [e, grid[e], visited[i][j][2].concat([e])];
          arr.push(arr2);
          if (e == end) {
            found = true;
            final = arr2;
          }
          setSearchColor(e);
        }
      }
      if (grid[w] != undefined) {
        if (
          grid[w] > visited[i][j][1] + weight[w] &&
          parseInt(w / 20) == parseInt((w + 1) / 20) &&
          cellAll[w].style.background != "orange"
        ) {
          grid[w] = visited[i][j][1] + weight[w];
          var arr2 = [w, grid[w], visited[i][j][2].concat([w])];
          arr.push(arr2);
          if (w == end) {
            found = true;
            final = arr2;
          }
          setSearchColor(w);
        }
      }
      if (arr.length > 0) visited.push(arr);
    }
  }
  if (!found) {
    block.style.display = "none";
    active(1, document.querySelector("#wallBtn"));
  }
  pathDraw(final);
};
var pathDraw = cellInfo => {
  setTimeout(() => {
    var cellAll = document.querySelectorAll(".cell");
    var i = 1;
    var pathLoop = setInterval(() => {
      if (
        cellAll[cellInfo[2][i]].style.background == "none" ||
        cellAll[cellInfo[2][i]].style.background == "" ||
        cellAll[cellInfo[2][i]].style.background == searchColor
      )
        cellAll[cellInfo[2][i++]].style.background = pathColorT;
      else if (cellAll[cellInfo[2][i]].style.background == "silver")
        cellAll[cellInfo[2][i++]].style.background = pathColorS;
      else if (cellAll[cellInfo[2][i]].style.background == "gray")
        cellAll[cellInfo[2][i++]].style.background = pathColorG;
      else if (cellAll[cellInfo[2][i]].style.background == "slategray")
        cellAll[cellInfo[2][i++]].style.background = pathColorSG;
      else if (cellAll[cellInfo[2][i]].style.background == "darkslategray")
        cellAll[cellInfo[2][i++]].style.background = pathColorDSG;
      else i++;
      if (i >= cellInfo[2].length - 1) {
        block.style.display = "none";
        active(1, document.querySelector("#wallBtn"));
        console.log(grid);
        clearInterval(pathLoop);
      }
    }, pathFrameRate);
  }, cellFrameRate * frameItr);
};
var reset = () => {
  found = false;
  frameItr = 0;
  clearSearch();
};
var clearSearch = () => {
  let cellAll = document.querySelectorAll(".cell");
  for (let i = 0; i < 400; i++) {
    if (
      cellAll[i].style.background != wallColor &&
      cellAll[i].style.background != endColor &&
      cellAll[i].style.background != startColor &&
      cellAll[i].style.background != colorWeight1 &&
      cellAll[i].style.background != colorWeight2 &&
      cellAll[i].style.background != colorWeight3 &&
      cellAll[i].style.background != colorWeight4
    ) {
      if (cellAll[i].style.background == pathColorS)
        cellAll[i].style.background = colorWeight1;
      else if (cellAll[i].style.background == pathColorG)
        cellAll[i].style.background = colorWeight2;
      else if (cellAll[i].style.background == pathColorSG)
        cellAll[i].style.background = colorWeight3;
      else if (cellAll[i].style.background == pathColorDSG)
        cellAll[i].style.background = colorWeight4;
      else cellAll[i].style.background = "none";
    }
  }
};
var setSearchColor = x => {
  setTimeout(() => {
    cellAll[x].style.transition = "0.5s";
    if (
      cellAll[x].style.background == "none" ||
      cellAll[x].style.background == ""
    )
      cellAll[x].style.background = searchColor;
  }, cellFrameRate * ++frameItr);
};
