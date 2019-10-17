var grid = document.querySelector(".grid");
var fillCell = false; // activates when clicked or clicked and draged / deactivates on mouseup
var cellColor = "purple"; // initial hovering cell color, ready to color the cell with that color present as value
var color = "none"; // to store the active/fixed color of the cell
var lastCellFill = false; // to fill the last cell after click and drag for wall creation
var move = false; // to move start or end
var activeBtn = 1; // tell which button is active
var removeFirstCell = false; // to unfill current cell on mouse down ( for black only )
grid.innerHTML = "";
for (let i = 0; i < 400; i++) {
  grid.innerHTML += `<div class="cell" id="cell${i + 1}" 
    onclick="fill(this,'click')" onmouseenter="saveColor(this)" 
    onmousedown="fill(this)" onmouseleave="clearhover(this)"></div>`;
}
// initial start and end value
var c = document.querySelectorAll(".cell");
c[202].style.background = "green";
c[217].style.background = "black";

// cell color fill on click
var fill = (x, y) => {
  if (y == undefined) {
    if (
      x.style.background != "green" &&
      x.style.background != "black" &&
      x.style.background != "grey"
    ) {
      x.style.background = cellColor;
      if (!fillCell || y == "click") x.classList.add("filled");
      lastCellFill = true;
    } else {
      cellColor = x.style.background;
      move = true;
    }
    if (cellColor == "black" || cellColor == "green") removeFirstCell = true;
  }
  if (cellColor == "grey" && y == "click" && x.style.background != "green") {
    x.style.background = "black";
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
  if (ths.style.background != "green" && ths.style.background != "black")
    ths.style.background = cellColor;
  else if (cellColor == "green") ths.style.background = "green";
  if (fillCell) lastCellFill = true;
};
// on mouse leave from the cell
var clearhover = x => {
  if (x.style.background != "green" && x.style.background != "black") {
    if (lastCellFill) {
      x.style.background = cellColor;
      color = cellColor;
      lastCellFill = false;
    }
    x.style.background = color;
  }
  if (x.style.background == "green" || x.style.background == "black") {
    if (
      move &&
      removeFirstCell &&
      ((color == "black" && cellColor == "black") ||
        (color == "green" && cellColor == "green"))
    ) {
      removeFirstCell = false;
      x.style.background = "";
    } else if (move) x.style.background = color;
    else {
      if (cellColor == "green") x.style.background = "green";
      else x.style.background = x.style.background;
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
      end(ths);
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
var end = ths => {
  defaults();
  ths.style.background = "black";
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
  ths.style.color = "black";
  ths.style.opacity = "1";
  cellColor = "none";
};
var runDijkstra = ths => {
  defaults();
  ths.style.background = "red";
  ths.style.cursor = "not-allowed";
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
