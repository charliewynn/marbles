var marbleWidth = 7;

var player1sMarbles = [new marble(orangeFill), new marble(orangeFill),new marble(orangeFill), new marble(orangeFill), new marble(orangeFill)];
var player2sMarbles = [new marble(redFill), new marble(redFill),new marble(redFill), new marble(redFill), new marble(redFill)];
var player3sMarbles = [new marble(blueFill), new marble(blueFill),new marble(blueFill), new marble(blueFill), new marble(blueFill)];
var player4sMarbles = [new marble(greenFill), new marble(greenFill),new marble(greenFill), new marble(greenFill), new marble(greenFill)];

var allMarbles = [player1sMarbles,player2sMarbles,player3sMarbles,player4sMarbles];


function marble(color)
{
  this.marbleColor = color;
  this.marbleX = 0;
  this.marbleY = 0;
}

function getMarbleForPitNDX(ndx)
{
  for(var j=0; j<allMarbles.length;j++)
  {
    for(var i=0; i<allMarbles[j].length;i++)
    {
      if(getPitNDXforMarble(allMarbles[j][i]) == ndx)
      {
        return allMarbles[j][i];
      }
    }
  }
  return undefined;
}