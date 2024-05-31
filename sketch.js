let isButtonRight = false;
let make = null;
let root = null;
let makeSize = null;
var bubbles = [];
var c1, c2;
var song;
var sliderVolume;
var sliderPan;
var sliderRate;
var button;

function setup() {
 root = createDiv();
 createCanvas(500, 300).parent(root).id('js-canvas');
 makeSize = createVector(40, 40);
 rectMode(CENTER);
 song = loadSound("잘자요 아가씨 (Prod. 과나).mp3",loaded);

  //button
  button = createButton("play");
  button.mouseClicked(togglePlaying);
  button.position(450, 279);
  button.size(50);
  
  //slider
  //volume
  sliderVolume = createSlider(0,1,0.5,0.01);
  sliderVolume.position(0, 15);
  sliderVolume.size(125);
  sliderVolume.style('')
  //rate
  sliderRate = createSlider(0,3,1,0.01);
  sliderRate.position(0, 45);
  sliderRate.size(125);
}

function loaded(){
 song.loop();
}

function togglePlaying(){
  if(!song.isPlaying()){
    song.loop();
    button.html("pause");
  }else{
    song.pause();
    button.html("play")
  }
}

function draw() {
 noStroke();
 background('#1EDCFA');
 angleMode(RADIANS);
 drawFace();
 
  //volume
  song.setVolume(sliderVolume.value());
  fill('#000000')
  text("volume"+sliderVolume.value(),2, 14);
  //rate
  song.rate(sliderRate.value());
  text("rate"+sliderRate.value(),2, 44);
}

function drawFace(){
 //頭
 fill(255,221,202);
 circle(250,140,160);
 
 //耳朵
 circle(175,150,30);
 circle(325,150,30);
 
 //劉海
 fill(0);
 arc(250, 120, 170, 140, PI, 2*PI, HALF_PI);
 
 //眼鏡
 fill('#E0E0E0');
 strokeWeight(0.1);
 stroke('BLACK')
 quad(194,175,194,134,236,134,236,175);
 quad(306,175,306,134,264,134,264,175);
 line(236,154.5,264,154.5);
 fill('000000')
 strokeWeight(1.2);
 line(330,150,330,175);
 strokeWeight(3);
 line(330,175,330,200);
 line(320,185,340,185);

 //眉毛
 stroke(0);
 noFill();
 strokeWeight(3); 
 arc(215,130,30,10,PI,0);
 arc(285,130,30,10,PI,0);
 
 //鼻子
 stroke('orange');
 strokeWeight(5);
 point(250,175);
 
 //眼睛
 noStroke();
 moveeyes();

 //嘴巴
 moveMouth();
}

//動態嘴巴
function moveMouth(){
 var movex=abs(mouseX-250)/250*20; 
 fill(209,51,26);
 noStroke();
 square(250,200, movex, 10);
}

//動態眼睛
function moveeyes(){
 var movex=(mouseX-250)/250*7.5;
 var movey=(mouseY-150)/350*7.5;
 
 fill(255);  
 circle(215,155,35);
 circle(285,155,35);
 fill(0);
 circle(215+movex,155+movey,20);
 circle(285+movex,155+movey,20);

//氣泡
 if(mouseIsPressed){
 if(mouseButton === LEFT){
 CreateBubbles(2);
 isButtonRight = false;
  }
 }

 c1 = color(60, 195, 255, 1);
 c2 = color(0, 100, 200, 10);
 colorMode(RGB, 255, 255, 255, 1);
 for (var i = 0; i <= 400; i++) {
 line(0, i, 600, i);
 }
 BubblesRise();
}

function Bubble(xloc, yloc, zloc, rise, rad) {
 this.xloc = xloc;
 this.yloc = yloc;
 this.zloc = zloc;
 this.rad = rad;
 this.rise = rise;
}

function CreateBubbles(count) {
 for (i = 0; i < count; i++) {
 var x = mouseX;
 var y = mouseY;
 var z = random(0.3, 0.75);
 var r = map(z, 0.3, 0.7, 7, 23);
 var rise = map(z, 0.3, 0.7, 0.7, 1.7);
 var b = new Bubble(x, y, z, rise, r);
 bubbles.push(b);
 }
}
 
function BubblesRise() {
 var c = lerpColor(c1, c2,0.7);
 stroke(c);
 for (i = 0; i < bubbles.length; i++) {
 var x = bubbles[i].xloc;
 var y = bubbles[i].yloc;
 var z = bubbles[i].zloc;
 var r = bubbles[i].rad;
 fill(255, 255, 255, z);
 ellipse(x, y, r, r);
 }
 for (i = 0; i < bubbles.length; i++) {
 var x = bubbles[i].rise; 
 bubbles[i].yloc -= x;
 var zmin = bubbles[i].zloc * -7.0;
 var zmax = bubbles[i].zloc * 7.0;
 var slowy = bubbles[i].yloc* 0.08;
 bubbles[i].xloc += map(cos(slowy), -1, 1, zmin, zmax)
 }
}