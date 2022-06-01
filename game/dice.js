var lock = 0;
var iterator = 0;
function progress(fn) {
  if (iterator > 0) {
    var d1 = Math.floor(Math.random()*6 + 1 );
    var d2 = Math.floor(Math.random()*6 + 1 );
    die1 = d1;
    die2 = d2;
    console.log(die1 + " - " + die2);
    iterator = iterator - 1;
    redraw();
    setTimeout(function(){progress(fn);}, 75 + 20*(8-iterator));
  }
  else
  {
    fn();
    lock = 0;
  }
}

function roll(fn){
  console.log("rolling");
  if(lock == 0)
  {
    lock = 1;
    iterator = Math.floor(Math.random()*3 + 5);
    progress(fn);
  }
}

function saveroll()
{
  var d1 = Math.floor(Math.random()*6 + 1 );
  var d2 = Math.floor(Math.random()*6 + 1 );
  die1 = d1;
  die2 = d2;
  console.log("*" + die1 + " - " + die2 + "*");

  var xmlhttp;
  if (window.XMLHttpRequest)
    xmlhttp=new XMLHttpRequest();
  else
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      redraw();
    }
  }
  xmlhttp.open("POST", "writetofile.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("file=" + gid + "&text=" + createBoardStr() + ";" + d1 + "-" + d2 + ";" + whosTurn + ";" + Date.now());
  redraw();
}