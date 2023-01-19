const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const brushSizeEl = document.getElementById('brushSize');
const borderColor = document.getElementById('borderColor');
const clearCanvasBtn = document.getElementById('clear');
const ctx = canvas.getContext('2d');

let bordercolor = 'black';
let backgroundcolor = 'black';
let isPressed = false;
let brushSize=5;
let x = undefined;
let y = undefined;

increaseBtn.addEventListener('click', () =>
{
 brushSize+=1;
 if(brushSize>75)
 {
    brushSize=75;
 }
 brushSizeUpdate()
});

decreaseBtn.addEventListener('click', () =>
{
 brushSize-=1;
 if(brushSize<5)
 {
    brushSize=5;
    alert('Do not get so down!');
 }
 brushSizeUpdate()
});
clearCanvasBtn.addEventListener('click',() =>
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})
function brushSizeUpdate(){
    brushSizeEl.innerText=brushSize;
}

borderColor.addEventListener('change',(e)=>
{
    bordercolor = e.target.value;
});

/*backgroundColor.addEventListener('change',(e)=>
{
    backgroundcolor = e.target.value;
});*/

canvas.addEventListener('mousedown', (e) =>
{
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
    
});

canvas.addEventListener('mouseup', (e) =>
{
    isPressed = false;
});

canvas.addEventListener('mousemove',(e)=>
{
    if (isPressed){
    const x2 = e.offsetX;
    const y2 = e.offsetY;    
    drawLine(x,y,x2,y2);
    x = x2;
    y = y2;    
    }
});

function drawLine(x,y,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2,y2);
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = bordercolor;
    ctx.stroke();
};

function drawCircle(x,y,brushSize){
    ctx.beginPath();
    ctx.arc(x,y,brushSize,0,2*Math.PI);
    ctx.strokeStyle=bordercolor;
    ctx.stroke();
    ctx.fillStyle=backgroundcolor;
    ctx.fill();
};

function drawEmoji(x,y){
    const data = document.createElement('div');
    data.innerText = '❤️';
    data.classList.add('data');
    data.style.position = 'absolute';
    data.style.left=x+'px';
    data.style.top=y+'px';
    document.body.appendChild(data);
}
