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

function drawCircle(x,y,radius,color)
{
  context.beginPath();
  context.fillStyle = color;
  context.arc(x, y, radius, 0, Math.PI*2,false);
  context.closePath();	
  context.fill();
}

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

function redraw()
{				
  //Draw Grey Background
  context.fillStyle = lightgreyFill;
  context.fillRect(0,0,295,295);
  context.fill();
  context.fillStyle = greyFill;
  context.fillRect(20,20,255,255);
  context.fill();
  
  //Draw Marbles Pits
  context.beginPath();
  if(whosTurn == 0) context.fillStyle = orangeFill;
  if(whosTurn == 1) context.fillStyle = redFill;
  if(whosTurn == 2) context.fillStyle = blueFill;
  if(whosTurn == 3) context.fillStyle = greenFill;
  context.arc(117, 10,marbleWidth,0,Math.PI*2,false);
  context.closePath();	
  context.fill();
  context.fillStyle = blackFill;
  context.font = 'italic bold 15px sans-serif';
  context.textBaseline = 'bottom';
  context.fillText('\'s Turn!', 125, 20);
  context.font = 'italic bold 15px sans-serif';
  context.textBaseline = 'bottom';
  context.fillText(debug, 5, 295);
  for(i=0; i<marblesPits.length;i++)
  {					
    context.beginPath();
    context.fillStyle = blackFill;
    if(marblesPits[i].isCorner == 1 || marblesPits[i].isMiddle == 1) context.fillStyle = redFill;
    else context.fillStyle = blackFill;
    context.arc(marblesPits[i].pitX,marblesPits[i].pitY,pitWidth,0,Math.PI*2,false);
    context.closePath();	
    context.fill();
  }
  for(var j=0; j<allMarbles.length;j++)
  {
    for(i=0; i<allMarbles[j].length;i++)
    {
      context.beginPath();
      context.fillStyle = allMarbles[j][i].marbleColor;
      context.arc(allMarbles[j][i].marbleX,allMarbles[j][i].marbleY,marbleWidth,0,Math.PI*2,false);
      context.closePath();	
      context.fill();
      
    }
  }
  if(playerDraggingNDX[0] == -1 && playerDraggingNDX[1] == -1 && playerDraggingNDX[2] == -1 && playerDraggingNDX[3] == -1)
  {
    findPossibleMoves();
  }
  
  //draw center marble on top of lines
  var centerMarble = getMarbleForPitNDX(104);
  if(centerMarble != undefined)
  {
    context.beginPath();
    context.fillStyle = centerMarble.marbleColor;
    context.arc(centerMarble.marbleX,centerMarble.marbleY,marbleWidth,0,Math.PI*2,false);
    context.closePath();	
    context.fill();
  }
  
}