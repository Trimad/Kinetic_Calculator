function Numeral(x, y, radius, root, type) {

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.root = root;
  this.type = type;

  this.staticX = x;
  this.staticY = y;

  this.size = 180;
  this.numValue;

  this.over = false;
  this.move = false;

  // Spring simulation constants 
  this.mass = 4.0; // Mass 
  this.k = 0.1; // Spring constant
  this.damp = 0.5; // Damping 
  this.rest_posx = this.x; // Rest position X 
  this.rest_posy = this.y; // Rest position Y 

  // Spring simulation variables 
  this.velx = 0.0; // X Velocity 
  this.vely = 0.0; // Y Velocity 
  this.accel = 0; // Acceleration 
  this.force = 0; // Force 

  this.display = function(passedText) {

    strokeWeight(10);
    stroke(173, 140, 255);

    for (var i = 0; i < 10; i++) {
      if (this.over) {
        fill(148, 208, 255);
      } else {
        fill(135, 149, 232);
      }

      ellipse(this.x, this.y, this.size, this.size);
    }
    fill(255);
    textAlign(CENTER, CENTER);

    noStroke();
    switch (type) {
      case "root":
        text(passedText, this.x, this.y);
        break;
      case "add":
        text("ADD", this.x, this.y);
        break;
      case "sub":
        text("SUB", this.x, this.y);
        break;
      case "bitwise":
        text("BITWISE", this.x, this.y);
        break;
      case "bin2dec":
        textSize(18);
        text("binary to decimal", this.x, this.y - 15);
        var num = ConvertBase(passedText).from(2).to(10);
        fill(255);
        textSize(16);
        text(num, this.x, this.y + 15);
        break;
      case "bin2hex":
        textSize(18);
        text("binary to hexadecimal", this.x, this.y - 15);
        var num = ConvertBase(passedText).from(2).to(16);
        textSize(16);
        text(num, this.x, this.y + 15);
        break;
      case "dec2bin":
        textSize(18);
        text("decimal to binary", this.x, this.y - 15);
        var num = ConvertBase(passedText).from(10).to(2);
        textSize(16);
        text(num, this.x, this.y + 15);
        break;
      case "dec2hex":
        textSize(18);
        text("decimal to hexadecimal", this.x, this.y - 15);
        var num = ConvertBase(passedText).from(10).to(16);
        textSize(16);
        text(num, this.x, this.y + 15);
        break;
      case "hex2bin":
        textSize(18);
        text("hexadecimal to binary", this.x, this.y - 15);
        var num = ConvertBase(passedText).from(16).to(2);
        textSize(16);
        text(num, this.x, this.y + 15);
        break;
      case "hex2dec":
        textSize(18);
        text("hexadecimal to decimal", this.x, this.y - 15);
        var num = ConvertBase(passedText).from(16).to(10);
        textSize(16);
        text(num, this.x, this.y + 15);
        break;

    }

  }

  this.drawSpring = function() {
    var distance = dist(this.x, this.y, this.root.x, this.root.y);

    var m = map(distance, 1, this.radius, this.size, 5);
    strokeWeight(m);
    stroke(173, 140, 255);
    line(this.x, this.y, this.root.x, this.root.y);

  }

  // Test to see if mouse is over this spring
  this.overEvent = function() {
    var disX = this.x - mouseX;
    var disY = this.y - mouseY;
    var dis = createVector(disX, disY);
    if (dis.mag() < this.size / 2) {
      return true;
    } else {
      return false;
    }
  }

  this.pressed = function() {
    if (this.over) {
      this.move = true;
    } else {
      this.move = false;
    }
  }

  this.released = function() {

    this.move = false;
    this.rest_posx = this.staticX;
    this.rest_posy = this.staticY;

  }

  this.update = function() {

    if (this.move) {
      this.rest_posy = mouseY;
      this.rest_posx = mouseX;
    }

    this.force = -this.k * (this.y - this.rest_posy); // f=-ky 
    this.accel = this.force / this.mass; // Set the acceleration, f=ma == a=f/m 
    this.vely = this.damp * (this.vely + this.accel); // Set the velocity 
    this.y = this.y + this.vely; // Updated position 


    this.force = -this.k * (this.x - this.rest_posx); // f=-ky 
    this.accel = this.force / this.mass; // Set the acceleration, f=ma == a=f/m 
    this.velx = this.damp * (this.velx + this.accel); // Set the velocity 
    this.x = this.x + this.velx; // Updated position 


    if ((this.overEvent() || this.move)) {
      this.over = true;
    } else {
      this.over = false;
    }

  }

}

var ConvertBase = function(num) {
  return {
    from: function(baseFrom) {
      return {
        to: function(baseTo) {
          return parseInt(num, baseFrom).toString(baseTo);
        }
      };
    }
  };
};