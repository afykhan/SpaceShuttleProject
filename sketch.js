var INTRO = 1
var PLAY = 0;
var END;
var WIN;
var gameState = INTRO;

var start, start0, start_Img;

var obstacle,obstacle1,obstacle2,obstacle3,obstacleImage, obstacleGroup;

var coin,coinImage,coin0, coinGroup;

var player, playerImage, player0;

var cloud, cloudImage, cloud0, cloudGroup;

var firstaid, firstaidImage, firstaid0, firstaidGroup;

var restart,restartImage, restart0;

var coinSound, coin1;

var collidedSound, collided;

var edges;

var spaceImage, spaceImg, space, moonImage, moonImg, moon;

var score = 20;
var currentHeight = 0;
var cI = 0;

var claimSound, claim;

function preload(){

  obstacleImage = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png");
  
  coinImage = loadImage("coin0.png");
  
  playerImage= loadAnimation("player0.png");
  
  cloudImage = loadImage("cloud0.png");
  
  firstaidImage = loadImage("firstaid0.png");

  restartImage = loadImage("restart0.png");
  
  coinSound = loadSound("coin1.wav");
  
  collided = loadSound("collided.wav");
  
  spaceImage = loadImage("spaceImg.jpg");

  moonImage = loadImage("moonImg.jpg");

  start_Img = loadImage("start.png");

  claimSound = loadSound("claim.wav");

 // bullet_Imag = loadImage("bullet0.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  coin2 = createSprite(width/1.28,height/9.3,20,20);
  coin2.addImage(coinImage);
  coin2.scale = 0.7;

  start0 = createSprite(width/1.87, height/1.23,20,20);
  start0.addImage(start_Img);
  start0.scale = 0.17;
 
   restart = createSprite(width/2.014,height/2.2,20,20);
   restart.addImage(restartImage);
   restart.scale = 0.5
   restart.visible = false;
 
   obstacleGroup = new Group();
   coinGroup = new Group();
   cloudGroup = new Group();
   firstaidGroup = new Group(); 

}

function draw() {
  
  background("cyan");
  
  if(gameState === INTRO){

    background(0);

    strokeWeight(2);
    stroke("0");
    fill("#00cec9");
    textSize(30);
    text("Hello! Welcome to Make it to the Moon Game. You are devoted for a mission to Moon.", width/7,height/4);

    strokeWeight(2);
    stroke("0");
    fill("yellow");
    textSize(30);
    text("Press right and left arrow key to move in the game.", width/3.243,height/3.2);
    text("You can see your health on the top right corner.", width/3.1,height/2.7);
    text("Be safe from the spines. If they will touch you, your health will decrease based on the power of the spines.",width/22,height/2.32);
    text("If your health decreases, don't worry I have left some first aid for you. They will help you in increasing the health.", width/47, height/2);
    text("You will get to see your distance covered increasing on the top left corner when you play the game.", width/12,height/1.77)
    text("Cover 382,500 km to reach on the moon.", width/2.65, height/1.58);
    fill("#00cec9")
    text("Good luck!", width/2.07, height/1.43);

    if(mousePressedOver(start0)){

      gameState = PLAY;
      start0.destroy();

      player = createSprite(width/2,height/1.3,20,20);
      player.addAnimation("airplane",playerImage);
      player.scale = 0.7; 

      player.setCollider("rectangle",0,0,320,250);
      //player.debug = true;    

    }

    }

  if(gameState === PLAY){
    
    currentHeight = currentHeight + Math.round(50);

    //currentHeight = Math.round(currentHeight+frameCount/60);

    if(keyDown("right")){
     player.velocityX = (6 + 3*score/100);
     }
  
  if(keyDown("left")){
     player.velocityX = -(6 + 3*score/100);
  }

  if(currentHeight%500 === 0){
    //player.velocityX += 8;

    if(keyDown("right")){
      player.velocityX = (9 + 5*score/100);
      }
   
   if(keyDown("left")){
      player.velocityX = -(9 + 5*score/100);
   }
 
  }

  edges = createEdgeSprites();
  
  player.bounceOff(edges);

  spawnobstacles();
  spawncoins();
  spawnclouds();
  spawnfirstaid();

    if(coinGroup.isTouching(player)){
      
       coinGroup[0].destroy();
    
       coinSound.play();

      cI += 1;
      
         }
      
    
    if(obstacleGroup.isTouching(player)){      
  
      obstacleGroup[0].destroy();

      collided.play();
      
      score -=1;

    }  

    if(firstaidGroup.isTouching(player) && score < 20){
       
      
      score+=10;
  
      firstaidGroup[0].destroy();

      claimSound.play();
      
    }  

    if(firstaidGroup.isTouching(player) && score > 20){
       
      
      score+=5;
  
      firstaidGroup[0].destroy();

      claimSound.play();
      
    }  

    if(obstacleGroup.isTouching(firstaidGroup)){
       
      firstaidGroup[0].destroy();
    }  

    if(currentHeight ===  1000){

      gameState = WIN;

    }

  }

  if(gameState === WIN){

    win();

    strokeWeight(4);
    stroke("#808e9b");
    fill("#3d3d3d");
    textSize(40);
    text("Hurray! You reached on the moon", width/2-(250),height/3);    

  }

  if(score === 0){

    end();

  }
  
  strokeWeight(5);
  stroke(0);
  fill("#5758BB");
  textSize(30);
  text("Player health : " + score, width/1.3,height/15);
  
  strokeWeight(5);
  stroke(0);
  fill("#5758BB");
  textSize(30);
  text("Current height (in km) : " + currentHeight, width/25,height/15);

  strokeWeight(5);
  stroke(0);
  fill("#5758BB");
  textSize(30);
  text("Cover 382,500 km height to reach on moon", width/25,height/8);

  strokeWeight(5);
  stroke(0);
  fill("#5758BB");
  textSize(30);
  text(": " + cI, width/1.25,height/8.5);

  drawSprites();
 
  }

