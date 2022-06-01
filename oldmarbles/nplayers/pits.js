var pitWidth = 2;

var marblesPits = [];

function marblePit(x, y, nextPit, isCorner, isMiddle)
{
  this.pitX = x;
  this.pitY = y;
  //this.marble = -1;
  this.nextPit = nextPit;
  this.isCorner = isCorner;
  this.isMiddle = isMiddle;
}

function getPitNDXforMarble(m)
{
  for(var j=0; j<marblesPits.length; j++)
  {
    if(marblesPits[j].pitX == m.marbleX && marblesPits[j].pitY == m.marbleY)
    {
      return j;
    }
  }
  return -1;
}

function generateMarblesPits()
{
  var marblePitNDX = 0;
  
  for(h=0;h<4; h++) //for each player
  {
    for(i=0;i<5;i++) //make home spots
    {
      //orange red blue green
      if(h==0)marblesPits[marblePitNDX++] = new marblePit(215+10*i,215+10*i,[-1,-1,-1,-1],0,0);
      if(h==1)marblesPits[marblePitNDX++] = new marblePit(255-10*i,40+10*i,[-1,-1,-1,-1],0,0);
      if(h==2)marblesPits[marblePitNDX++] = new marblePit(80-10*i,80-10*i,[-1,-1,-1,-1],0,0);
      if(h==3)marblesPits[marblePitNDX++] = new marblePit(40+10*i,255-10*i,[-1,-1,-1,-1],0,0);
    }
  }
  //21
  for(i=0;i<5;i++) //green 1st row (5)
  {
    marblesPits[marblePitNDX++] = new marblePit(102.5,255-12.5*i, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX],0,0);
  }
  //26
  for(i=0;i<5;i++) //green 2nd row (5)
  {
    if(i==0) marblesPits[marblePitNDX++] = new marblePit(102.5-12.5*i,192, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 1, 0);
    else marblesPits[marblePitNDX++] = new marblePit(102.5-12.5*i,192, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 0, 0);
  }
  //31
  for(i=0;i<6;i++) //green 3rd row (6)
  {
    if(i<3) marblesPits[marblePitNDX++] = new marblePit(40,192.5-15*i, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 0, 0);
    if(i==3) marblesPits[marblePitNDX++] = new marblePit(40,192.5-15*i, [marblePitNDX, marblePitNDX, 94, marblePitNDX], 0, 0); //blue goes home
    if(i>3) marblesPits[marblePitNDX++] = new marblePit(40,192.5-15*i, [marblePitNDX, marblePitNDX, -1, marblePitNDX], 0, 0);
  }
  //37
  for(i=0;i<5;i++) //blue 1st row (5)
  {
    marblesPits[marblePitNDX++] = new marblePit(40+12.5*i,102.5, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 0, 0);
  }
  //42
  for(i=0;i<5;i++) //blue 2nd row (5)
  {
    if(i==0) marblesPits[marblePitNDX++] = new marblePit(102.5,102.5-12.5*i, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 1, 0);
    else marblesPits[marblePitNDX++] = new marblePit(102.5,102.5-12.5*i, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 0, 0);
  }
  //47
  for(i=0;i<6;i++) //blue 3rd row (6)
  {
    if(i<3) marblesPits[marblePitNDX++] = new marblePit(102.5+15*i,40, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 0, 0);
    if(i==3) marblesPits[marblePitNDX++] = new marblePit(102.5+15*i,40, [marblePitNDX, 89, marblePitNDX, marblePitNDX], 0, 0); //red goes home
    if(i>3) marblesPits[marblePitNDX++] = new marblePit(102.5+15*i,40, [marblePitNDX, -1, marblePitNDX, marblePitNDX], 0, 0);
  }
  for(i=0;i<5;i++) //red 1st row (5)
  {
    marblesPits[marblePitNDX++] = new marblePit(193,40+12.5*i, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 0, 0);
  }
  for(i=0;i<5;i++) //red 2nd row (5)
  {
    if(i==0) marblesPits[marblePitNDX++] = new marblePit(192.5+12.5*i,102.5, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 1, 0);
    else marblesPits[marblePitNDX++] = new marblePit(192.5+12.5*i,102.5, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 0, 0);
  }
  for(i=0;i<6;i++) //red 3rd row (6) 
  {
    if(i<3) marblesPits[marblePitNDX++] = new marblePit(255,102.5+15*i, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 0, 0);
    if(i==3) marblesPits[marblePitNDX++] = new marblePit(255,102.5+15*i, [84, marblePitNDX, marblePitNDX, marblePitNDX], 0, 0); //orange goes home
    if(i>3) marblesPits[marblePitNDX++] = new marblePit(255,102.5+15*i, [-1, marblePitNDX, marblePitNDX, marblePitNDX], 0, 0);
  }
  for(i=0;i<5;i++) //orange 1st row (5)
  {
    marblesPits[marblePitNDX++] = new marblePit(255-12.5*i,192.5, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 0, 0);
  }
  for(i=0;i<5;i++) //orange 2nd row (5)
  {
    if(i==0) marblesPits[marblePitNDX++] = new marblePit(193.5,192.5+12.5*i, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 1, 0);
    else marblesPits[marblePitNDX++] = new marblePit(193.5,192.5+12.5*i, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 0, 0);
  }
  for(i=0;i<6;i++) //orange 3rd row (6)
  {
    if(i<3) marblesPits[marblePitNDX++] = new marblePit(193-15*i,255, [marblePitNDX, marblePitNDX, marblePitNDX, marblePitNDX], 0, 0);
    if(i==3) marblesPits[marblePitNDX++] = new marblePit(193-15*i,255, [marblePitNDX, marblePitNDX, marblePitNDX, 99], 0, 0); //green goes home
    if(i==4) marblesPits[marblePitNDX++] = new marblePit(193-15*i,255, [marblePitNDX, marblePitNDX, marblePitNDX, -1], 0, 0);
    if(i==5) marblesPits[marblePitNDX++] = new marblePit(193-15*i,255, [20, 20, 20, -1], 0, 0);
  }
  for(i=0;i<5;i++) //orange home
  {
    if(i<4) marblesPits[marblePitNDX++] = new marblePit(240-15*i,147.5, [marblePitNDX, -1, -1, -1], 0, 0);
    else marblesPits[marblePitNDX++] = new marblePit(240-15*i,147.5, [-1, -1, -1, -1], 0, 0);
  }
  for(i=0;i<5;i++) //red home
  {
    if(i<4) marblesPits[marblePitNDX++] = new marblePit(147.5,55+15*i, [-1, marblePitNDX, -1, -1], 0, 0);
    else marblesPits[marblePitNDX++] = new marblePit(147.5,55+15*i, [-1, -1, -1, -1], 0, 0);
  }
  for(i=0;i<5;i++) //blue home
  {
    if(i<4) marblesPits[marblePitNDX++] = new marblePit(55+15*i,147.5, [-1, -1, marblePitNDX, -1], 0, 0);
    else marblesPits[marblePitNDX++] = new marblePit(55+15*i,147.5, [-1, -1, -1, -1], 0, 0);
  }
  for(i=0;i<5;i++) //green home
  {
    if(i<4) marblesPits[marblePitNDX++] = new marblePit(147.5,240-15*i, [-1, -1, -1, marblePitNDX], 0, 0);
    else marblesPits[marblePitNDX++] = new marblePit(147.5,240-15*i, [-1, -1, -1, -1], 0, 0);
  }
  
  marblesPits[marblePitNDX] = new marblePit(147.5,147.5, [-1, -1, -1, -1], 0, 1);
}