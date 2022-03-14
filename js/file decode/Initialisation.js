const container = document.getElementById("inside-changer");
const section = document.createElement("Section");
const question = document.getElementsByClassName("question")[0];
const questionGerne = document.getElementById("question-gerne");
const fragenAnzeige = document.getElementById("fragen-anzeige");
const upperText = document.getElementById("upper-Text");

var allButtons;
var targetVal;
var button1; 
var button2; 
var button3;  
var button4;   

var punkte = document.getElementById("punkte");
var fragencount = document.getElementById("fragenCount");
var score = 0;
var fragencounter = 0;
var dif = "leicht";
var sortedByDif;