function spawnobstacles(){
  
  if(frameCount%27 === 0){
     
    obstacle = createSprite(1000,-5,20,20);
    obstacle.addAnimation("falling",obstacleImage);
    obstacle.scale = 0.1;
    
    obstacle.x = Math.round(random(4,width/1.01));
    
    obstacle.velocityY = (8 + 3*score/100);
    
    obstacle.lifetime = 400;
    
    obstacleGroup.add(obstacle);

     }
}


function spawncoins(){
  
  if(frameCount%27 === 0){
     
   coin = createSprite(100,-5,20,20);
   coin.addImage(coinImage);
   coin.scale = 1;

   coin.x = Math.round(random(5,width/1.01));
    
   coin.velocityY = (8 + 3*score/100);
    
   coin.lifetime = 400;
  
   coinGroup.add(coin);

     }
}

function spawnclouds(){
  
  if(frameCount%50 === 0){
     
   cloud = createSprite(650,-5,20,20);
  cloud.addImage(cloudImage);
  cloud.scale = 1;
    
    cloud.x = Math.round(random(6,width/1.01));
    
    cloud.velocityY = (7 + 3*score/100);

    cloud.lifetime = 400;
    
    cloud.depth = player.depth;
    player.depth = player.depth + 1;
  
   cloudGroup.add(cloud);
    
     }
}


function spawnfirstaid(){
  
  if(frameCount%100 === 0){
     
   firstaid = createSprite(650,-5,20,20);
   firstaid.addImage(firstaidImage);
   firstaid.scale = 0.2;
    
    firstaid.x = Math.round(random(1,width/1.01));
    
    firstaid.velocityY = (7 + 3*score/100);

    firstaid.lifetime = 400;
    
    firstaid.depth = player.depth;
    firstaid.depth = player.depth + 1;
  
    firstaidGroup.add(firstaid);
    
     }
  
  }

function reset(){
  gameState = INTRO;

  start0 = createSprite(width/1.9, height/1.36,20,20);
  start0.addImage(start_Img);
  start0.scale = 0.17;

 restart.visible = false;
  
  obstacleGroup.destroyEach();
  coinGroup.destroyEach();
  
  score = 20;
  cI = 0;
  currentHeight = 0;

}

function win(){

  restart.visible = false;

  moon = createSprite(width/2,height/2,20);
  moon.addImage(moonImage);

  player.destroy();
  obstacleGroup.destroyEach();
  coinGroup.destroyEach();
  cloudGroup.destroyEach();
  firstaidGroup.destroyEach();

  background(spaceImage);

}

function end(){

 currentHeight = 0;

  player.velocityX = 0;
  player.velociyY = 0;
  
  player.destroy();
   
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityYEach(0);
    
  coinGroup.setVelocityXEach(0);
  coinGroup.setVelocityYEach(0);
    
  cloudGroup.setVelocityXEach(0);
  cloudGroup.setVelocityYEach(0);

  obstacleGroup.destroyEach();
  coinGroup.destroyEach();
  cloudGroup.destroyEach();
  firstaidGroup.destroyEach();

  restart.visible = true;

  if(mousePressedOver(restart)) {
    reset();
  }

  
  strokeWeight(5);
  stroke(0);
  fill("yellow");
  textSize(30);
  text("Oops! Your Space Shuttle is Destroyed!! Try Again to Make it to the Moon!",width/5,height/2.5);

}