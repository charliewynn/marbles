var canvas;
var context;
var debug = "";


		  var boardstr = "4-5-10-450-6-7-.95-.65-.5-1-1;charlie-rgba(255,255,255,1):jordan-rgba(0,255,255,1):michael-rgba(255,0,255,1):al-rgba(255,255,0,1);(843.75,450)-(810,450)-(742.5,450)-(877.5,450)-(776.25,450)-(450,843.75)-(450,776.25)-(450,877.5)-(450,810)-(450,742.5)-(157.5,450.00000000000006)-(56.25,450.00000000000006)-(123.75,450.00000000000006)-(22.5,450.00000000000006)-(90,450.00000000000006)-(449.99999999999994,157.5)-(449.99999999999994,90)-(449.99999999999994,22.5)-(449.99999999999994,123.75)-(449.99999999999994,56.25)";
      
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

var pauseRefresh = false;

var buttonColor = {'Save':"rgba(200,200,200,1)", 'Roll':"rgba(200,200,200,1)"};

var z = 10;

var die1 = 1;
var die2 = 2;
var die1old = 1;
var die2old = 2;

var lastDiceLoad = -1;

var diceShuffling = 10;

var lastBoard = "";

var whosTurn = -1;

function incWhosTurn()
{
  whosTurn = (parseInt(whosTurn)+1)%numPlayers;
}