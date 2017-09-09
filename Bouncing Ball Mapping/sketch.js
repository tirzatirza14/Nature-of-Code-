//Alberta, Tirza
//Ball will turn black when it's on the right side of the screen
//The colour of the background will turn white when the ball is on the right side 
// of the screen

var x, y, xSpeed, ySpeed;

function setup(){
  createCanvas(500,500);
  x = width/2;
  y = height/2;
  xSpeed = random(10);
  ySpeed = random(10); 
}

function draw(){
  col = map(x, 0, 500, 0, 255);
  background(col,20);
  
  //update 
  x += xSpeed;
  y += ySpeed; 
  
  //check 
  if (x<0 || x>width-30){
    xSpeed = xSpeed*-1;
  }
  
  if (y<0 || y>height-30){
  ySpeed = ySpeed*-1;
  }
  
  //display
  noStroke();
  colOpp = map(x, 0, 500, 255, 0);
  fill(colOpp);
  ellipse(x, y, 60, 60); 
  
}

function keyPressed(){
  
}