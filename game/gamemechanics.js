var gid = gup('gid');
if(gid != "" && gid != undefined)
{
  refresh();
  setInterval(refresh, 3000);
}
else
{
  var gid = prompt("Please enter a gameId room name", "ID");
  if(gid)
    window.location = 'board.html?gid=' + gid;
  else
    window.location = 'board.html?gid=11235813253455';
}
    

    
function gup( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
  var regexS = "[\\?&]"+name+"=([^&#]*)";  
  var regex = new RegExp( regexS );  
  var results = regex.exec( window.location.href ); 
   if( results == null )    return "";  
  else    return results[1];}
        
function getbyid(id) { return document.getElementById(id); }

function didload()
{					
  document.documentElement.style.overflow = 'hidden';	 // firefox, chrome
  document.body.scroll = "no";
  canvas = getbyid("theCanvas");
  context = canvas.getContext("2d");
  
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mouseup',   mouseUp, false);
  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchmove", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);
  
  loadBoardByStr(boardstr);
  canvas.height = height;
  canvas.width = width;
  
  
  var xd2sq = (width/2) * (width/2);
  var len = Math.sqrt(xd2sq*2);
  z = len-width/2;
  z *= .75
  //z = Math.sqrt(2*(width/2)*(width/2))-width/2;
  redraw();
}

function openRolls()
{
  var win=window.open("preview/board.html?gid=" + gid, '_blank');
  win.focus();
}

function flashButton(button, time)
{
  if(time > 0)
  {
    buttonColor[button] = buttonColor[button] == lightgreyFill ? redFill : lightgreyFill;
    redraw();
    setTimeout(function(){flashButton(button, time-1);}, 100);
    return;
  }
  redraw();
  buttonColor[button] = lightgreyFill;
}

function createBoardStr()
{
  var h = "-";
  var str = "";
  str += parseInt(numPlayers) + h;
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
    str += players[i].name + h + players[i].color;
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
  str += ";" + die1 + "-" + die2 + ";" + whosTurn;
  
  return str;
}
      
function loadBoardByStr(str)
{
  var boarddata = str.split(";");
  var boardsetup = boarddata[0].split("-");
  numPlayers = parseInt(boardsetup[0]);
  numMarbles = parseInt(boardsetup[1]);
  pitSize = 5;
  marbleSize = boardsetup[2];
  width = height = boardsetup[3] * 2;

  var xd2sq = (width/2) * (width/2);
  var len = Math.sqrt(xd2sq*2);
  z = len-width/2;
  z *= .75


  innerPits = boardsetup[4];
  outerPits = boardsetup[5];
  offset1 = boardsetup[6];
  offset2 = boardsetup[7];
  offset3 = boardsetup[8];
  outInRatio = boardsetup[9];
  drawLines = boardsetup[10] == 1;
  
  parseBoard();
  
  //parse player stuff
  var playersetup = boarddata[1].split(":");
  players = [];
  for(var i=0; i<numPlayers; ++i)
  {
    players.push(new Player(playersetup[i].split("-")[0], playersetup[i].split("-")[1]));
  }
  
  //parse marbles
  var marbledata = boarddata[2].split("-");
  for(var i=0; i<numPlayers; i++)
  {
    for(var j=0; j<numMarbles; j++)
    {
      var pos = marbledata[i*numMarbles + j];
      pos = pos.replace("(", "").replace(")","");
      marbles.push(new Marble(new Vector(pos.split(",")[0], pos.split(",")[1]), players[i].color));
    }
  }
  
  if(boarddata[3])
  {
    var dice = boarddata[3].split("-");
    var currentDiceLoad = boarddata[5] ? boarddata[5] : -1;
    
    if((dice[0] != die1 || dice[1] != die2) ||  currentDiceLoad != lastDiceLoad)
    {
      lastDiceLoad = currentDiceLoad;
      console.log('wr - ' + dice[0] + ' - ' + dice[1]);
      roll(function() {die1 = dice[0]; die2 = dice[1]; redraw();});
    }
  }
  if(boarddata[4])
  {
    whosTurn = parseInt(boarddata[4]);
  }
  redraw();
}
function storeState()
{
  console.log("ss - " + die1 + " - " + die2);
  var xmlhttp;
  if (window.XMLHttpRequest)
    xmlhttp=new XMLHttpRequest();
  else
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      //document.write(xmlhttp.responseText);
    }
  }
  xmlhttp.open("POST", "appendtofile.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("file=" + gid + "rolls&link=true&text=" + createBoardStr() + ";" + die1 + "-" + die2 + ";" + whosTurn);
}
function storeroll()
{
  console.log("sr - " + die1 + " - " + die2);
  var xmlhttp;
  if (window.XMLHttpRequest)
    xmlhttp=new XMLHttpRequest();
  else
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      storeState()
      //document.write(xmlhttp.responseText);
    }
  }
  xmlhttp.open("POST", "appendtofile.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  var p = die1 != die2 ? (whosTurn+numPlayers-1)%numPlayers : whosTurn;
  xmlhttp.send("file=" + gid + "rolls&text=" + players[p].name + " " + die1 + "-" + die2);
}
    
function save()
{
  if(die1 != die2) incWhosTurn();
  storeroll();
  var xmlhttp;
  if (window.XMLHttpRequest)
    xmlhttp=new XMLHttpRequest();
  else
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      pauseRefresh = false;
      redraw();
    }
  }
  xmlhttp.open("POST", "writetofile.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("file=" + gid + "&text=" + createBoardStr());
}
function refresh()
{
  if(pauseRefresh) return;
  
  var xmlhttp;
  if (window.XMLHttpRequest)
    xmlhttp=new XMLHttpRequest();
  else
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      var board = xmlhttp.responseText;
      if(pauseRefresh) return;
      if(board.length > 10)
        loadBoardByStr(board);
    }
  }
  xmlhttp.open("POST", "loadfile.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("file=" + gid);      
}

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