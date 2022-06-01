//this is the definition of a move, old pit, new pit, and color of arrow to draw
function oneMove(marble, oldPitNDX, newPitNDX, color, moveAmt, desc)
{
  this.marble = marble;
	this.oldPitNDX = oldPitNDX;
	this.newPitNDX = newPitNDX;
  this.moveAmt = moveAmt;
	this.color = color;
	this.desc = desc;
};

//Functions

//try to move a marble, and return the move if it is possible
function previewMove(marble, pitToMoveFromNDX, steps)
{
	var player = getMarbleForPitNDX(pitToMoveFromNDX).player;
	if(player == -1 || steps == -1)
		return undefined;
	return previewMove_h(pitToMoveFromNDX, pitToMoveFromNDX, steps, player, steps);
};

function previewMove_h(originalPitNDX, intermediatePitNDX, steps, player, dieUsed)
{
	var intermediatePit = marblesPits[intermediatePitNDX];//we step along each pit so this is the pit we're thinking about right now
    
	if(intermediatePit.nextPit[player] == -1)//can't move anymore, like if you're one back from your getOut hole, you shouldn't be there
		return undefined;
	else
	{
		for(var i=0; i<player1sMarbles.length; i++)
		{
			if(intermediatePit.nextPit[player] == getPitNDXforMarble(allMarbles[player][i]))
			{
				//can't pass yourself
				return undefined;
			}
		}
	}
	if(steps == 1)
	{
		return new oneMove(originalPitNDX, intermediatePit.nextPit[player], blackFill, dieUsed);
	}
	else
		return previewMove_h(originalPitNDX, intermediatePit.nextPit[player], steps-1, player, dieUsed);
};

//see how far you can move for your 20, very similar to above function
function preview20(pitToMoveFromNDX)
{
	return preview20_h(pitToMoveFromNDX, pitToMoveFromNDX, 20, getMarbleForPitNDX(pitToMoveFromNDX).player)
};

function preview20_h(originalPitNDX, intermediatePitNDX, steps, player)
{
	var intermediatePit = marblesPits[intermediatePitNDX];
	if(intermediatePit.nextPit[player] == -1)
		return new oneMove(originalPitNDX, intermediatePitNDX, blackFill, 0);
	else
	{
		for(var i=0; i<player1sMarbles.length; i++)
		{
			if(intermediatePit.nextPit[player] == getPitNDXforMarble(allMarbles[player][i]))
			{
				//can't pass yourself
				return new oneMove(originalPitNDX, intermediatePitNDX, blackFill, 0);
			}
		}
	}
	if(steps == 1)
		return new oneMove(originalPitNDX, intermediatePit.nextPit[player]);
	else
		return preview20_h(originalPitNDX, intermediatePit.nextPit[player], steps-1, player);
};


