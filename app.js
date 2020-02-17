/** @format */

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const line = document.getElementById("jsLine");
const mode = document.getElementById("jsMode");
const saveBTn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = 1680;
canvas.height = 720;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let lining = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    //console.log(x, y);
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    //console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event) {
    if (filling == true) {
        filling = false;
        mode.innerText = "Fill";

    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

// function handleCanvasClickLine() {
//     const x = event.offsetX;
//     const y = event.offsetY;
//     if (!lining) {
//         ctx.beginPath();
//         //ctx.moveTo(x, y);
//     } else {
//         ctx.closePath();
//     }
// }

// function handleLineClick(event) {
//     if (lining == true) {
//         lining = false;
//         line.innerText = "Line";
//     } else {
//         lining = true;
//         line.innerText = "Paint";
//     }

// }

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, 1680, 720);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

//console.log(Array.from(colors));
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}
//line
// if (line) {
//     line.addEventListener("click", handleLineClick);
// }

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBTn) {
    saveBTn.addEventListener("click", handleSaveClick);
}