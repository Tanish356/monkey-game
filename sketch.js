var monkey,monkey_running;
var banana,bananaImage;
var obstacle,obstacleImage;
var foodsGroup,obstaclesGroup;
var bg,bgImage;
var score;


function preload() {

 monkey_running = loadAnimation("sprite_0.png","sprite_1.png",        "sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png"     ,"sprite_6.png","sprite_7.png","sprite_8.png");

 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("jungle.jpg");

}



function setup() {
  createCanvas(400, 400);
  
  bg = createSprite(300,200,600,600);
  bg.addImage(bgImage);
  bg.velocityX=-2;
  bg.scale=0.6;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground =  createSprite(400,350,900,10);
  ground.velocityX=-2;
  ground.x=ground.width/2;
  ground.visible=false;
  
   score = 0;

 foodsGroup = new Group();
 obstaclesGroup=new Group();

}


function draw() {
 background("white");

    if (ground.x < 0) {
    ground.x = ground.width / 2;

  }
   
  if(foodsGroup.isTouching(monkey)){
    score=score+2;
    foodsGroup.destroyEach();
  }
   
  if(keyDown("space")&& monkey.y>= height-100){
    monkey.velocityY=-15;
    switch(score){
           case 10: monkey.scale=0.12;
          break;
          case 20: monkey.scale=0.14;
          break;
          case 30: monkey.scale=0.16;
          break;
          case 40: monkey.scale=0.18;
          break;
        default:break;
    }
  }
      monkey.velocityY = monkey.velocityY+0.8;
   
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale=0.1;
    monkey.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    foodsGroup.setVelocityXEach(0);
    ground.velocityX=0;
    bg.velocityX=0;
    score=0;
    
  }
if (bg.x < 100) {
    bg.x = width / 2;
    bg.x = 300;

  } 
  
  monkey.collide(ground); 
  
 bananas();
  obstacles();
  
  
  
drawSprites();  
  
   stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+ score,220,30);
  
  function bananas() {
  
    
  
  if (frameCount % 80 === 0) {
    var banana = createSprite(width + 20, height - 300, 40, 10);
   
    banana.y = Math.round(random(100, 210));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 130;
    
   
  
     
   foodsGroup.add(banana); 
    

  }

}
function obstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 310, 20, 30);
    obstacle.velocityX = -10;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstaclesGroup.add(obstacle);
    
  }



}
  
}