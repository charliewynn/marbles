function marble(player, color, num)
{
	this.player = player;//1,2,3,4
	this.marbleColor = color;//fill color, defined in globals
	this.marbleX = 0;//relative to board
	this.marbleY = 0;
	this.marbleNum = num;//number of marble for the player 1,2,3,4,5
};

function marblePit(x, y, nextPit, isCorner, isMiddle)
{
	this.pitX = x;
	this.pitY = y;
	this.nextPit = nextPit;//array of pointers to the next pit for each player
	this.isCorner = isCorner;
	this.isMiddle = isMiddle;
};

var player1sMarbles = [new marble(0, orangeFill, 1),
                       new marble(0, orangeFill, 2),
                       new marble(0, orangeFill, 3),
                       new marble(0, orangeFill, 4),
                       new marble(0, orangeFill, 5)];
var player2sMarbles = [new marble(1, redFill, 1),
                       new marble(1, redFill, 2),
                       new marble(1, redFill, 3),
                       new marble(1, redFill, 4),
                       new marble(1, redFill, 5)];
var player3sMarbles = [new marble(2, blueFill, 1),
                       new marble(2, blueFill, 2),
                       new marble(2, blueFill, 3),
                       new marble(2, blueFill, 4),
                       new marble(2, blueFill, 5)];
var player4sMarbles = [new marble(3, greenFill, 1),
                       new marble(3, greenFill, 2),
                       new marble(3, greenFill, 3),
                       new marble(3, greenFill, 4),
                       new marble(3, greenFill, 5)];

var allMarbles = [player1sMarbles,player2sMarbles,player3sMarbles,player4sMarbles];


//Functions

//get the pit ndx for a marble
function getPitNDXforMarble(m)
{
	for(var j=0; j<marblesPits.length; j++)//for each pit
	{
		if(marblesPits[j].pitX == m.marbleX && marblesPits[j].pitY == m.marbleY)//if it's in the same position as the passed in marble m
		{
			return j;
		}
	}
	return -1;
};

//get the marble obj for a pit ndx
function getMarbleForPitNDX(ndx)
{
	for(var j=0; j<allMarbles.length; j++)//for each player
	{
		for(var i=0; i<allMarbles[j].length; i++)//for each of player j's marbles
		{
			if(getPitNDXforMarble(allMarbles[j][i]) == ndx)//is the pitNDX == to the passed in NDX?
			{
				return allMarbles[j][i];
			}
		}
	}
	return undefined;
};

//get the spot where a player get's out
function outSpot(player)
{
	return 20 + 16*(3-player);
};

//euclidean dist
function distBetween(x1, y1, x2, y2)
{
	return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)));
};

//place the marble pits
function generateMarblesPits()
{
	var marblePitNDX = 0;
	for(h=0;h<4; h++) //for each player
	{
		for(i=0;i<5;i++) //make home spots
		{
			//orange red blue green
            //the (4-i) parts make sure that the numbers on the marbles start from the outside and go in
			if(h==0)marblesPits[marblePitNDX++] = new marblePit(215+10*(4-i),215+10*(4-i),[-1,-1,-1,-1],0,0);
			if(h==1)marblesPits[marblePitNDX++] = new marblePit(255-10*i,40+10*i,[-1,-1,-1,-1],0,0);
			if(h==2)marblesPits[marblePitNDX++] = new marblePit(80-10*(4-i),80-10*(4-i),[-1,-1,-1,-1],0,0);
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