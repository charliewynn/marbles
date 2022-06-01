function parseBoard()
{  
  marbles = [];
  pits = [];
  lines = [];

  var degrees = 360/(numPlayers*2);
  
  for(var i=0; i<(numPlayers*2); i++)
  {
    var angle = (degrees*i) - degrees/2;
    var nextAngle = (degrees*(i+1)) - degrees/2;
    
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
    
    var x = width/2 + width/2 * Math.cos(angle * (Math.PI/180));
    var y = height/2 + width/2 * Math.sin(angle * (Math.PI/180));

    var color = i % 2 == 0 ? darkbrownFill : lightbrownFill;
    lines.push(new Line(new Vector(width/2, height/2), new Vector(x, y), color));
    
    if(i%2 == 0)
    {
      var x1 = width/2 + ((width/2)*offset1) * Math.cos((angle+nextAngle)/2 * (Math.PI/180));
      var y1 = height/2 + ((width/2)*offset1) * Math.sin((angle+nextAngle)/2 * (Math.PI/180));
      
      var x2 = width/2 + ((width/2)*offset2) * Math.cos((angle+nextAngle)/2 * (Math.PI/180));
      var y2 = height/2 + ((width/2)*offset2) * Math.sin((angle+nextAngle)/2 * (Math.PI/180));
      lines.push(new Line(new Vector(x1,y1),new Vector(x2,y2), blueFill));
      
      for(var j=0; j<numMarbles; j++)
      {
        var step = 1/(numMarbles-1);
        pits.push(new Pit(new Vector(x1 + (step*j)*(x2-x1), y1 + (step*j)*(y2-y1)), blackFill));
      }
      
      
      var x1 = width/2 + ((width/2)*offset1) * Math.cos(angle * (Math.PI/180));
      var y1 = height/2 + ((width/2)*offset1) * Math.sin(angle * (Math.PI/180));
      
      var x2 = width/2 + ((width/2)*offset1) * Math.cos(nextAngle * (Math.PI/180));
      var y2 = height/2 + ((width/2)*offset1) * Math.sin(nextAngle * (Math.PI/180));
      
      var x3 = width/2 + ((width/2)*offset3) * Math.cos((angle+nextAngle)/2 * (Math.PI/180));
      var y3 = height/2 + ((width/2)*offset3) * Math.sin((angle+nextAngle)/2 * (Math.PI/180));
      lines.push(new Line(new Vector(x1, y1), new Vector(x3, y3), blueFill));
      lines.push(new Line(new Vector(x2, y2), new Vector(x3, y3), blueFill));
      
      for(var j=1; j<innerPits-1; j++)
      {
        var step = 1/(innerPits-1);
        pits.push(new Pit(new Vector(x1 + (step*j)*(x3-x1), y1 + (step*j)*(y3-y1)), blackFill));
        pits.push(new Pit(new Vector(x2 + (step*j)*(x3-x2), y2 + (step*j)*(y3-y2)), blackFill));
      }
      
      pits.push(new Pit(new Vector(x1,y1), redFill));
      pits.push(new Pit(new Vector(x3,y3), redFill));
      
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
      
      lines.push(new Line(new Vector(x1,y1), new Vector(x2,y2), blueFill));
      lines.push(new Line(new Vector(x31,y31), new Vector(x32,y32), blueFill));
      
      for(var j=0; j<outerPits-1; j++)
      {
        var step = 1/(outerPits-1);
        pits.push(new Pit(new Vector(x1 + (step*j)*(x2-x1), y1 + (step*j)*(y2-y1)), blackFill));
      }
      for(var j=1; j<=numMarbles; j++)
      {
        var step = 1/(numMarbles);
        pits.push(new Pit(new Vector(x31 + (step*j)*(x32-x31), y31 + (step*j)*(y32-y31)), blackFill));
      }
    }
  }
  pits.push(new Pit(new Vector(width/2, height/2), redFill));
}