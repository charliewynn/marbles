//stores if a marble is being dragged  -1 for not being dragged
var playerDraggingNDX = [-1,-1,-1,-1];

function mouseDown(e) {
  var clickPoint = getCursorPosition(e);
  
  for(var j=0; j<player1sMarbles.length; j++)
  {
    for(k=0;k<allMarbles.length;k++)
    {
      if(distBetween(allMarbles[k][j].marbleX,allMarbles[k][j].marbleY, clickPoint[0], clickPoint[1]  ) < marbleWidth)
      {
        playerDraggingNDX[k] = j;
        break;
      }
    }
  }
  redraw();
}	

function mouseUp(e) 
{
  var clickPoint = getCursorPosition(e);
  
  var closestPitndx = 0;
  var closestPitDist = 500;
  for(var i=0; i<marblesPits.length; i++)
  {					
    if(distBetween(marblesPits[i].pitX,marblesPits[i].pitY,clickPoint[0],clickPoint[1]) < closestPitDist)
    {
      var marbleInPit = false;
      for(var j=0; j<player1sMarbles.length; j++)
      {
        for(k=0;k<allMarbles.length;k++)
        {
          if((playerDraggingNDX[k] != j) && (allMarbles[k][j].marbleX==marblesPits[i].pitX) && (allMarbles[k][j].marbleY == marblesPits[i].pitY))
          {
            marbleInPit = true;
          }
        }
      }
      if(!marbleInPit)
      {
        closestPitDist = distBetween(marblesPits[i].pitX,marblesPits[i].pitY,clickPoint[0],clickPoint[1]);
        closestPitndx = i;
      }
      else
      {
        //there is a marble in the pit, 
      }
    }
  }
        
  for(i=0;i<allMarbles.length;i++)
  {
    if(playerDraggingNDX[i] != -1)
    {
      allMarbles[i][playerDraggingNDX[i]].marbleX = marblesPits[closestPitndx].pitX;
      allMarbles[i][playerDraggingNDX[i]].marbleY = marblesPits[closestPitndx].pitY;
    }
    playerDraggingNDX[i] = -1;
  }
}	

function mouseMove(e) {
  var clickPoint = getCursorPosition(e);
  
  for(i=0;i<playerDraggingNDX.length;i++)
  {
    if(playerDraggingNDX[i] != -1)
    {
      allMarbles[i][playerDraggingNDX[i]].marbleX = clickPoint[0];
      allMarbles[i][playerDraggingNDX[i]].marbleY = clickPoint[1];
    }
  }
  
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

function keypressed(e)
{
  //if(e.keyCode == 77)//m
  if(e.keyCode == 32) //spacebar
    throwdice(1);
}