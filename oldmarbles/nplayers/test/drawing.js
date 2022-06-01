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

function drawCircle(x,y,radius,color)
{
  context.beginPath();
  context.fillStyle = color;
  context.arc(x, y, radius, 0, Math.PI*2,false);
  context.closePath();	
  context.fill();
}
function drawRect(x,y,width,height,color)
{
  context.fillStyle = color;
  context.fillRect(x,y,width,height);
  //context.fill();
}

function drawLine2(x1,y1,x2,y2, color)
{    
  context.beginPath();
  context.strokeStyle = color;
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.closePath();
  context.stroke();
}

function drawLine(x1,y1,x2,y2, color)
{    
  if(!drawLines) return;
  context.beginPath();
  context.strokeStyle = color;
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.closePath();
  context.stroke();
}

function redraw()
{				
  marbles = [];
  //drawRect(0,0, width, height, brownFill);
  drawCircle(width/2, height/2, width/2, brownFill);
  
  var degrees = 360/(numPlayers*2);
  console.log("Degrees: " + degrees);
  
  for(var i=0; i<(numPlayers*2); i++)
  {
    var angle = (degrees*i) - degrees/2;
    var nextAngle = (degrees*(i+1)) - degrees/2;
    console.log("organg: " + angle + " - " + nextAngle);
    
    if(i%2==0)
    {
      angle = (degrees*i) - degrees/2;
      nextAngle = degrees*(i) + degrees*(1/outInRatio) - degrees/2;
    }
    else
    {
      angle = degrees*(i-1) + degrees*(1/outInRatio) - degrees/2;
      nextAngle = (degrees*(i+1)) - degrees/2;
      
    }
      
    console.log("adjang: " + angle + " - " + nextAngle);
    
    var x = width/2 + width/2 * Math.cos(angle * (Math.PI/180));
    var y = height/2 + width/2 * Math.sin(angle * (Math.PI/180));

    var color = i % 2 == 0 ? darkbrownFill : lightbrownFill;
    drawLine(width/2, height/2, x, y, color);
    
    if(i%2 == 0)
    {
      var x1 = width/2 + ((width/2)*offset1) * Math.cos((angle+nextAngle)/2 * (Math.PI/180));
      var y1 = height/2 + ((width/2)*offset1) * Math.sin((angle+nextAngle)/2 * (Math.PI/180));
      
      var x2 = width/2 + ((width/2)*offset2) * Math.cos((angle+nextAngle)/2 * (Math.PI/180));
      var y2 = height/2 + ((width/2)*offset2) * Math.sin((angle+nextAngle)/2 * (Math.PI/180));
      drawLine(x1,y1,x2,y2, blueFill);
      
      
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate((angle+nextAngle)/2 * (Math.PI/180));
      drawText(width/2*offset2, -10, players[i/2].name, blackFill);
      context.restore();
      
      for(var j=0; j<numMarbles; j++)
      {
        var step = 1/(numMarbles-1);
        var color = players[i/2].color();
        marbles.push(new Marble(new Vector(x1 + (step*j)*(x2-x1), y1 + (step*j)*(y2-y1), color)));
        drawCircle(x1 + (step*j)*(x2-x1), y1 + (step*j)*(y2-y1), pitSize*2, color);
      }
      
      
      var x1 = width/2 + ((width/2)*offset1) * Math.cos(angle * (Math.PI/180));
      var y1 = height/2 + ((width/2)*offset1) * Math.sin(angle * (Math.PI/180));
      
      var x2 = width/2 + ((width/2)*offset1) * Math.cos(nextAngle * (Math.PI/180));
      var y2 = height/2 + ((width/2)*offset1) * Math.sin(nextAngle * (Math.PI/180));
      
      var x3 = width/2 + ((width/2)*offset3) * Math.cos((angle+nextAngle)/2 * (Math.PI/180));
      var y3 = height/2 + ((width/2)*offset3) * Math.sin((angle+nextAngle)/2 * (Math.PI/180));
      drawLine(x1,y1,x3,y3, blueFill);
      drawLine(x2,y2,x3,y3, blueFill);
      
      for(var j=1; j<innerPits-1; j++)
      {
        var step = 1/(innerPits-1);
        drawCircle(x1 + (step*j)*(x3-x1), y1 + (step*j)*(y3-y1), pitSize, blackFill);
        drawCircle(x2 + (step*j)*(x3-x2), y2 + (step*j)*(y3-y2), pitSize, blackFill);
      }
      
      drawCircle(x1,y1,pitSize,redFill)
      drawCircle(x3,y3,pitSize,redFill);
      
    }
    else
    {
      var offset = .95;
      var x1 = width/2 + ((width/2)*offset1) * Math.cos(angle * (Math.PI/180));
      var y1 = height/2 + ((width/2)*offset1) * Math.sin(angle * (Math.PI/180));
      
      var x2 = width/2 + ((width/2)*offset1) * Math.cos(nextAngle * (Math.PI/180));
      var y2 = height/2 + ((width/2)*offset1) * Math.sin(nextAngle * (Math.PI/180));
      
      var x31 = (x1+x2)/2;
      var y31 = (y1+y2)/2;
      var x32 = width/2 + ((width/2)*offset3) * Math.cos((angle+nextAngle)/2 * (Math.PI/180));
      var y32 = height/2 + ((width/2)*offset3) * Math.sin((angle+nextAngle)/2 * (Math.PI/180));
      
      drawLine(x1,y1,x2,y2, blueFill);
      drawLine(x31,y31,x32,y32, blueFill);
            
      for(var j=0; j<outerPits-1; j++)
      {
        var step = 1/(outerPits-1);
        drawCircle(x1 + (step*j)*(x2-x1), y1 + (step*j)*(y2-y1), pitSize, blackFill);
      }
      for(var j=1; j<=numMarbles; j++)
      {
        var step = 1/(numMarbles);
        drawCircle(x31 + (step*j)*(x32-x31), y31 + (step*j)*(y32-y31), pitSize, blackFill);
      }
    }
  }
  drawCircle(width/2, height/2,pitSize,redFill);
  
  if(showHelp)
  {
    drawText(0,20,"Help Info works best for default settings", blackFill);
    drawText(0,40,"Refresh (f5) to reset settings", blackFill);
    
    drawLine2(75,275,235,430, blackFill);
    drawText(155,375,"    < # Inner Pits", blackFill);
    
    
    drawLine2(50,255,275,40, blackFill);
    drawText(85,125,"# Outer Pits >", blackFill);
    
 
    drawLine2(600,55,610,30, blackFill);   
    drawText(535,50,"Offset 1 >", blackFill);
    
    drawLine2(430,25,430,150, blackFill);   
    drawText(355,70,"Offset 2 >", blackFill);
    
    drawLine2(470,25,470,250, blackFill);   
    drawText(475,180,"< Offset 3", blackFill);
    
    
    drawLine2(600,390,505,580, blackFill);   
    drawLine2(540,485,565,495, blackFill);   
    drawText(575,480,"Out/In ratio", blackFill);
    
    drawText(540,455,"In", blackFill);
    drawText(500,525,"Out", blackFill);
  }
  drawText(width-100,height,"Charlie Wynn", blackFill);
}