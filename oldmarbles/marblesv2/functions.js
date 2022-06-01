function didload()
{					
	canvas = document.getElementById("theCanvas");
	context = canvas.getContext("2d");
		
	generateMarblesPits();
	for(i=0;i<allMarbles.length;i++)
	{
		playerMarbleNDX = 0;
		for(j=0; j<marblesPits.length;j++)
		{
			if(board[j] == (i+1)+"")
			{
				//marblesPits[i].marble = player1sMarbles[player1ndx];
				allMarbles[i][playerMarbleNDX].marbleX = marblesPits[j].pitX;
				allMarbles[i][playerMarbleNDX].marbleY = marblesPits[j].pitY;
				++playerMarbleNDX;
			}
		}
	}
	redraw();
			
};

//generate the string that encodes the board
function generateBoardString()
{
	var boardstr = "";
	for(var i=0; i<marblesPits.length; i++)
	{
		var pitMarble = getMarbleForPitNDX(i);
		if(pitMarble == undefined)
			boardstr += "0";
		else 
		{
            boardstr += pitMarble.player+1;
		}
	}
	return boardstr;
};