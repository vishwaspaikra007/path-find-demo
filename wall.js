var grid = document.querySelector(".grid");
var fillCell = false; // activates when clicked or clicked and draged / deactivates on mouseup
var cellColor = "red"; // initial hovering cell color, ready to color the cell with that color present as value
var color = "none"; // to store the active/fixed color of the cell
var lastCellFill = false; // to fill the last cell after click and drag for wall creation

grid.innerHTML = "";
for (let i = 0; i < 400; i++) {
  grid.innerHTML += `<div class="cell" onclick="fill(this,'click')" onmouseenter="saveColor(this)" onmousedown="fill(this)" onmouseleave="clearhover(this)"></div>`;
}
// cell color fill on click
var fill = (x, y) => {
  x.style.background = cellColor;
  if (!fillCell || y == "click") x.classList.add("filled");
  lastCellFill = true;
};

window.onmousedown = e => {
  e.preventDefault();
  fillCell = true; // activates when clicked or clicked and draged / deactivates on mouseup
};

window.onmouseup = () => {
  fillCell = false;
};
// on mouse enter in the cell
var saveColor = ths => {
  color = ths.style.background;
  ths.style.background = cellColor;
  if (fillCell) {
    if (cellColor != "none") {
      ths.classList.add("filled");
    } else if (cellColor == "none") ths.classList.remove("filled");
    lastCellFill = true;
  }
};
// on mouse leave from the cell
var clearhover = x => {
  if (lastCellFill) {
    x.style.background = cellColor;
    color = cellColor;
    console.log(cellColor);
    lastCellFill = false;
  } else if (
    !fillCell &&
    (!x.classList.contains("filled") && cellColor != color)
  ) {
    x.style.background = color;
  } else if (x.classList.contains("filled") && cellColor != color && !fillCell)
    x.style.background = color;
};
// start button click function
var start = ths => {
  defaults();
  ths.style.background = "green";
  ths.style.opacity = "1";
  cellColor = "green";
};
// end button click function
var end = ths => {
  defaults();
  ths.style.background = "black";
  ths.style.opacity = "1";
  cellColor = "black";
};
// wall button click function
var wall = ths => {
  defaults();
  ths.style.background = "blue";
  ths.style.opacity = "1";
  cellColor = "blue";
};
// clear button click function
var clearCell = ths => {
  defaults();
  ths.style.background = "beige";
  ths.style.color = "black";
  ths.style.opacity = "1";
  cellColor = "none";
};
//for the design of buttons
var defaults = () => {
  var buttons = document.querySelectorAll(".buttons");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.opacity = "0.5";
    buttons[i].style.background = "blue";
    buttons[i].style.color = "white";
  }
};
