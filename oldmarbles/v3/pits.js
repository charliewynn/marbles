var pits = [];

var staticpitBowlRadius = 50;
var staticpitBowlPos = {x:staticpitBowlRadius, y:900-staticpitBowlRadius};
var staticpits = [];

function generateStaticPits()
{
  for(var i=0; i<300; ++i)
  {
    var pos = {x:staticpitBowlRadius, y:staticpitBowlRadius};
    
    while(pos.x*pos.x+pos.y*pos.y > ((staticpitBowlRadius*staticpitBowlRadius-1000)))
    {
      pos = {x:(2*Math.random()-1)*staticpitBowlRadius,y:(2*Math.random()-1)*staticpitBowlRadius};
    }
    pos = {x:pos.x + staticpitBowlPos.x, y:pos.y + staticpitBowlPos.y};
    staticpits.push(new Pit(pos, undefined, false, false));
  }
}

function drawStaticPits()
{
  drawCircle(staticpitBowlPos, staticpitBowlRadius, "brown");
  for(p in staticpits)
    staticpits[p].draw();
}


function Pit(pos, nextPit, isCorner, isMiddle)
{
  this.pos = pos;
  this.nextPit = nextPit;
  this.isCorner = isCorner;
  this.isMiddle = isMiddle;
  this.width = 2;
  
  this.draw = function()
  {
    drawCircle(this.pos, this.width, "black");
  };
}
