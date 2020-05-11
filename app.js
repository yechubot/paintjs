const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#4b4b4b"
const CANVAS_SIZE =600;

canvas.width = CANVAS_SIZE ;
canvas.height = CANVAS_SIZE ; // pixel modifier has to have size

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR; // stroke is for a line
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY; 
    // canvas size is differnet with windows, that' why we use offset 

    if(!painting){
        ctx.beginPath(); // path is a line!!!
        ctx.moveTo(x,y); // when mouse moving around, creating a path but not using it
    }else {
        ctx.lineTo(x,y); // it's happening everytime i move the mouse 
        ctx.stroke();
    }
}

// click Colors to change stroke colors 
function handleColorClick(event){   
    const bgColor = event.target.style.backgroundColor;
    ctx.strokeStyle = bgColor;
    ctx.fillStyle = bgColor;
}
// bruch size changes when you move on range
function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}
//click "fill" 
function handleModeClick(){
    if(filling == true){
        filling = false;
        mode.innerText = "Fill"
    }else {
        filling = true;
        mode.innerText = "Paint";
        
    }
}

function handleCanvasClick(){
    if(filling) {
        ctx.fillRect(0,0,canvas.width, canvas.height);
    }
}

function handleCM(){
    event.preventDefault;
}

//save file
function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "PaintJs";
    link.click();
}
if(canvas){
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown',startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click',handleCanvasClick);
    canvas.addEventListener('contextmenu',handleCM);
}

//getElementsbyClassName bring html collection so I have to use below function to bring each of elements
                         // inColor - this name defines inside of items , name can be anything
Array.from(colors).forEach(inColor => inColor.addEventListener('click', handleColorClick)
);


// variable check?
if(range) {
    range.addEventListener('input',handleRangeChange);
}

if(mode){
    mode.addEventListener('click',handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick);
}