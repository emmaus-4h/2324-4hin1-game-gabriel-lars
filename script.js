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
var spelStatus = SPELEN;
const KEY_LEFT = 37;

var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler
var health = 1;  // health van speler

var vijandX = 200;
var vijandY = 200;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  console.log("beweeg")
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
}
// vijand

// kogel


/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand
  if (spelerX - vijandX < 50 &&
      spelerX - vijandX > -50 &&
      spelerY - vijandY < 50 &&
      spelerY - vijandY > -50) {
        console.log("botsing")
        health = health -1;
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
  rect(175, 175, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 50, 50);
  // kogel

  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

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
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (health <=0) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    //console.log("gameover");
     spelerX = 600;
     spelerY = 600;
     text("game over", 200, 200)
  
  }
  
  if (spelStatus === UITLEG) {
    // teken game-over scherm
  }

}
