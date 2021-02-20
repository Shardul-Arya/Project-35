var Balloon, balloonImage
var database, position

var backgr0und, backgroundImage

function preload() {
  backgroundImage = loadImage("images/Hot Air Ballon-01.png");
  balloonImage = loadAnimation("images/Hot Air Ballon-02.png", "images/Hot Air Ballon-03.png", "images/Hot Air Ballon-04.png");
}

function setup() {
  database = firebase.database();
  createCanvas(925,600);

  database.ref('Balloon/position').update({
    'x' : 80, 
    'y' : 415
  })

  var balloonPosition = database.ref("Balloon/position");
  balloonPosition.on ("value", readPosition, showError);

  backgr0und = createSprite(463, 300, 500, 500);
  backgr0und.addImage(backgroundImage)
  backgr0und.scale=0.37

  Balloon = createSprite(80,415,30,30);
  Balloon.addAnimation("cat", balloonImage);
  Balloon.scale = 0.5

  console.log(database)
}

function draw() {
  background(255,255,255);  
  
  backgr0und.depth = backgr0und.depth-100

  if(keyDown(LEFT_ARROW)){
    changePosition(-5,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    changePosition(5,0);
  }
  else if(keyDown(UP_ARROW)){
    changePosition(0,-5);
    Balloon.scale = Balloon.scale - 0.004
  }
  else if(keyDown(DOWN_ARROW)){
    changePosition(0,+5);
    Balloon.scale = Balloon.scale + 0.004
  }
  
  drawSprites();

  textSize(40);
  fill("black");
  text("**Use arrow keys to move hot air balloon", 50, 30);
}

function readPosition(data) {
  position = data.val();
  Balloon.x = position.x;
  Balloon.y = position.y;
  
}

function changePosition(x,y){
  database.ref("Balloon/position").set({
      'x': position.x + x ,
      'y': position.y + y
  })
}

function showError() {
  console.log("Error in writing to the database");
}