//find possible moves
/*
I want to re-work how this works
so, lets have the player choose a marble
then we'll decide what the possible moves are and let them choose 


*/
function findPossibleMoves()
{
	possibleMoves = [];
	
	if(getMarbleForPitNDX(104) != undefined)//if there's a marble in the center
	{
        if(getMarbleForPitNDX(104).player == whosTurn && (die1 == 1 || die2 == 1))//if it's the player whosTurn it is, and if they rolled a 1
        {
            var m25 = getMarbleForPitNDX(25);//these are the marbles for the corners
            var m41 = getMarbleForPitNDX(41);
            var m57 = getMarbleForPitNDX(57);
            var m73 = getMarbleForPitNDX(73);
            
            if(m25 == undefined)//if theres no marble on the corner
                possibleMoves.push(new oneMove(104, 25, blackFill, 1, "Get Out By Green"));
            else if(m25.marbleColor != allMarbles[whosTurn][0].marbleColor)//if the marble that's on the corner isn't the same color as the middle one
                possibleMoves.push(new oneMove(104, 25, blackFill, 1, "Get Out By Green"));
            if(m41 == undefined)
                possibleMoves.push(new oneMove(104, 41, blackFill, 1, "Get Out By Blue"));
            else if(m41.marbleColor != allMarbles[whosTurn][0].marbleColor)
                possibleMoves.push(new oneMove(104, 41, blackFill, 1, "Get Out By Blue"));
            if(m57 == undefined)
                possibleMoves.push(new oneMove(104, 57, blackFill, 1, "Get Out By Red"));
            else if(m57.marbleColor != allMarbles[whosTurn][0].marbleColor)
                possibleMoves.push(new oneMove(104, 57, blackFill, 1, "Get Out By Red"));
            if(m73 == undefined)
                possibleMoves.push(new oneMove(104, 73, blackFill, 1, "Get Out By Orange"));
            else if(m73.marbleColor != allMarbles[whosTurn][0].marbleColor)
                possibleMoves.push(new oneMove(104, 73, blackFill, 1, "Get Out By Orange"));
        }
	}
	
	//I use player1sMarbles.length when I just want the number of marbles, don't know why I made it changeable; it should always be 5
	for(var i=0; i<player1sMarbles.length; i++)//go through the current player's marbles
	{
		var currentPit = getPitNDXforMarble(allMarbles[whosTurn][i]);
		if(currentPit == -1) alert("Lost Marble");//shouldn't happen, but does when boardstr is set incorrectly
		
		var move = previewMove(currentPit, die1);//check moves for die for the currentmarble
		if(move != undefined && die1 != -1)
			possibleMoves.push(move);
		move = previewMove(currentPit, die2);//check moves for 2nd die for the currentMarble
		if(move != undefined && die2 != -1)
			possibleMoves.push(move);
		move = previewMove(currentPit, die1 + die2);//check moves for using both dies
		if(move != undefined && die1 != -1 && die2 != -1)
			possibleMoves.push(move);
	}//we just built the possibleMoves array
	
	var marbleAtStart = -1;//index of a marble for current player that is at their start spot, -1 if no marble is at start
	var marbleAtOutSpot = 0;//if whosturn has a marble at their own out spot
	//check home spots
	for(var i=0; i<5; i++)
	{
		for(var j=0; j<allMarbles[0].length; ++j)
		{
			if(outSpot(whosTurn) == getPitNDXforMarble(allMarbles[whosTurn][j]))
			{
				marbleAtOutSpot = 1;
			}
			if(5*whosTurn + i == getPitNDXforMarble(allMarbles[whosTurn][j]))
			{
				marbleAtStart = j;
			}
		}
	}
	if(marbleAtStart != -1 && marbleAtOutSpot == 0 && (die1 == 1 || die2 == 1 || die1 == 6 || die2 == 6))
	{//if the curr player has a marble at start, isn't on their own get out spot, and rolled a 1 or 6
    
		
		if(die1 == 1 || die1 == 6)
		{
            possibleMoves.push(new oneMove(5*whosTurn + marbleAtStart,outSpot(whosTurn),greenFill, die1, "Get Out"));
			var move = previewMove_h(outSpot(whosTurn), outSpot(whosTurn), die2, whosTurn);//check moves for die for the currentmarble
			if(move != undefined && die2 != -1)
				possibleMoves.push(new oneMove(5*whosTurn + marbleAtStart,move.newPitNDX,greenFill, die2, "Get Out and Move"));
		}
		else if(die2 == 1 || die2 == 6)
		{
            possibleMoves.push(new oneMove(5*whosTurn + marbleAtStart,outSpot(whosTurn),greenFill, die2, "Get Out"));
			var move = previewMove_h(outSpot(whosTurn), outSpot(whosTurn), die1, whosTurn);//check moves for die for the currentmarble
			if(move != undefined && die1 != -1)
				possibleMoves.push(new oneMove(5*whosTurn + marbleAtStart,move.newPitNDX,greenFill, die1, "Get Out and Move"));
		}
	}
	
	//go through those possibleMoves
	for(i=0; i<possibleMoves.length; i++)
	{
		var mp = marblesPits[possibleMoves[i].newPitNDX];
		
		if(marblesPits[possibleMoves[i].newPitNDX].isCorner == 1)//if a marble can move to a corner
		{
			var centerMarble = getMarbleForPitNDX(104);//let's look at the center marble
			if(centerMarble == undefined)//no marble in the center
			{
				possibleMoves.push(new oneMove(possibleMoves[i].oldPitNDX, 104, blackFill));//add possibility to move to center
			}
			else if(centerMarble.marbleColor != allMarbles[whosTurn][0].marbleColor) //marble of different color in center
			{
				possibleMoves.push(new oneMove(possibleMoves[i].oldPitNDX, 104, blackFill));//add possibility to move to center
			}
		}
	}
		
	//see if you landed on another marble and if you get to go 20 more
	for(var y=0; y<4; y++) //you can't land on other marbles more that 4 times
	{
		var oldPMlength = possibleMoves.length; //since we'll be adding to possible moves, don't iterate over its length
		for(i=0; i<oldPMlength; i++)
		{
			var attackedMarble = getMarbleForPitNDX(possibleMoves[i].newPitNDX);
			if(attackedMarble != undefined)
			{
				if(attackedMarble.marbleColor != allMarbles[whosTurn][0].marbleColor)
				{
					m = preview20(possibleMoves[i].newPitNDX);//get the move for moving an additional 20
					if(m != undefined)
					{
						m.color = redFill;
						possibleMoves.push(m);
					}
				}
			}
		}
	}
}