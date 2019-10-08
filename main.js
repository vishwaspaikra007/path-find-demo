var grid = document.querySelector(".grid");
var fillCell = false;

grid.innerHTML = "";
for (let i = 0; i < 400; i++) {
  grid.innerHTML += `<div class="cell" onclick="fill(this)" onmousedown="fill(this)" onmouseover="fillWhenHover(this)"></div>`;
}
var fill = x => {
  x.style.background = "red";
};

window.onmousedown = e => {
  e.preventDefault();
  fillCell = true;
};

window.onmouseup = () => {
  fillCell = false;
};

var fillWhenHover = x => {
  if (fillCell) x.style.background = "red";
};
