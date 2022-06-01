function mouseDown(e) {
  var clickPoint = getCursorPosition(e);

  if(clickPoint.dist(new Vector(z/2,z/2)) < z/2)
  {
    if(pauseRefresh) save();
    return;
  }

  if(clickPoint.dist(new Vector(width-z/2,height-z/2)) < z/2)
  {
    if(!pauseRefresh)
    {
      console.log('ar - ');
      die1old = die1;
      die2old = die2;
      pauseRefresh = true;
      roll(function() {saveroll()});
    }
    else
    {
      flashButton('Save', 10);
    }
    return;
  }
  
  if(!pauseRefresh)
  {
    flashButton('Roll', 10);
    return;
  }

  for(k=0;k<marbles.length;k++)
  {
    if(marbles[k].pos.dist(clickPoint) < marbleSize)
    {
      dragging = k;
      pauseRefresh = true;
      break;
    }
  }
  redraw();
}	

function mouseUp(e) 
{
  if(dragging == -1) return;
  
  var clickPoint = getCursorPosition(e);

  var closestPitPos = new Vector(-1,-1);
  var closestPitDist = 500;
  for(var i=0; i<pits.length; i++)
  {					
    if(pits[i].pos.dist(clickPoint) < closestPitDist)
    {
      var marbleInPit = false;
      for(k=0;k<marbles.length;k++)
      {
        if(dragging != k && pits[i].pos.dist(marbles[k].pos) < 1)
        {
          marbleInPit = true;
        }
      }
      if(!marbleInPit)
      {
        closestPitDist = pits[i].pos.dist(clickPoint);
        closestPitPos = pits[i].pos;
      }
      else
      {
        //there is a marble in the pit, 
      }
    }
  }

  marbles[dragging].pos = closestPitPos;
  dragging = -1;
  redraw();
}	

function mouseMove(e) {
  if(dragging == -1) return;
  
  var clickPoint = getCursorPosition(e);

  if(dragging != -1)
    marbles[dragging].pos = clickPoint;
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
  return new Vector(x,y);
}
    
function touchHandler(event)
{
  var touches = event.changedTouches, first = touches[0], type = "";
     
	switch(event.type)
  {
      case "touchstart": type = "mousedown"; break;
      case "touchmove":  type="mousemove"; break;        
      case "touchend":   type="mouseup"; break;
      default: return;
  }
	var simulatedEvent = document.createEvent("MouseEvent");
  simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                            first.screenX, first.screenY, 
                            first.clientX, first.clientY, false, 
                            false, false, false, 0/*left*/, null);

	first.target.dispatchEvent(simulatedEvent);
  event.preventDefault();
}