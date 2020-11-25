var tower,towerImage;
var ghost, ghostImage;
var gameState="play";
var door, doorImage, doorsGroup;
var climber, climberImage, climbersGroup;
var invisibleBlock,invisibleBlockGroup;

var spookySound;

function preload(){
towerImage=loadImage("tower.png");
ghostImage=loadAnimation("ghost-jumping.png","ghost-standing.png");
doorImage=loadImage("door.png");
climberImage=loadImage("climber.png");
spookySound=loadSound("spooky.wav");

}

function setup(){
createCanvas(700,700);

tower=createSprite(350,350,20,20);
tower.addImage(towerImage);
tower.velocityY=5;
tower.scale=1.2;

ghost=createSprite(350,350,10,10);
ghost.addAnimation("gostAni",ghostImage);
ghost.scale=0.5;

doorsGroup=new Group();
climbersGroup=new Group();
invisibleBlockGroup=new Group();

spookySound.loop();
}

function draw(){
background("black");
if(gameState==="play"){
if(tower.y>500){
    tower.y=350;
}

if(keyDown("space")){
    ghost.velocityY=-10;
}

if(keyDown("right")){
    ghost.x+=10;
}

if(keyDown("left")){
    ghost.x-=10;
}
spawnDoors();
ghost.velocityY+=0.5;
drawSprites();
if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
}
if(ghost.y>700 || invisibleBlockGroup.isTouching(ghost)){
    gameState="end";
    ghost.destroy();
}

}

if(gameState==="end"){
    stroke("yellow"); 
    fill("yellow");
     textSize(30);
      text("Game Over", 270,350);
}

}

function spawnDoors(){
if(frameCount%240===0){
    var door = createSprite(200, -50);
     var climber = createSprite(200,10);
      var invisibleBlock = createSprite(200,15);
       invisibleBlock.width = climber.width;
        invisibleBlock.height = 2; door.x = Math.round(random(120,400));
         climber.x = door.x;
          invisibleBlock.x = door.x;
           door.addImage(doorImage);
            climber.addImage(climberImage);
             door.velocityY = 1;
              climber.velocityY = 1;
               invisibleBlock.velocityY = 1;

               ghost.depth = door.depth;
                ghost.depth +=1;

                door.lifetime = 700;
                 climber.lifetime = 700;
                  invisibleBlock.lifetime = 700;

                  doorsGroup.add(door);
                   invisibleBlock.debug = true;
                    climbersGroup.add(climber);
                     invisibleBlockGroup.add(invisibleBlock);
}
}