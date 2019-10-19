var grid = document.querySelector(".grid");
var fillCell = false; // activates when clicked or clicked and draged / deactivates on mouseup
var cellColor = "purple"; // initial hovering cell color, ready to color the cell with that color present as value
var color = "none"; // to store the active/fixed color of the cell
var lastCellFill = false; // to fill the last cell after click and drag for wall creation
var move = false; // to move start or end
var activeBtn = 1; // tell which button is active
var removeFirstCell = false; // to unfill current cell on mouse down ( for black only )
var start = 202;
var end = 217;
var startColor = "rgb(26, 224, 26)";
var endColor = "black";
grid.innerHTML = "";
for (let i = 0; i < 400; i++) {
  grid.innerHTML += `<div class="cell" id="cell${i}" 
    onclick="fill(this,'click')" onmouseenter="saveColor(this)" 
    onmousedown="fill(this)" onmouseleave="clearhover(this)"></div>`;
}
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
  if (ths.style.background != startColor && ths.style.background != endColor)
    ths.style.background = cellColor;
  else if (cellColor == startColor) ths.style.background = startColor;
  if (fillCell) lastCellFill = true;
};
// on mouse leave from the cell
var clearhover = x => {
  if (x.style.background != startColor && x.style.background != endColor) {
    if (lastCellFill) {
      x.style.background = cellColor;
      color = cellColor;
      lastCellFill = false;
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
      } else x.style.background = x.style.background;
      if (activeBtn == 1) cellColor = "purple";
      else if (activeBtn == 2) cellColor = "grey";
      else if (activeBtn == 3) cellColor = "none";
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
  }
};
// end button click function
var endBtn = ths => {
  defaults();
  ths.style.background = endColor;
  ths.style.opacity = "1";
  cellColor = "grey";
};
// wall button click function
var wall = ths => {
  defaults();
  ths.style.background = "purple";
  ths.style.opacity = "1";
  cellColor = "purple";
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
  ths.style.cursor = "not-allowed";
  dijkstraAlgoritm();
};
//for the design of buttons
var defaults = () => {
  var buttons = document.querySelectorAll(".buttons");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.opacity = "0.4";
    buttons[i].style.background = "blue";
    buttons[i].style.color = "white";
  }
};
wall(document.querySelector("#wallBtn"));
