var player;
var orbs;
var rand
var map;
var score = 0;

function preload(){
  mapIMG = loadImage("map.jpg")
  greenIMG = loadImage("green.png");
  redIMG = loadImage("red.png");
  pinkIMG = loadImage("pink.png");
  blueIMG = loadImage("blue.png");
  whiteIMG = loadImage("white.png");
  yellowIMG = loadImage("yellow.png");
  indigoIMG = loadImage("indigo.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  database = firebase.database();
  gameState = 0;
  playerCount = 0;
  game = new Game();
  game.getState();
  game.start();

  imageMode(CENTER);
  rectMode(CENTER);
  orbs1 = new Group();
  orbs2 = [greenIMG, redIMG, pinkIMG, blueIMG, whiteIMG, yellowIMG, indigoIMG];
  player = createSprite(displayWidth/2, displayHeight/2, 30, 30);
}

function draw() {
  background("brown"); 

if(playerCount === 10){
  game.update(state);
} 
if(gameState===1){
    game.play();
} 
if(gameState===2){
    game.end();
}

if(gameState === 1){
  randOrbs(); 
  camera.x = player.x;
  camera.y = player.y

  if(keyIsDown(UP_ARROW)){
    player.y = player.y-3;
  } else{
    player.y = player.y;
  }

  if(keyIsDown(DOWN_ARROW)){
    player.y = player.y+3;
  } else{
    player.y = player.y;
  }

  if(keyIsDown(LEFT_ARROW)){
    player.x = player.x-3;
  } else{
    player.x = player.x;
  }

  if(keyIsDown(RIGHT_ARROW)){
    player.x = player.x+3;
  } else{
    player.x = player.x;
  }

  if(player.isTouching(orbs1)){
    orbs1[0].destroy();
    score = score+1;
    
  }
  drawSprites();
  text("Score: " + score, player.x, player.y);
}
}

function randOrbs(){
  if(frameCount % 10 === 0){
    orbs = createSprite(10, 10, 10 ,10);
    orbs.shapeColor = "lightgreen"
    var rand = Math.round(random(1,7));

    if(rand == 1){
      orbs.addAnimation("redIMG", redIMG)
      orbs.scale = (random(0.2, 0.4))
    } else if(rand == 2){
      orbs.addAnimation("yellowIMG", yellowIMG)
      orbs.scale = (random(0.2, 0.4))
    } else if(rand == 3){
      orbs.addAnimation("greenIMG", greenIMG)
      orbs.scale = (random(0.2, 0.4))
    } else if(rand == 4){
      orbs.addAnimation("blueIMG", blueIMG)
      orbs.scale = (random(0.2, 0.4))
    } else if(rand == 5){
      orbs.addAnimation("indigoIMG", indigoIMG)
      orbs.scale = (random(0.2, 0.4))
    } else if(rand == 6){
      orbs.addAnimation("pinkIMG", pinkIMG)
      orbs.scale = (random(0.2, 0.4))
    } else if(rand == 7){
      orbs.addAnimation("whiteIMG", whiteIMG)
      orbs.scale = (random(0.2, 0.4))
    }
    orbs.x = Math.round(random(displayWidth-displayWidth-400, displayWidth+displayWidth+400));
    orbs.y = Math.round(random(displayHeight-displayHeight-250, displayHeight+displayHeight+250))
    orbs1.add(orbs);
  }
}