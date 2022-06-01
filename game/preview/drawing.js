var redFill = "rgba(255,0,0,1)";
var greenFill = "rgba(34,139,34,1)";
var orangeFill = "rgba(255,140,0,1)";
var blueFill = "rgba(0,0,255,1)";
var blackFill = "rgba(0,0,0,1)";
var whiteFill = "rgba(255,255,255,1)";
var lightblueFill = "rgba(100,100,255,1)";
var greyFill = "rgba(255,255,255,.5)";
var lightgreyFill = "rgba(200,200,200,1)";
var darkgreyFill = "rgba(169,169,169,1)";
var brownFill = "rgba(139,69,19,1)";
var darkbrownFill = "rgba(125,55,5,1)";
var lightbrownFill = "rgba(145,75,25,1)";

function drawText(x, y, text, color)
{
	context.fillStyle = color;
	context.font = 'bold 15px sans-serif';
	context.textBaseline = 'bottom';
	context.fillText(text, x, y);
};

function drawCircle(pos, radius, color)
{
  context.beginPath();
  context.fillStyle = color;
  context.arc(pos.x, pos.y, radius, 0, Math.PI*2,false);
  context.closePath();	
  context.fill();
}
function drawRect(x,y,width,height,color)
{
  context.fillStyle = color;
  context.fillRect(x,y,width,height);
  //context.fill();
}

function drawLine(start, end, color)
{    
  context.beginPath();
  context.strokeStyle = color;
  context.moveTo(start.x,start.y);
  context.lineTo(end.x, end.y);
  context.closePath();
  context.stroke();
}

function redraw()
{			
  canvas.width = width;	 
  
  drawCircle(new Vector(width/2, height/2), width/2, brownFill);
  
  for(var l in lines)
    drawLine(lines[l].start, lines[l].end, lines[l].color);
  for(var p in pits)
    drawCircle(pits[p].pos, pitSize, pits[p].color);
  for(var m in marbles)
    drawCircle(marbles[m].pos, marbleSize, marbles[m].color);
    var degrees = 360/(numPlayers*2);
  
  for(var i=0; i<numPlayers; i++)
  {
    var angle = (degrees*i*2) - degrees/2;
    var nextAngle = (degrees*(i*2+1)) - degrees/2;
    console.log("organg: " + angle + " - " + nextAngle);
    
    angle = (degrees*i*2) - degrees/2;
    nextAngle = degrees*(i*2) + degrees*(1/outInRatio) - degrees/2;
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate((angle+nextAngle)/2 * (Math.PI/180));
    var color = whosTurn == i ? greenFill : blackFill;
    drawText(width/2*offset2, -10, players[i].name, color);
    context.restore();
  }
}