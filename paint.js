var gridBox = document.querySelector(".grid");
var fillCell = false; // activates when clicked or clicked and draged / deactivates on mouseup
var wallColor = "orange";
var cellColor = wallColor; // initial hovering cell color, ready to color the cell with that color present as value
var color = "none"; // to store the active/fixed color of the cell
var lastCellFill = false; // to fill the last cell after click and drag for wall creation
var move = false; // to move start or end
var activeBtn = 1; // tell which button is active
var removeFirstCell = false; // to unfill current cell on mouse down ( for black only )
var start = 202;
var end = 217;
var startColor = "rgb(26, 224, 26)";
var endColor = "black";
var colorWeight1 = "silver";
var colorWeight2 = "gray";
var colorWeight3 = "slategray";
var colorWeight4 = "darkslategray";
var weight = new Array(400).fill(1);
gridBox.innerHTML = "";
gridBox.style.display = "grid";
for (let i = 0; i < 400; i++) {
  gridBox.innerHTML += `<div class="cell" id="cell${i}" 
    onclick="fill(this,'click')" onmouseenter="saveColor(this)" 
    onmousedown="fill(this)" onmouseleave="clearhover(this)"></div>`;
}
// to hide the option button during startup
var options = document.querySelectorAll(".options");
options[0].style.display = "block";
options[1].style.display = "block";
// initial start and end value
var c = document.querySelectorAll(".cell");
c[start].style.background = startColor;
c[end].style.background = endColor;

// cell color fill on click
var fill = (x, y) => {
  if (y == undefined) {
    if (
      x.style.background != startColor &&
      x.style.background != endColor &&
      x.style.background != "grey"
    ) {
      x.style.background = cellColor;
      if (!fillCell || y == "click") x.classList.add("filled");
      lastCellFill = true;
    } else {
      cellColor = x.style.background;
      move = true;
    }
    if (cellColor == endColor || cellColor == startColor)
      removeFirstCell = true;
  }
  if (cellColor == "grey" && y == "click" && x.style.background != startColor) {
    x.style.background = endColor;
    x.classList.add("filled");
    // active(1, document.querySelector("#wallBtn"));
  }
};

window.onmousedown = e => {
  e.preventDefault();
  if (!move) fillCell = true; // activates when clicked or clicked and draged / deactivates on mouseup
};

window.onmouseup = () => {
  fillCell = false;
  move = false;
};
// on mouse enter in the cell
var saveColor = ths => {
  color = ths.style.background;
  ths.style.transition = "0s";
  if (ths.style.background != startColor && ths.style.background != endColor)
    ths.style.background = cellColor;
  else if (cellColor == startColor) ths.style.background = startColor;
  if (fillCell) lastCellFill = true;
};
// on mouse leave from the cell
var clearhover = x => {
  x.style.transition = "0.5s";
  if (x.style.background != startColor && x.style.background != endColor) {
    if (lastCellFill) {
      x.style.background = cellColor;
      color = cellColor;
      lastCellFill = false;
      if (cellColor == colorWeight1) {
        weight[Number(x.id.slice(4, x.id.length))] = 2;
      } else if (cellColor == colorWeight2) {
        weight[Number(x.id.slice(4, x.id.length))] = 3;
      } else if (cellColor == colorWeight3) {
        weight[Number(x.id.slice(4, x.id.length))] = 4;
      } else if (cellColor == colorWeight4) {
        weight[Number(x.id.slice(4, x.id.length))] = 5;
      } else {
        weight[Number(x.id.slice(4, x.id.length))] = 1;
      }
    }
    x.style.background = color;
  }
  if (x.style.background == startColor || x.style.background == endColor) {
    if (
      move &&
      removeFirstCell &&
      ((color == endColor && cellColor == endColor) ||
        (color == startColor && cellColor == startColor))
    ) {
      removeFirstCell = false;
      x.style.background = "";
    } else if (move) x.style.background = color;
    else {
      if (cellColor == startColor) {
        x.style.background = startColor;
        start = Number(x.id.slice(4, x.id.length));
      } else if (cellColor == endColor) {
        x.style.background = endColor;
        end = Number(x.id.slice(4, x.id.length));
      } else {
        x.style.background = x.style.background;
      }
      if (activeBtn == 1) cellColor = wallColor;
      else if (activeBtn == 2) cellColor = "grey";
      else if (activeBtn == 3) cellColor = "none";
      else if (activeBtn == 5) cellColor = "silver";
      else if (activeBtn == 6) cellColor = "gray";
      else if (activeBtn == 7) cellColor = "slategray";
      else if (activeBtn == 8) cellColor = "darkslategray";
    }
  }
};
// function for active btn
var active = (x, ths) => {
  switch (x) {
    case 1:
      activeBtn = 1;
      wall(ths);
      break;
    case 2:
      activeBtn = 2;
      endBtn(ths);
      break;
    case 3:
      activeBtn = 3;
      clearCell(ths);
      break;
    case 4:
      activeBtn = 4;
      runDijkstra(ths);
      break;
    case 5:
      activeBtn = 5;
      addWeight(ths);
      break;
    case 6:
      activeBtn = 6;
      addWeight(ths);
      break;
    case 7:
      activeBtn = 7;
      addWeight(ths);
      break;
    case 8:
      activeBtn = 8;
      addWeight(ths);
      break;
  }
};
// end button click function
var endBtn = ths => {
  return;
  defaults();
  ths.style.background = endColor;
  ths.style.opacity = "1";
  cellColor = "grey";
};
// wall button click function
var wall = ths => {
  defaults();
  ths.style.background = wallColor;
  ths.style.opacity = "1";
  cellColor = wallColor;
};
// clear button click function
var clearCell = ths => {
  defaults();
  ths.style.background = "beige";
  ths.style.color = endColor;
  ths.style.opacity = "1";
  cellColor = "none";
};
var runDijkstra = ths => {
  defaults();
  ths.style.background = "red";
  dijkstraAlgoritm();
};
//for the design of buttons
var defaults = () => {
  var buttons = document.querySelectorAll(".buttons");
  for (let i = 1; i < buttons.length; i++) {
    buttons[i].style.opacity = "0.4";
    buttons[i].style.background = "blue";
    buttons[i].style.color = "white";
  }
};
wall(document.querySelector("#wallBtn"));
// to remove all walls in one click
var removeAllWall = ths => {
  var cellAll = document.querySelectorAll(".cell");
  for (let i = 0; i < 400; i++)
    if (cellAll[i].style.background == wallColor)
      cellAll[i].style.background = "none";
};
// clear grid
var clearGrid = () => {
  let cellAll = document.querySelectorAll(".cell");
  for (let i = 0; i < 400; i++) {
    if (
      cellAll[i].style.background != endColor &&
      cellAll[i].style.background != startColor
    ) {
      cellAll[i].style.background = "none";
    }
  }
};
// weights
var weightAll = document.querySelectorAll(".weight");
weightAll[0].style.background = colorWeight1;
weightAll[1].style.background = colorWeight2;
weightAll[2].style.background = colorWeight3;
weightAll[3].style.background = colorWeight4;
var addWeight = ths => {
  cellColor = ths.style.background;
  ths.style.transform = "scale(1.2)";
  setTimeout(() => {
    ths.style.transform = "scale(1)";
  }, 200);
};
