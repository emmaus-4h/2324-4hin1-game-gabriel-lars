/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" //

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 8;
var spelStatus = UITLEG;
const KEY_LEFT = 37;
var aantal;
var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van spelersd
var health = 1;  // health van speler

var spelerleven
var Vijandleven
var tekenvijand = true;
var teken_nieuwevijand

var kogelX = 400;
var kogelY = 300;
var kogelVliegt = false;


var vijandX = 200;
var vijandY = 200;
var health_vijand = 1;
var speedY = 4;
var speedX = 4;

var score = 0



var punten = +1;

function reset() {
  score = score

}

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  //a
  if (keyIsDown(65)) {
    spelerX = spelerX - 5;

  }

  //s
  if (keyIsDown(83)) {
    spelerY = spelerY + 5;
  }

  //d
  if (keyIsDown(68)) {
    spelerX = spelerX + 5;
  }

  //w
  if (keyIsDown(87)) {
    spelerY = spelerY - 5;
  }
  // vijand
  vijandX = vijandX + speedX;
  vijandY = vijandY + speedY;

  if (vijandX > spelerX) {
    speedX = -3, 5;
  }

  if (vijandX < spelerX) {
    speedX = 3, 5;
  }

  if (vijandY > spelerY) {
    speedY = -3, 5;
  }

  if (vijandY < spelerY) {
    speedY = 3, 5;
  }

  //sjkdfhweuihdbkjhsdiusdjkbjdks
  if (teken_nieuwevijand) {

    if (vijandX > spelerX) {
      speedX = -4, 5;
    }

    if (vijandX < spelerX) {
      speedX = 4, 5;
    }

    if (vijandY > spelerY) {
      speedY = -4, 5;
    }

    if (vijandY < spelerY) {
      speedY = 4, 5;
    }

  }
  // speler mag niet buiten de randen van het canvas
  if (spelerX < 25) {
    spelerX = 25;
  }
  if (spelerX > 1255) {
    spelerX = 1255;
  }
  if (spelerY < 25) {
    spelerY = 25;
  }
  if (spelerY > 720 - 25) {
    spelerY = 720 - 25;
  }

  // kogel

  if (kogelVliegt === false && keyIsDown(74)) {
    kogelVliegt = true
    kogelX = spelerX;
    kogelY = spelerY;
  }
  if (kogelVliegt === true) {
    kogelX = kogelX + 7;
  }

  if (kogelVliegt === true &&
    kogelX > 1400) {
    kogelVliegt = false;
  }

  if (kogelVliegt === true &&
    vijandX - kogelX < 26 &&
    kogelX - vijandX < 26 &&
    vijandY - kogelY < 26 &&
    kogelY - vijandY < 26) {

    Vijandleven = false;

    kogelVliegt = false;


  }



  if (kogelVliegt === false && keyIsDown(32)) { // start kogel schieten
    kogelVliegt = true;
    kogelY = spelerY;
    kogelX = spelerX;
  }


  if (kogelVliegt === true) { // kogel vliegt
    kogelY = kogelY - 8;
  }


  if (kogelVliegt === true && kogelY < -10) { // kogel stopt met vliegen
    kogelVliegt = false;

  }

  var kogelisRaak = kogelRaak();
}



/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand
  if (spelerX - vijandX < 50 &&
    spelerX - vijandX > -50 &&
    spelerY - vijandY < 50 && // was allemaal 50
    spelerY - vijandY > -50) {
    console.log("botsing")
    health = health - 1;
    spelerleven = false;
    return true;
  }
}
// botsing kogel tegen vijand
var kogelRaak = function() {
  if (kogelX - vijandX < 35 &&
    kogelX - vijandX > -35 &&
    kogelY - vijandY < 35 &&  // was allemaal 50
    kogelY - vijandY > -35) {
    console.log("kogel raak")
    // health_vijand = health_vijand - 1;
    // tekenvijand = false;
    // Vijandleven = false;
    vijandX = 0;
    vijandY = 0;

    return vijandX, vijandY, 80, 100;

  }
  {

  }


  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');

  // vijand


  if (tekenvijand === true) {
    fill("black");
    rect(vijandX - 25, vijandY - 25, 50, 50);
    fill("yellow");
    ellipse(vijandX, vijandY, 5, 5);
  }
  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

  // kogel

  fill("white");
  ellipse(kogelX, kogelY, 20, 20);



  // punten en health
  if (spelStatus === SPELEN) {
    reset();
    score = score + 1;
    text(score, 50, 100)
    //gameover scherm
    setTimeout(() => { location.reload() }, 1000);


  }
  if (spelerleven === false) {
    score = 0;

  }
  {
    spelStatus = SPELEN
  };








};


/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    console.log("spelen")
    health = +1;
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (health <= 0) {
      spelStatus = GAMEOVER;
    }
  }
  
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    //console.log("gameover");
    console.log("gameover")
    vijandX = -100;
    vijandY = -100;
    spelerX = 600;
    spelerY = 600;
    textSize(125);
    text("game over", 350, 300)
    textSize(50);
    text("je word doorgestuurd voor de volgende ronde", 150, 400)
    if (keyIsDown(13)) {
      spelStatus = SPELEN;
    }
  }



  if (spelStatus === UITLEG) {
    console.log("UITLEG")
    background("blue");
    fill("white");
    textSize(60)
    text("ontwijk de vijand met W A S D", 250, 250);
    text("druk op enter om te spelen", 300, 330);
    text("schiet met spatie", 400, 410)
    if (keyIsDown(13)) {
      spelStatus = SPELEN;
      // enter voor spelen
    }

    // teken game-over scherm
    // klik op enter voor restart
  }

}
