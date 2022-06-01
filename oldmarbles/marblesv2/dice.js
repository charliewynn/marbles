var die1 = -1; //start the dice off at -1 no reason why
var die2 = -1;
var dieFaces = ["d1.gif","d2.gif","d3.gif","d4.gif","d5.gif","d6.gif"];//images for the dice
var lock = 0; //lock the dice, so you can't roll while they're already rolling
//we can also use this lock to keep players from re-rolling when they're not supposed to

function progress(iterator) {//progress the dice roll
	if (iterator > 0) {
		var randomdice1=Math.floor(Math.random()*6);//new random number for die 1
		$("#die1").attr("src", dieFaces[randomdice1]);//set the image for the die 1
		
		var randomdice2=Math.floor(Math.random()*6);//new random number for die 2
		$("#die2").attr("src", dieFaces[randomdice2]);//set img for die 2
		
		die1 = randomdice1 + 1;//this is the var that stores the die 1 value
		die2 = randomdice2 + 1;//die 2 val
		setTimeout(function(){progress(iterator-1);}, 5 + 25*(8-iterator));//move the dice again, the time out is done like this so the dice appear to slow down
	}
	else
	{
        var temp = die1;
        die1 = Math.min(die1, die2);
        die2 = Math.max(temp, die2);
        remainingMoves = [die1, die2, die1+die2];
        findPossibleMoves();
        if(possibleMoves.length == 0)
        {
            if(die1 == die2)
                debug = "No Moves!, roll again";
            else
            {
                debug = "No Moves, next player's turn";
                whosTurn = (whosTurn + 1) % 4;
            }
            lock = 0;
        }
        else
        {
            currentMoveableMarbles = [];
            for(var i=1; i<=5; ++i)
                currentMoveableMarbles[i] = 0;
            for(var i=0; i<possibleMoves.length; ++i)
            {
                currentMoveableMarbles[getMarbleForPitNDX(possibleMoves[i].oldPitNDX).marbleNum] = 1;
            }
            
            document.getElementById("whichMarble").innerHTML = "";
            for(var i=1; i<=5; ++i)
            {
                if(currentMoveableMarbles[i] == 1)
                    $("#whichMarble").append("<button onClick='setMoveMarble("+i+");'>Move Marble "+i+"</button><br>");
            }
            
            debug = "Move " + die1 + " and " + die2 + ", or " + (die1+die2);
        }
		redraw();
	}
};

function throwdice(){
	if(lock == 0)
	{
		lock = 1;
		iterator = Math.floor(Math.random()*3 + 15);
		progress(iterator);
	}
};

function setMoveAmt(oldPitNDX, newPitNDX)//0-die1; 1-die2; 2-die1+die2
{    
	currentMoveToPitNDX = newPitNDX;
  $("diceATM").innerHTML = "";
	var listOfMoves = [];
    for(var i=0; i<possibleMoves.length; ++i)
    {
      if(getMarbleForPitNDX(possibleMoves[i].oldPitNDX).marbleNum == currentMoveMarble)
      {
        var isInList = 0;
        for(var j=0; j<listOfMoves.length; ++j)
        {
          if(listOfMoves[j].oldPitNDX == possibleMoves[i].oldPitNDX && listOfMoves[j].newPitNDX == possibleMoves[i].newPitNDX)
            isInList = 1;
        }
        if(!isInList)
          listOfMoves.push(possibleMoves[i]);
      }
    }
	
    $("diceATM").innerHTML += "";
	for(var i=0; i<listOfMoves.length; ++i)
	{
		var desc = listOfMoves[i].desc == undefined ? "" : listOfMoves[i].desc;
		var dist = listOfMoves[i].moveAmt;
		if(listOfMoves[i].oldPitNDX == oldPitNDX && listOfMoves[i].newPitNDX == newPitNDX)
		{
			currentMove = listOfMoves[i];
			currentMoveAmt = listOfMoves[i].moveAmt;
			$("diceATM").innerHTML += "<button disabled=\"disabled\">Move "+dist+" "+desc+"</button><br>";
		}
		else
			$("diceATM").innerHTML += "<button onClick=\"setMoveAmt("+listOfMoves[i].oldPitNDX+","+listOfMoves[i].newPitNDX+");\">Move "+dist+" "+desc+"</button><br>";
	}
    $("confirmMove").innerHTML = "<button onClick=\"moveMarble();\">Move Marble</button>";
};

