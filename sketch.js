var backgroundImage,background1;
var player, player_running;
var ground,groundImage;
var FoodGroup, bananaImage;
var obstaclesGroup, obstacleImage;
var gameOver;
var score=0;

function preload(){
  backgroundImage=loadImage("Monkey go happy files/jungle.jpg");
  player_running = loadAnimation("Monkey go happy files/Monkey_01.png","Monkey go happy files/Monkey_02.png","Monkey go happy files/Monkey_03.png","Monkey go happy files/Monkey_04.png","Monkey go happy files/Monkey_05.png","Monkey go happy files/Monkey_06.png","Monkey go happy files/Monkey_07.png","Monkey go happy files/Monkey_08.png","Monkey go happy files/Monkey_09.png","Monkey go happy files/Monkey_10.png");
  
  bananaImage = loadImage("Monkey go happy files/banana.png");
  obstacleImg = loadImage("Monkey go happy files/stone.png"); 
}

function setup() {
  createCanvas(600,400);
  
  background1=createSprite(0,0,600,400);
  background1.addImage(backgroundImage);
  background1.scale=1.5;
  background1.x=background1.width/2;
  background1.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,600,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(background1.x<100){
    background1.x=background1.width/2;
  }
  
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
  
    switch(score){
          case 10: player.scale=0.12;
                  break;
          case 20: player.scale=0.14;
                  break;
          case 30: player.scale=0.16;
                  break;
          case 40: player.scale=0.18;
                  break;
          default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -10;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400,50);
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImg);    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}