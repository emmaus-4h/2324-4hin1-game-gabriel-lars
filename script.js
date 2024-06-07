/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 8;
var spelStatus = UITLEG;
const KEY_LEFT = 37;

var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler
var health = 1;  // health van speler

var kogelX = 400;
var kogelY = 300;
var kogelVliegt = false;

var vijandX = 200;
var vijandY = 200;
var health_vijand = 1;
var speed = 4;

var punten = +1;
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
  vijandX = vijandX + speed;
  
  if (vijandX > spelerX) {
    speed = -3,5;
  }
  if (vijandX < spelerX) {
    speed = 3,5;
  }

  // kogel
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
    return true;
  }
  // botsing kogel tegen vijand

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

  fill("black");
  rect(vijandX-25, vijandY-25, 50, 50);
  fill("yellow");
  ellipse(vijandX, vijandY, 5, 5);




  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

  // kogel

  fill("white");
  ellipse(kogelX, kogelY, 20, 20);

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

  // punten en health

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
    spelerX = 600;
    spelerY = 600;
    textSize(125);
    text("game over", 350, 300)
    textSize(75);
    text("druk op enter voor start", 275, 450);
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
    text("schiet met spatie", 400,410)
    if (keyIsDown(13)) {
      spelStatus = SPELEN;
      // enter voor spelen
    }

    // teken game-over scherm
    // klik op enter voor restart
  }

}
