var player;
var enemy,enemy2;
var rand;
var rand2;
var topM,bottom,left,right;
var enemy_img,enemy2_img;
var player_img;
var gameStateMain,gameState1,gameState2,gameState3,gameState4;
var bullet1,bullet2,bullet3,bullet4;
var b1_img,b2_img,b3_img,b4_img;
var enemy1Group,enemy2Group,enemy3Group,enemy4Group;
var health;
var score;
var highScore;
var enemyHealth;

function preload(){
  enemy_img = loadImage("zombie.png");
  enemy2_img = loadImage("zombie2.png");
  player_img = loadImage("player.png");
  b1_img = loadImage("bl1.png");
  b2_img = loadImage("bl2.png");
  b3_img = loadImage("bl3.png");
  b4_img = loadImage("bl4.png");
  }

function setup(){

  createCanvas(displayWidth,displayHeight);
  
  player = createSprite(displayWidth/2,displayHeight/2,30,30);

  rand2 = random(2,5);

  topM = createSprite(displayWidth/2,15,displayWidth,5);

  bottom = createSprite(displayWidth/2,displayHeight,displayWidth,5);

  left = createSprite(0,displayHeight/2,5,displayHeight);

  right = createSprite(displayWidth,displayHeight/2,5,displayHeight);

  gameStateMain = 0;
  gameState1 = 0;
  gameState2 = 0;
  gameState3 = 0;
  gameState4 = 0;

  bullet1 = createSprite(player.x,player.y,1,1);
  bullet2 = createSprite(player.x,player.y,1,1);
  bullet3 = createSprite(player.x,player.y,1,1);
  bullet4 = createSprite(player.x,player.y,1,1);

  bullet1.addImage("bullet1",b1_img);
  bullet2.addImage("bullet2",b2_img);
  bullet3.addImage("bullet3",b3_img);
  bullet4.addImage("bullet4",b4_img);

  bullet1.setCollider("circle");
  bullet2.setCollider("circle");
  bullet3.setCollider("circle");
  bullet4.setCollider("circle");

  bullet1.visible = false;
  bullet2.visible = false;
  bullet3.visible = false;
  bullet4.visible = false;
  
  player.addImage("player",player_img);

  enemy1Group = new Group();
  enemy2Group = new Group();
  enemy3Group = new Group();
  enemy4Group = new Group();

  health = 100;

  score = 0;
  highScore = 0;
}

