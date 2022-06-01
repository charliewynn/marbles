var marbleWidth = 7;
var pitWidth = 2;

function drawArrow(x11, y11, x21, y21, color)
{
  context.beginPath();
  var centerX = (x21+x11)/2;
  var centerY = (y21+y11)/2;
  var radius = Math.sqrt((x21-x11)*(x21-x11)+(y21-y11)*(y21-y11));
  context.arc((x21+x11)/2, (y21+y11)/2, (Math.sqrt((x21-x11)*(x21-x11)+(y21-y11)*(y21-y11)))/2, Math.atan2(y21-y11, x21-x11), Math.atan2(y21-y11, x21-x11) + Math.PI, false);
  context.lineWidth = 2;
  context.strokeStyle = color;
  context.stroke();
}
var marblesPits = [];

function marble(color)
{
  this.marbleColor = color;
  this.location = 0;
}

function distBetween(marbleX, marbleY, pointX, pointY)
{
  return Math.sqrt(((marbleX-pointX)*(marbleX-pointX))+((marbleY-pointY)*(marbleY-pointY)));
}

function marblePit(x, y, nextPit, isCorner, isMiddle)
{
  this.pitX = x;
  this.pitY = y;
  this.nextPit = nextPit;
  this.isCorner = isCorner;
  this.isMiddle = isMiddle;
}

function mouseDown(e) {
  var clickPoint = getCursorPosition(e);
  clickPoint[0]
  
  redraw();
}	

function mouseUp(e) 
{
  var clickPoint = getCursorPosition(e);
  
}	

function mouseMove(e) {
  var clickPoint = getCursorPosition(e);
  
  
  redraw();
}

function getCursorPosition(e) {
  var x, y;
  if (e.pageX || e.pageY)
  {
    x = e.pageX;
    y = e.pageY;
  }
  else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  
  x -= document.getElementById("theCanvas").offsetLeft;
  y -= document.getElementById("theCanvas").offsetTop;
  return [x,y];
}
  var canvas;
  var context;

function redraw()
{				
  //Draw Grey Background
  context.fillStyle = "lightgrey";
  context.fillRect(0,0,canvas.width,canvas.height);
  context.fill();
  context.fillStyle = "pink";
  context.fillRect(5,5,canvas.width-150,canvas.height-150);
  context.fill();
          
  context.font = 'bold 15px sans-serif';
  context.textBaseline = 'bottom';
  context.fillStyle = "black";
  //context.fillText("pits", 5, 20);
  
  drawStaticPits();
  
  
  
}

function drawCircle(pos,radius,color)
{
  context.beginPath();
  context.fillStyle = color;
  context.arc(pos.x, pos.y, radius, 0, Math.PI*2,false);
  context.closePath();	
  context.fill();
}

function didload()
{					
  canvas = document.getElementById("theCanvas");
  context = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 900;
  
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mouseup',   mouseUp, false);
  
  generateStaticPits();
  
  redraw();
      
}