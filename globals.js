var canvas;
var context;
var debug = "";

var width = 200;
var height = 200;
var numPlayers = 4;

var numMarbles = 5;

var innerPits = 5;
var outerPits = 6;

var offset1 = .95; //outer / home inner
var offset2 = .6; //inner
var offset3 = .3; //home outer

var outInRatio = 1;

var drawLines = false;
var showHelp = false;

var pitSize = 5;
var marbleSize = 10;

var marbles = [];
var players = [];
function Player(name, c1, c2, c3)
{
	this.name = name;
  this.c = [c1, c2, c3];
  this.color = function() { return "rgba("+this.c[0]+","+this.c[1]+","+this.c[2]+",1)"; };
};
function Marble(pos, color)
{
	this.pos = pos;
  this.color = color;
};
function Vector(x, y)
{	
	this.x = x;
	this.y = y;
};

function createBoardStr()
{
  var h = "-";
  var str = "";
  str += numPlayers + h;
  str += numMarbles + h;
  str += marbleSize + h;
  str += width/2 + h;
  str += innerPits + h;
  str += outerPits + h;
  str += offset1 + h;
  str += offset2 + h;
  str += offset3 + h;
  str += outInRatio + h;
  str += drawLines ? 1 : 0;
  str += ";";
  
  for(var i=0; i<numPlayers; i++)
  {
    str += players[i].name + h + players[i].color();
    if(i != numPlayers-1)
      str += ":";
  }
  str += ";";
  
  for(m in marbles)
  {
    str += "(" + marbles[m].pos.x + "," + marbles[m].pos.y + ")"
    if(m != marbles.length - 1)
      str += "-";
  }
  str += ";" + 1 + "-" + 1 + ";" + Math.floor(Math.random()*numPlayers);
  
  return str;
};

function save()
{
  var t = Date.now();
  var xmlhttp;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      var win=window.open("./game/board.html?gid=" + t, '_blank');
      win.focus();
    }
  }
  xmlhttp.open("POST", "./game/writetofile.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("file=" + t + "&text=" + createBoardStr());
};

