var lock = 0;
var die1 = -1;
var die2 = -1;
var remainingMoves = [];
var dieFaces = ["d1.gif","d2.gif","d3.gif","d4.gif","d5.gif","d6.gif"];

function progress(iterator) {
  if (iterator > 0) {
    var randomdice1=Math.floor(Math.random()*6);
    document.images["die1"].src=dieFaces[randomdice1];
    randomdice=Math.floor(Math.random()*6);
    document.images["die2"].src=dieFaces[randomdice];
    if(die1 == -1) whosTurn = whosTurn + 4;
    die1 = randomdice1 + 1;
    die2 = randomdice + 1;
    setTimeout(function(){progress(iterator-1);}, 10 + 20*(8-iterator));
  }
  else
  {
  if(die1 != die2 || whosTurn == -1)
    whosTurn = (whosTurn + 3) % 4;
    lock = 0;
    possibleMoves = [];
    remainingMoves = [die1, die2, die1+2];
    debug = "Move " + die1 + " and " + die2 + ", or " + (die1+die2);
    redraw();
  }
}

function throwdice(){
  if(lock == 0)
  {
    lock = 1;
    iterator = Math.floor(Math.random()*3 + 5);
    progress(iterator);
  }
}