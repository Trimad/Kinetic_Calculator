/*
Pink
255,106,213

Pink-Purple
199,116,232

Light Purple
173,140,255

Purple-Blue
135,149,232

//Light Blue
148,208,255
*/

var input;
var input2;
var dropdown;

var rootNumeral;
var bitwise;
var add;
var sub;

var firstDegreeNumerals = [];
var firstDegreeNum = 3;
var firstDegreeRadius = 200;

var addNumerals = [];
var addNumeralsNum = 6;
var addNumeralsRadius = 320;

var subNumerals = [];
var subNumeralsNum = 6;
var subNumeralsRadius = 320;

var img;

function preload() {
  img = loadImage("bg.jpg");

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}

function setup() {

  createCanvas(windowWidth, windowHeight);

  //Make root node and input

  rootNumeral = new Numeral(width / 2, height / 2, 0, "root");

  input = createInput();
  input.position(rootNumeral.x - (rootNumeral.size / 2) + (rootNumeral.size / 8), rootNumeral.y - 20);
  input.changed(callback);

  input2 = createInput();
  input2.position(rootNumeral.x - (rootNumeral.size / 2) + (rootNumeral.size / 8), rootNumeral.y + 20);
  input2.changed(callback);

  //Make first degree numerals

  for (let i = 0; i < firstDegreeNum; i++) {

    let xPositioned1 = (width / 2 + firstDegreeRadius * Math.cos(1.5 * Math.PI * i / firstDegreeNum));
    let yPositioned1 = (height / 2 + firstDegreeRadius * Math.sin(1.5 * Math.PI * i / firstDegreeNum));

    switch (i) {
      case 0:
        firstDegreeNumerals[i] = new Numeral(xPositioned1, yPositioned1, firstDegreeRadius, rootNumeral, "add");
        break;
      case 1:
        firstDegreeNumerals[i] = new Numeral(xPositioned1, yPositioned1, firstDegreeRadius, rootNumeral, "bitwise");
        break;
      case 2:
        firstDegreeNumerals[i] = new Numeral(xPositioned1, yPositioned1, firstDegreeRadius, rootNumeral, "sub");
        break;

    }

  }

  for (let i = 0; i < addNumeralsNum; i++) {

    let xPositioned = (firstDegreeNumerals[0].x + addNumeralsRadius * Math.cos(5 + (Math.PI) * i / addNumeralsNum));
    let yPositioned = (firstDegreeNumerals[0].y + addNumeralsRadius * Math.sin(5 + (Math.PI) * i / addNumeralsNum));

    switch (i) {
      case 0:
        addNumerals[i] = new Numeral(xPositioned, yPositioned, addNumeralsRadius, firstDegreeNumerals[0], "bin2dec");
        break;
      case 1:
        addNumerals[i] = new Numeral(xPositioned, yPositioned, addNumeralsRadius, firstDegreeNumerals[0], "bin2hex");
        break;
      case 2:
        addNumerals[i] = new Numeral(xPositioned, yPositioned, addNumeralsRadius, firstDegreeNumerals[0], "dec2bin");
        break;
      case 3:
        addNumerals[i] = new Numeral(xPositioned, yPositioned, addNumeralsRadius, firstDegreeNumerals[0], "dec2hex");
        break;
      case 4:
        addNumerals[i] = new Numeral(xPositioned, yPositioned, addNumeralsRadius, firstDegreeNumerals[0], "hex2bin");
        break;
      case 5:
        addNumerals[i] = new Numeral(xPositioned, yPositioned, addNumeralsRadius, firstDegreeNumerals[0], "hex2dec");
        break;
    }
  }

  for (let i = 0; i < subNumeralsNum; i++) {

    let xPositioned = (firstDegreeNumerals[2].x + subNumeralsRadius * Math.cos(-4.5 + Math.PI * i / subNumeralsNum));
    let yPositioned = (firstDegreeNumerals[2].y + subNumeralsRadius * Math.sin(-4.5 + Math.PI * i / subNumeralsNum));

    switch (i) {
      case 0:
        subNumerals[i] = new Numeral(xPositioned, yPositioned, subNumeralsRadius, firstDegreeNumerals[2], "bin2dec");
        break;
      case 1:
        subNumerals[i] = new Numeral(xPositioned, yPositioned, subNumeralsRadius, firstDegreeNumerals[2], "bin2hex");
        break;
      case 2:
        subNumerals[i] = new Numeral(xPositioned, yPositioned, subNumeralsRadius, firstDegreeNumerals[2], "dec2bin");
        break;
      case 3:
        subNumerals[i] = new Numeral(xPositioned, yPositioned, subNumeralsRadius, firstDegreeNumerals[2], "dec2hex");
        break;
      case 4:
        subNumerals[i] = new Numeral(xPositioned, yPositioned, subNumeralsRadius, firstDegreeNumerals[2], "hex2bin");
        break;
      case 5:
        subNumerals[i] = new Numeral(xPositioned, yPositioned, subNumeralsRadius, firstDegreeNumerals[2], "hex2dec");
        break;
    }
  }

}

function draw() {

  background(img, 0, 0);
  textSize(18);
  strokeWeight(1);
  stroke(255);
  textAlign(LEFT, TOP);
  text("Input:", 20, 20);



  for (let i = 0; i < addNumeralsNum; i++) {

    addNumerals[i].drawSpring();
    addNumerals[i].display(+input.value() + +input2.value());
    //addNumerals[i].update();

  }

  for (let i = 0; i < subNumeralsNum; i++) {

    subNumerals[i].drawSpring();
    subNumerals[i].display(+input.value() - +input2.value());
    //subNumerals[i].update();

  }

  for (let i = 0; i < firstDegreeNum; i++) {

    firstDegreeNumerals[i].drawSpring();
    firstDegreeNumerals[i].display(input.value());
    //firstDegreeNumerals[i].update();

  }

  rootNumeral.display();
  
}

function mousePressed() {

}

function mouseReleased() {

}

function callback() {

}