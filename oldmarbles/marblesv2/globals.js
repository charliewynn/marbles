//Colors
var redFill = "rgba(255,0,0,1)";
var greenFill = "rgba(34,139,34,1)";
var orangeFill = "rgba(255,140,0,1)";
var blueFill = "rgba(0,0,255,1)";
var blackFill = "rgba(0,0,0,1)";
var whiteFill = "rgba(255,255,255,1)";
var lightblueFill = "rgba(100,100,255,1)";
var greyFill = "rgba(255,255,255,.5)";
var lightgreyFill = "rgba(200,200,200,1)";
var darkgreyFill = "rgba(169,169,169,1)";
var brownFill = "rgba(139,69,19,1)";


var board = "110002222233333444441001000000000000000000000000000000000000000000000000000000000000000000000000000000001";
var oldBoards = [];//when the player moves a marble let's push the old boardstring ^^^^ on here, so they can undo
//maybe only let them undo the entire move, that way we can reset the possible moves based on the dice roll


var canvas;
var context;
var debug = "";//debug string printed on the board --for now I have it showing the possible moves

var pitWidth = 2;
var marbleWidth = 7;

var marblesPits = [];

var possibleMoves = [];//possible moves based on dice roll
var remainingMoves = [];//the moves the current player has left to make

var currentMove;
var currentMoveAmt = 0;//1-12 //the amt the current player is about to move a marble
var currentMoveMarble = 0;//1-5 //marble user is about to move
var currentMoveToPitNDX = -1;
var currentMoveableMarbles = [];

var whosTurn = 0;