function draw() {
  background(0,0,0);

fill("yellow");

  if(gameStateMain === 0){
    fill("yellow");

    text("PRESS 'W' TO SHOOT UP",displayWidth/2+50,displayHeight/2);
    text("PRESS 'S' TO SHOOT DOWN",displayWidth/2+50,displayHeight/2+30);
    text("PRESS 'A' TO SHOOT LEFT",displayWidth/2+50,displayHeight/2+60);
    text("PRESS 'D' TO SHOOT RIGHT",displayWidth/2+50,displayHeight/2+90);

    fill("red");
    text("PRESS SPACE TO START",displayWidth/2,displayHeight/2-150);
    enemy1Group.destroyEach();
    enemy2Group.destroyEach();
    enemy3Group.destroyEach();
    enemy4Group.destroyEach();
  }

  if(gameStateMain === 0 && keyWentDown("space")){
    gameStateMain = 1;
  }

  if(gameStateMain === 1){
  if(keyWentDown("UP_ARROW")){
    player.velocityY += -5;
  }

  if(keyWentUp("UP_ARROW")){
    player.velocityY = 0;
  }

  if(keyWentDown("DOWN_ARROW")){
    player.velocityY += 5;
  }

  if(keyWentUp("DOWN_ARROW")){
    player.velocityY = 0;
  }

  if(keyWentDown("LEFT_ARROW")){
    player.velocityX += -5;
  }

  if(keyWentUp("LEFT_ARROW")){
    player.velocityX = 0;
  }

  if(keyWentDown("RIGHT_ARROW")){
    player.velocityX += 5;
  }

  if(keyWentUp("RIGHT_ARROW")){
    player.velocityX = 0;
  }

  if(player.x<0 || player.x>displayWidth || player.y<0 || player.y>displayHeight){
    player.velocityX = 0;
    player.velocityY = 0;
  }

  if(player.x<0 && keyWentDown("RIGHT_ARROW")){
    player.velocityX += 5;
  }

  if(player.x>displayWidth && keyWentDown("LEFT_ARROW")){
    player.velocityX += -5;
  }

  if(player.y<0 && keyWentDown("DOWN_ARROW")){
    player.velocityY += 5;
  }

  if(player.y>displayHeight && keyWentDown("UP_ARROW")){
    player.velocityY += -5;
  }

  if(keyWentDown("w") && gameState1 === 0){
    bullet1.x = player.x;
    bullet1.y = player.y;
    bullet1.velocityY = -10;
    gameState1 = 1;
    bullet1.visible = true;
  }

  if(keyWentDown("a") && gameState2 === 0){
    bullet2.x = player.x;
    bullet2.y = player.y;
    bullet2.velocityX = -10;
    gameState2 = 1;
    bullet2.visible = true;
  }

  if(keyWentDown("d") && gameState3 === 0){
    bullet3.x = player.x;
    bullet3.y = player.y;
    bullet3.velocityX = 10;
    gameState3 = 1;
    bullet3.visible = true;
  }

  if(keyWentDown("s") && gameState4 === 0){
    bullet4.x = player.x;
    bullet4.y = player.y;
    bullet4.velocityY = 10;
    gameState4 = 1;
    bullet4.visible = true;
  }

  if(bullet1.y<0){
    gameState1 = 0;
  }

  if(bullet2.x<0){
    gameState2 = 0;
  }

  if(bullet3.x>displayWidth){
    gameState3 = 0;
  }

  if(bullet4.y>displayHeight){
    gameState4 = 0;
  }

  if(bullet1.isTouching(enemy1Group) || bullet2.isTouching(enemy1Group) || bullet3.isTouching(enemy1Group) || bullet4.isTouching(enemy1Group)){
    enemy1Group.destroyEach();
    score = score+5;
  }

  if(bullet1.isTouching(enemy2Group) || bullet2.isTouching(enemy2Group) || bullet3.isTouching(enemy2Group) || bullet4.isTouching(enemy2Group)){
    enemy2Group.destroyEach();
    score = score+5;
  }

  if(bullet1.isTouching(enemy3Group) || bullet2.isTouching(enemy3Group) || bullet3.isTouching(enemy3Group) || bullet4.isTouching(enemy3Group)){
  enemy3Group.destroyEach();
  score = score+10;
  }

  if(bullet1.isTouching(enemy4Group) || bullet2.isTouching(enemy4Group) || bullet3.isTouching(enemy4Group) || bullet4.isTouching(enemy4Group)){
  enemy4Group.destroyEach();
  score = score+10;
  }

  if(enemy1Group.isTouching(player) || enemy2Group.isTouching(player)){
    health = health-0.5;
  }

  if(enemy3Group.isTouching(player) || enemy4Group.isTouching(player)){
    health = health-0.75;
  }

  if(score>highScore){
    highScore = score;
  } else{
    highScore = highScore;
  }
  }
  if(health === 0 || health<0){
    gameStateMain = 2;
  }

  fill("yellow");

  text("SCORE : "+score,200,100);
  text("HIGHSCORE : "+highScore,displayWidth-200,100);
  
  textSize(20);

  fill("red");

  if(gameStateMain === 2){
    text("GAME OVER",displayWidth/2,displayHeight/2-30);
    text("PRESS R TO REPLAY",displayWidth/2,displayHeight/2);
    player.velocityX = 0;
    player.velocityY = 0;
  }

  if(keyWentDown("r") && gameStateMain === 2){
    gameStateMain = 0;
    health = 100;
    player.x = displayWidth/2+70;
    player.y = displayHeight/2-90;
    score = 0;
  }

  text("HP: "+health,player.x-30,player.y+50);
  
  if(gameStateMain === 1){
  spawnEnemy1();
  spawnEnemy2();
  spawnEnemy3();
  spawnEnemy4();
  }

  topM.shapeColor = "red";
  bottom.shapeColor = "red";
  right.shapeColor = "red";
  left.shapeColor = "red";

  drawSprites();
}

function spawnEnemy1(){
  if(frameCount%30 === 0){
  rand = random(100,displayWidth-50);
  enemy = createSprite(rand,30,10,10);
  enemy.velocityY = rand2;
  enemy.addImage("enemy",enemy_img);
  enemy1Group.add(enemy);
  
  enemy.lifetime = 1200;
  }
}

function spawnEnemy2(){
  if(frameCount%30 === 0){
  rand = random(30,displayHeight-150);
 enemy = createSprite(80,rand,10,10);
 enemy.velocityX = rand2;
 enemy.addImage("enemy",enemy_img);
 enemy2Group.add(enemy);

 enemy.lifetime = 1200;
  }
}

function spawnEnemy3(){
  if(frameCount%200 === 0){
    rand = random(30,displayHeight-150);
   enemy2 = createSprite(80,rand,10,10);
   enemy2.velocityX = rand2;
   enemy2.addImage("enemy2",enemy2_img);
   enemy3Group.add(enemy2);
   enemy2.scale = 2.5;
  
   enemy2.lifetime = 1200;
    }
}
function spawnEnemy4(){
  if(frameCount%200 === 0){
  rand = random(100,displayWidth-50);
  enemy2 = createSprite(rand,30,10,10);
  enemy2.velocityY = rand2;
  enemy2.addImage("enemy2",enemy2_img);
  enemy4Group.add(enemy2);
  enemy2.scale = 2.5;

  enemy2.lifetime = 1200;
  }
}