function setMoveMarble(marble)
{
    currentMoveMarble = marble;
    document.getElementById("whichMarble").innerHTML = "";
    for(var i=1; i<currentMoveableMarbles.length; ++i)
    {
        if(currentMoveableMarbles[i] == 1)
        {
            if(i != marble)
                document.getElementById("whichMarble").innerHTML += "<button onClick=\"setMoveMarble("+i+");\">Move Marble "+i+"</button><br>";
            else
                document.getElementById("whichMarble").innerHTML += "<button disabled=\"disabled\" onClick=\"setMoveMarble("+i+");\">Move Marble "+i+"</button><br>";
        }
    }
    
    document.getElementById("diceATM").innerHTML = "";
	var listOfMoves = [];
    for(var i=0; i<possibleMoves.length; ++i)
    {
        if(getMarbleForPitNDX(possibleMoves[i].oldPitNDX).marbleNum == marble)
        {
			var isInList = 0;
			for(var j=0; j<listOfMoves.length; ++j)
			{
				if(listOfMoves[j].oldPitNDX == possibleMoves[i].oldPitNDX && listOfMoves[j].newPitNDX == possibleMoves[i].newPitNDX)
					isInList = 1;
			}
			if(!isInList)
				listOfMoves.push(possibleMoves[i]);
        }
    }
	
    document.getElementById("diceATM").innerHTML += "";
	for(var i=0; i<listOfMoves.length; ++i)
	{
		var desc = listOfMoves[i].desc == undefined ? "" : listOfMoves[i].desc;
		var dist = listOfMoves[i].moveAmt;
		var oldPitNDX = listOfMoves[i].oldPitNDX;
		var newPitNDX = listOfMoves[i].newPitNDX;
		document.getElementById("diceATM").innerHTML += "<button onClick=\"setMoveAmt("+oldPitNDX+","+newPitNDX+");\">Move "+dist+" "+desc+"</button><br>";
	}
    
};

function moveMarble()
{
	//move the marble
	allMarbles[whosTurn][currentMoveMarble-1].marbleX = marblesPits[currentMoveToPitNDX].pitX;
	allMarbles[whosTurn][currentMoveMarble-1].marbleY = marblesPits[currentMoveToPitNDX].pitY;
	
	if(currentMove.desc == "Get Out and Move")//bad way to do this probably
	{
		die1 = -1;
		die2 = -1;
	}
	var usedDie1 = false;
    if(die1 == currentMoveAmt)
	{
		usedDie1 = true;
		die1 = -1;
	}
    if(die2 == currentMoveAmt && !usedDie1) die2 = -1;
	
    if((die1 + die2) == currentMoveAmt)
    {
        die1 = -1;
        die2 = -1;    
    }
    if(die1 == -1 && die2 == -1)//both dice used
    {
		possibleMoves = [];
        if(document.images["die1"].src != document.images["die2"].src)//if they didn't roll doubles
		{
            whosTurn = (whosTurn + 1) % 4;
			debug = "Roll The Dice";
		}
        else
            debug = "You Rolled Doubles! Roll again";
        lock = 0;
    }
	else
	{
		findPossibleMoves();
		if(possibleMoves.length == 0)
		{
			debug = "No Moves, next player's turn";
			whosTurn = (whosTurn + 1) % 4;
			document.getElementById("whichMarble").innerHTML = "";
			lock = 0;
		}
		else
		{
			currentMoveableMarbles = [];
			for(var i=1; i<=5; ++i)
				currentMoveableMarbles[i] = 0;
			for(var i=0; i<possibleMoves.length; ++i)
			{
				currentMoveableMarbles[getMarbleForPitNDX(possibleMoves[i].oldPitNDX).marbleNum] = 1;
			}
			
			document.getElementById("whichMarble").innerHTML = "";
			for(var i=1; i<=5; ++i)
			{
				if(currentMoveableMarbles[i] == 1)
					document.getElementById("whichMarble").innerHTML += "<button onClick=\"setMoveMarble("+i+");\">Move Marble "+i+"</button><br>";
			}		
		}
	}
    document.getElementById("diceATM").innerHTML = "";
    document.getElementById("confirmMove").innerHTML = "";
    redraw();
};