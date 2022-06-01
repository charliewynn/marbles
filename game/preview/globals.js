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
var pits = [];
var lines = [];
var players = [];

var dragging = -1;

var pauseRefresh = true;
var firstload = true;

var z = 10;

var die1 = 1;
var die2 = 2;

var die1old = 1;
var die2old = 2;


var diceShuffling = 10;

var lastBoard = "";

var whosTurn = -1;

function incWhosTurn()
{
  whosTurn = (parseInt(whosTurn)+1)%numPlayers;
}