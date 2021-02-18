var balloon;
var backgroundImg;
var database, height;

function preload() {
  backgroundImg = loadImage("Images/Hot Air Ballon-01.png");
  hotAirBalloon = loadImage("Images/Hot Air Ballon-02.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  balloon = createSprite(250, 650, 50, 50);
  balloon.addImage(hotAirBalloon);
  balloon.scale = 0.5;

  var balloonPosition = database.ref("balloon/height");
  balloonPosition.on("value",readHeight, showError);
}

function draw() {
  background(backgroundImg);  

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 10;
}
  if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x + 10;
}
  if(keyDown(UP_ARROW)){
    balloon.y = balloon.y - 10;
    balloon.scale = balloon.scale - 0.01;
}
  if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y + 10;
    balloon.scale = balloon.scale + 0.01;
}
  drawSprites();
}

function updateHeight(x,y) {
  database.ref("balloon/height").set({
    'x' : height.x + x,
    'y' : height.y + y
  })
}

function readHeight(data) {
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError() {
  console.log("Error in writing to the database");
}