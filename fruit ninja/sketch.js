var PLAY = 1;
var END = 0;
var gameState = 1;
var score = 0;
var bg
var sword
var fruit, monster
var position

function preload() {
  swordImage = loadImage("katana.png");
  fruitImage1 = loadImage("watermelon.png");
  fruitImage2 = loadImage("banana.png");
  fruitImage3 = loadImage("pineapple.png");
  fruitImage4 = loadImage("apple.png");
  monsterImage = loadImage("virus.png");
  gameoverImage = loadImage("gameover.png");
  bgImage = loadImage("bgfruitninja.png");
  swooshSound = loadSound("fruitNinja.mp3");
  fruitSound = loadSound("fruitspawnsound.mp3");
  enemySound = loadSound("enemyentersound.mp3");
  gameoverSound = loadSound("gameover.mp3");
  bg = loadSound("bg.mp3");
  fruitSplash = loadImage("squash.png");
  restartImg = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 500);
  bg.play();
  bg = createSprite(250, 250, 10, 10);
  bg.addImage(bgImage);
  bg.scale = 1.2;


  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.4;
  sword.setCollider("rectangle", 0, 0, 50, 110);


restart = createSprite(300,360);
  restart.addImage(restartImg);
  

  fruitGroup = createGroup();
  enemyGroup = createGroup();

}


function draw() {
  background(180);

  if (gameState === PLAY) {
    katanaSword();
    fruits();
    enemy();
     restart.visible = false;
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      fruitGroup.lifetime = 10;
      swooshSound.play();
      score = score + 1;
    }
    if (enemyGroup.isTouching(sword)) {
      gameState = END;
      gameoverSound.play();
    }
  }

  if (gameState === END) {
    sword.addImage(gameoverImage);
    sword.scale = 1;
    sword.x = 300;
    sword.y = 250;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.velocityX = 0;
    enemyGroup.velocityX = 0;
restart.visible = true;
if(mousePressedOver(restart)) {
      reset();
}
  }

  drawSprites();
  textSize(17);
  fill('yellow');
  text("Score: " + score, 275, 50);
text("avoid touching the virus!",200,450);
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    position = Math.round(random(1, 2));
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    fruit.setCollider("circle", 0, 0, 90);

    r = Math.round(random(1, 4));
    if (r == 1) {

      fruit.addImage(fruitImage1);
      fruitSound.play();

    } else if (r == 2) {
      fruit.addImage(fruitImage2);
      fruitSound.play();

    } else if (r == 3) {
      fruit.addImage(fruitImage3);
      fruit.scale = 0.3;
      fruitSound.play();

    } else {
      fruit.addImage(fruitImage4);
      fruitSound.play();

    }

    if (position == 1) {
      fruit.x = 800;
      fruit.velocityX = -(7 + (score / 4));
    } else {
      if (position == 2) {
        fruit.X = 0;
        fruit.velocityX = (7 + (score / 4));
        console.log(position);
      }
    }

    fruit.y = Math.round(random(50, 340));
    fruit.lifetime = 100;
    fruitGroup.add(fruit);
  }
}

function enemy() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addImage(monsterImage);
    enemySound.play();
    monster.scale = 0.2;
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -8;
    monster.setLifetime = 50;
    monster.velocityX = -(8 + (score / 10));
    enemyGroup.add(monster);
  }
}

function katanaSword() {
  sword.y = World.mouseY;
  sword.x = World.mouseX;

}

function reset(){
  gameState= PLAY;
    restart.visible = false;
  enemyGroup.destroyEach();
  fruitGroup.destroyEach();
   sword.addImage(swordImage);
  sword.scale = 0.4;
  score = 0;
}