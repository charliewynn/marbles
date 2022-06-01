//generic draw generic circle
function drawCircle(x,y,radius,color)
{
	context.beginPath();
	context.fillStyle = color;
	context.arc(x, y, radius, 0, Math.PI*2,false);
	context.closePath();	
	context.fill();
};

function drawMarble(m)
{
    if(m == undefined) return;
	drawCircle(m.marbleX,m.marbleY,marbleWidth,m.marbleColor);
	context.fillStyle = blackFill;
	context.font = 'bold 12px sans-serif';
	context.textBaseline = 'bottom';
	context.fillText(m.marbleNum, m.marbleX-marbleWidth+3,m.marbleY+marbleWidth+.5);
};

//draw an semi-circle from x1,y1 to x2, y2
function drawArrow(x1, y1, x2, y2, color)
{
	context.beginPath();
	var centerX = (x2+x1)/2;
	var centerY = (y2+y1)/2;
	var radius = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	context.arc((x2+x1)/2, (y2+y1)/2, (Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)))/2, Math.atan2(y2-y1, x2-x1), Math.atan2(y2-y1, x2-x1) + Math.PI, false);
	context.lineWidth = 2;
	context.strokeStyle = color;
	context.stroke();
};

function drawRect(x1,y1,x2,y2,color)
{
	context.fillStyle = color;
	context.fillRect(x1,y1,x2,y2);
	context.fill();
};

function drawText(x, y, text, color, font)
{
	context.fillStyle = color;
    context.font = typeof font == 'undefined' ? 'italic bold 15px sans-serif' : font;
	context.textBaseline = 'bottom';
	context.fillText(text, x, y);
};

function redraw()
{				
	document.getElementById('boardstr').value = generateBoardString();//display the current boardstr
	
	//Draw Background
	drawRect(0,0,295,295,lightgreyFill);
	drawRect(20,20,255,255, greyFill);
	
	//Draw who's turn
	drawCircle(117,10,marbleWidth,allMarbles[whosTurn][0].marbleColor);//color of first marble of whosTurns Marbles
    drawText(125,20,'\'s Turn! '+ whosTurn, blackFill);//text
	
	drawText(2, 295, debug, blackFill);//Draw debug text
	
	for(i=0; i<marblesPits.length;i++)
	{					
		if(marblesPits[i].isCorner == 1 || marblesPits[i].isMiddle == 1)
			drawCircle(marblesPits[i].pitX,marblesPits[i].pitY,pitWidth,redFill);
		else
			drawCircle(marblesPits[i].pitX,marblesPits[i].pitY,pitWidth,blackFill);
	}
	for(var j=0; j<allMarbles.length;j++)
	{
		for(i=0; i<allMarbles[j].length;i++)
		{
			drawMarble(allMarbles[j][i]);
		}
	}
	
	//draw an arrow for the possible moves
	for(i=0; i<possibleMoves.length; i++)
	{
		drawArrow(marblesPits[possibleMoves[i].oldPitNDX].pitX, marblesPits[possibleMoves[i].oldPitNDX].pitY, marblesPits[possibleMoves[i].newPitNDX].pitX, marblesPits[possibleMoves[i].newPitNDX].pitY, possibleMoves[i].color);
	}
	//draw center marble on top of lines otherwise it looks like a swastika in the center if you roll a 1
	drawMarble(getMarbleForPitNDX(104));
};