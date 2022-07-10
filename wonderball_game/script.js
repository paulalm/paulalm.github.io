const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d')
canvas.width= 900;
canvas.height = 600;

// global variables
const cellSize = 100;
const cellGap = 3;

const gameGrid = [];
const wonderballs = [];
const enemies = [];
const enemyPositions = [];
const projectiles = [];
const resources = [];
let enemiesInterval = 400;
let numberOfResources = 1000;
let frame = 0;
let playGame = false;
let gameOver = false;
let score = 0;
let choosenDefender = 0;
let boss = false;

let level_zombies = 10;
let boss_points = 50;
let go_next_levl = false;
let winningScore = level_zombies*10+boss_points;
let curr_level = 1;

//mouse
const mouse ={
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1,
  clicked: false,
};
let canvasPosition = canvas.getBoundingClientRect();

console.log(canvasPosition);

canvas.addEventListener('mousemove', function(e){
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener('touchmove', function(e){
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener('mouseleave', function(e){
  mouse.x = undefined;
  mouse.y = undefined;
});

canvas.addEventListener('touchend', function(e){
  mouse.x = undefined;
  mouse.y = undefined;
  mouse.clicked = false;
});

canvas.addEventListener('touchstart', function(e){
  mouse.clicked = true;
});

canvas.addEventListener('mousedown', function(e){
  mouse.clicked = true;
});

canvas.addEventListener('mouseup', function(e){
  mouse.clicked = false;
});


// game board
const controlsBar = {
  width : canvas.width,
  height : cellSize,
};

powerUps = [];
//pala
const shovelImg = new Image();
shovelImg.src = 'resources/palacolor.png';

const shovel ={
  x: 6*90,
  y: 10,
  width: 85,
  height: 70,
  active: false,
  img: shovelImg
};
powerUps.push(shovel)

class Cell {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }
  draw(){
    if (mouse.x && mouse.y && collision(this, mouse)){
      ctx.strokeStyle = 'blue';
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
function createGrid(){
  for (let y = cellSize; y < canvas.height; y+= cellSize ){
    for (let x = 0; x < canvas.width; x+= cellSize){
      gameGrid.push(new Cell(x,y));
    }
  }
}
createGrid();
function handleGameGrid(){
  for (let i= 0; i < gameGrid.length; i++){
    gameGrid[i].draw();
  }
}

// projectiles
class Projectile{
  constructor(x,y, power, img){
    this.x = x;
    this.y = y;
    this.originaly = y;
    this.width = 10;
    this.height = 10;
    this.power = power;
    this.speed = 5;
    this.speedy = 0;
    this.img = img;
    if(this.img.length > 0) this.speedy = -1;
  }
  update(){
    this.x += this.speed;
    this.y += this.speedy;
    if (this.originaly-this.y > 50) this.speedy *= -1;
    if (this.y == this.originaly) this.speedy = 0;
  }
  draw(){
    if(this.img.length == 0){
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
      ctx.fill();
    }else{
      ctx.drawImage(this.img[0], 0, 0, 100, 100, this.x, this.y-30, this.width*5, this.height*5 );
    }
  }
}

function handleProjectiles(){
  for (let i=0; i< projectiles.length; i++){
    projectiles[i].update();
    projectiles[i].draw();

    for (let j = 0; j < enemies.length; j++){
      if(enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])){
        enemies[j].health -= projectiles[i].power;
        projectiles.splice(i, 1);
        i--;
      }
    }

    if ( projectiles[i] && projectiles[i].x > canvas.width -cellSize){
      projectiles.splice(i, 1);
      i--;
    }
  }
}
// Wonderballs
class Wonderball{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.width = cellSize - cellGap *2;
    this.height = cellSize - cellGap *2;
    this.shooting = false;
    this.health = cards[choosenDefender].card.health;
    this.defense = cards[choosenDefender].card.defense;
    this.shooting = false;

    this.spriteWidth = 340;
    this.spriteHeight = 367;

    this.wonderballType = cards[choosenDefender].card.img;
    this.frameX = 0;

    this.shootingFrames = cards[choosenDefender].card.shootingFrames;
    this.restingFrames = cards[choosenDefender].card.restingFrames;

    this.minFrame = 0;
    this.maxFrame = this.shootingFrames+this.restingFrames;

    this.power = cards[choosenDefender].card.power;
  }

  draw(){
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle='gold';
    ctx.font = '20px Orbitron';
    ctx.fillText(Math.floor(this.health), this.x+15, this.y+30);
    ctx.drawImage(this.wonderballType, this.frameX*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }

  update(){
    if(frame % 10 == 0 ){
      if(this.frameX < this.maxFrame ) this.frameX++;
      else this.frameX = this.minFrame;
    }


  }
}

class ProducerWonderball extends Wonderball{
  constructor(x,y){
    super(x,y);
    this.timer = 500;
    this.produce = cards[choosenDefender].card.power;
    this.life = 0;
  }
  draw(){
    super.draw();
  }

  update(){
    super.update();

    if(this.life% this.timer == 0){
      resources.push(new Resource(this.x+15, this.y+15, this.produce));
    }
    this.life++;
  }
}

class AttackerWonderball extends Wonderball{
  constructor(x,y){
    super(x,y);
    this.shooting = false;
    this.shootNow = false;
    this.shootFrame = cards[choosenDefender].card.shootFrame;
    this.projectiles = [];
    if(cards[choosenDefender].card.projectile_img != null){
      this.projectiles.push(cards[choosenDefender].card.projectile_img);
    }
    this.type = cards[choosenDefender].card.type;
  }
  draw(){
    super.draw();
  }

  update(){
    super.update();
    if(frame%10 == 0 && this.frameX == this.shootFrame) this.shootNow = true;

    if(this.type == distanceshoot){
      if(this.shooting){
        this.minFrame = 1;
        this.maxFrame = this.restingFrames + this.shootingFrames;
      }else{
        this.minFrame = 0;
        this.maxFrame = this.restingFrames;
      }
    }

    if(this.type == timedshoot){
      if(this.shooting && !this.shootNow){
        this.minFrame = 1;
        this.maxFrame = 1;
        this.shootNow = true;
      }
      else if(this.shootNow){
        this.minFrame = 2;
        this.maxFrame = this.shootingFrames;
        this.shootTimer ++;
      }
      if(this.shootNow && this.shootTimer == 10){
        this.shootNow = false;
        this.shootTimer = 0;
        this.minFrame = 0;
        this.maxFrame = this.restingFrames;
      }
    }

    if (this.shooting && this.shootNow){
      if(this.type==distanceshoot){
        let prob = Math.random();
        let th = 10/this.power;
        if(prob < th) projectiles.push(new Projectile(this.x + 70, this.y + 30, this.power, this.projectiles));
        this.shootNow = false;
      }
    }
  }
}

function handleWonderballs(){
  for (let i=0; i< wonderballs.length; i++){
    wonderballs[i].draw();
    wonderballs[i].update();

    if (enemyPositions.includes(wonderballs[i].y)){
      wonderballs[i].shooting = true;
    }else{
      wonderballs[i].shooting = false;
    }

    for (let j=0; j< enemies.length; j++){
      if(wonderballs[i] && collision(wonderballs[i], enemies[j])){
        wonderballs[i].health -= enemies[j].attack;
        enemies[j].health -= wonderballs[i].defense;
        enemies[j].movement = 0;
      }
      if(wonderballs[i] && wonderballs[i].health <= 0){
        wonderballs.splice(i, 1);
        i--;
        enemies[j].movement = enemies[j].speed;
      }
    }
  }
}

class WonderballType{
  constructor(x, y, width, height, card ){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.card = card;
  }
}


cards = [];
allcards = [];

let cardAvailable = [];

function chooseDefender(){
  ctx.lineWidth = 1;
  for(let i = 0; i< cards.length; i++){
    if (collision(mouse, cards[i]) && mouse.clicked){
      choosenDefender = i;
    }
    ctx.strokeStyle = 'black';
    ctx.globalAlpha = 1 - (cardAvailable[i]%100/100);
    if(i == choosenDefender) ctx.strokeStyle = 'gold';
    ctx.strokeRect(cards[i].x, cards[i].y, cards[i].width, cards[i].height);
    ctx.drawImage(cards[i].card.img, 0, 0, 340, 367, cards[i].x, cards[i].y, cards[i].width, cards[i].height);
    ctx.globalAlpha = 1;
  }
}

function choosePowerUps(){
  ctx.lineWidth = 1;
  for ( let i = 0; i < powerUps.length; i++){
    if (collision(mouse, powerUps[i]) && mouse.clicked){
      powerUps[i].active = !powerUps[i].active;
    }

    ctx.strokeStyle = 'black';
    if(powerUps[i].active) ctx.strokeStyle = 'gold';
    ctx.strokeRect(powerUps[i].x, powerUps[i].y, powerUps[i].width, powerUps[i].height);
    ctx.drawImage(powerUps[i].img, 0, 0, 100, 100, powerUps[i].x, powerUps[i].y, powerUps[i].width, powerUps[i].height);
  }
}

//Floating messages
const floatingMessages = [];
class FloatingMessage{
  constructor(value, x, y, size, color){
    this.value = value;
    this.x = x;
    this.y = y;
    this.size = size;
    this.lifeSpan = 0;
    this.color = color;
    this.opacity = 1;
  }

  update (){
    this.y += 0.3;
    this.lifeSpan += 1;
    if (this.opacitiy > 0.01) this.opacity -= 0.01;
  }

  draw(){
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.font = this.size + 'px Orbitron';
    ctx.fillText(this.value, this.x, this.y);
    ctx.globalAlpha = 1;
  }
}

function handleFloatingMessages(){
  for (let i=0; i < floatingMessages.length; i++){
    floatingMessages[i].update();
    floatingMessages[i].draw();
    if(floatingMessages[i] && floatingMessages[i].lifeSpan >= 50){
      floatingMessages.splice(i, 1);
      i--;
    }
  }
}
// Enemies


class Enemy{
  constructor(verticalPosition, enemyType){
    this.x = canvas.width;
    this.y = verticalPosition;
    this.width = cellSize - cellGap*2;
    this.height = cellSize - cellGap*2;
    this.img = enemyType.img;
    this.speed = Math.random() * enemyType.speedFactor + 0.4;
    this.movement = this.speed;
    this.health = enemyType.maxHealth;
    this.maxHealth = enemyType.maxHealth;
    this.attack = this.health / 500;

    this.frameX = 0;
    this.minFrame = 0;
    this.maxFrames = enemyType.framesStart;
    this.spriteWidth = 340;
    this.spriteHeight = 367;

    this.card = enemyType;
  }
  update(){
    this.x -= this.movement;

    if(frame % 10 == 0){
      this.frameX++;
      if(this.frameX >= this.maxFrames) this.frameX = 0;
    }

    if(this.health <= 0.7*this.maxHealth){
      this.minFrame = this.card.frameBadHealth;
      this.maxFrames = this.minFrame+this.card.framesBadHealth;
      this.frameX = this.minFrame;
    }
  }
  draw(){
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle='gold';
    ctx.font = '20px Orbitron';
    ctx.fillText(Math.floor(this.health), this.x+15, this.y+30);
    ctx.drawImage(this.img, this.frameX*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

function handleEnemies(){
  for (let i=0; i<enemies.length; i++){
    enemies[i].update();
    enemies[i].draw();
    if(enemies[i].x <0){
      gameOver = true;
      playGame = false;
    }

    if(enemies[i].health <= 0){
      let gainedResources = enemies[i].maxHealth/10;
      floatingMessages.push(new FloatingMessage("+"+gainedResources, enemies[i].x, enemies[i].y, 30, 'black'));
      floatingMessages.push(new FloatingMessage("+"+gainedResources, 250, 50, 30, 'gold'));
      numberOfResources += gainedResources;
      score += gainedResources;
      const findThisIndex = enemyPositions.indexOf(enemies[i].y);
      enemyPositions.splice(findThisIndex, 1);
      enemies.splice(i, 1);
      i--;
    }
  }

  if (frame % enemiesInterval == 0 && !boss){
    let verticalPosition = Math.floor(Math.random()*5 +1) * cellSize + cellGap;
    let type = 0;
    if (score > level_zombies*5) type = 1;
    if (score > level_zombies*9) {
      type = 2;
      boss = true;
    }
    enemies.push(new Enemy(verticalPosition, enemyTypes[type]));
    enemyPositions.push(verticalPosition);
    if ( enemiesInterval > 150){
      enemiesInterval -= 25
    }
  }
}
// Resources
const amounts = [20, 30, 40];

class Resource{

  constructor(x,y,amount){
    this.x = x;
    this.y = y;
    this.width = cellSize * 0.6;
    this.height = cellSize * 0.6;
    this.amount = amount;
  }
  draw(){
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(this.x+50, this.y+50, this.width/2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.font = '20px Orbitron';
    ctx.fillText(this.amount, this.x + 15, this.y + 25);
  }
  update(){
    this.y +=0.1;
  }
}

function handleResources(){
  if(frame%500 === 0 && score < winningScore){
    x = (Math.floor(Math.random()*5)+1)*cellSize;
    y = (Math.floor(Math.random()*5)+1)*cellSize;
    amount = amounts[Math.floor(Math.random()* amounts.length)];

    resources.push(new Resource(x,y,amount));
  }
  for(let i = 0; i < resources.length; i++){
    resources[i].update();
    resources[i].draw();
    if (resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)){
      numberOfResources+=resources[i].amount;

      floatingMessages.push(new FloatingMessage("+"+resources[i].amount, resources[i].x, resources[i].y, 30, 'black'));
      floatingMessages.push(new FloatingMessage("+"+resources[i].amount, 250,50,30,'gold' ));
      resources.splice(i, 1);
      i--;
    }
  }
}
// Utilities
function handleGameStatus(){
  ctx.fillStyle = 'gold';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 650, 40);
  ctx.fillText('Resources: ' + numberOfResources, 650, 80);
  ctx.fillText('Level: ' + curr_level, 780, 40);
  if (gameOver){
    ctx.fillStyle = 'black';
    ctx.font = '90px Orbitron';
    ctx.fillText("Game Over", 135, 330);
    ctx.font = '60px Orbitron';
    ctx.fillText("Pau Pau, Try again.", 135, 370);
  }
  if(score >= winningScore && enemies.length === 0){
    ctx.fillStyle = 'black';
    ctx.font = '60px Orbitron';
    ctx.fillText("LEVEL COMPLETE", 130, 300);
    ctx.font = '40px Orbitron';
    ctx.fillText("Well done, Pau Pau!", 130, 340);
    ctx.font = '30px Orbitron';
    ctx.fillText("Score " + score, 134, 380);
    ctx.fillText("Click for next level ", 134, 420);
    go_next_levl = true;
  }
}

canvas.addEventListener('click', function(){
    if(playGame){
      const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
      const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
      if (gridPositionY < cellSize) return;
      for (let i=0; i < wonderballs.length; i++){
        if(wonderballs[i].x === gridPositionX && wonderballs[i].y === gridPositionY){
          if(powerUps[0].active){ //shovel is active
            numberOfResources += 25;
            floatingMessages.push(new FloatingMessage("+25", mouse.x, mouse.y, 20, 'blue'));
            wonderballs.splice(i, 1);
            i--;
            return;
          }
          //check other powerUps
        }
      }
      let defenderCost = cards[choosenDefender].card.cost;
      if (numberOfResources >= defenderCost){
        if(cardAvailable[choosenDefender]<=0){
          if (cards[choosenDefender].card.type == producer) wonderballs.push(new ProducerWonderball(gridPositionX, gridPositionY));
          else if ( cards[choosenDefender].card.type==timedshoot
              ||    cards[choosenDefender].card.type == distanceshoot
              ||    cards[choosenDefender].card.type == contactshoot) wonderballs.push(new AttackerWonderball(gridPositionX, gridPositionY));
          else wonderballs.push(new Wonderball(gridPositionX, gridPositionY));
          numberOfResources -= defenderCost;
          cardAvailable[choosenDefender] = cards[choosenDefender].card.health;
        }
        else{
          floatingMessages.push(new FloatingMessage("Wait for recharge", mouse.x, mouse.y, 20, 'blue'));
        }
      }else{
        floatingMessages.push(new FloatingMessage("No resources available", mouse.x, mouse.y, 20, 'blue'));
      }
    }
});

function handleCards(){
  for(let i = 0; i< cardAvailable.length; i++){
    if(cardAvailable[i] > 0){
      cardAvailable[i]--;
    }
  }
}

const goButton={
  x: 250,
  y: 550,
  width: 250,
  height: 150
}

let choosenOnes = [];

function handleSelection(){
  for(let i = 0; i < allcards.length; i++){
    if (collision(mouse, allcards[i]) && mouse.clicked && !choosenOnes.includes(i)){
      choosenCard = i;
      choosenOnes.push(choosenCard);
      mouse.clicked=false;
      if(choosenOnes.length > 6){
        choosenOnes.shift();
      }
    }
  }

  if (collision(mouse, goButton) && mouse.clicked){
    if(choosenOnes.length == 6){
      cardAvailable = new Array(choosenOnes.length).fill(50);
      for(let j = 0; j < choosenOnes.length; j++){
        cards.push(new WonderballType(j*90, 10, 70, 85, allcards[choosenOnes[j]].card));
        if(allcards[choosenOnes[j]].card.type == 'producer') cardAvailable[j]==0;
      }
      playGame = true;
    }else{
      floatingMessages.push(new FloatingMessage("Choose 6 defenders", mouse.x, mouse.y, 20, 'blue'));
    }
  }
}

const cols = 5;

function initAllCards(){
  const width = 150;
  const height = 200;
  for(let i = 0; i < allTypes.length; i++){
    x = (i%cols)*width + (i%cols)*5+50;
    y = Math.floor(i / cols)*height + (Math.floor(i / cols)*5) + 100;
    allcards.push(new WonderballType(x, y, width, height, allTypes[i]));
  }
}


function handleTypeSelection(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle='black';
  ctx.font = '30px Orbitron';
  ctx.fillText('Pau Pau! Welcome to the world!', 15, 30);
  ctx.fillText('Choose your wonderballs for this battle', 15, 60);
  for(let i = 0; i< allcards.length; i++){
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    if(choosenOnes.includes(i)) ctx.strokeStyle = 'gold';
    ctx.strokeRect(allcards[i].x, allcards[i].y, allcards[i].width, allcards[i].height);
    ctx.drawImage(allcards[i].card.img, 0, 0, 340, 367, allcards[i].x, allcards[i].y, allcards[i].width, allcards[i].height);
    ctx.fillStyle='gold';
    ctx.font = '30px Orbitron';
    ctx.fillText(Math.floor(allcards[i].card.cost), allcards[i].x+15, allcards[i].y+30);
  }

  //Go Button
  ctx.fillStyle='gold';
  ctx.fillRect(goButton.x, goButton.y, goButton.width, goButton.height);
  ctx.fillStyle='black';
  ctx.font = '30px Orbitron';
  ctx.fillText('Go', 350, 590);

  //events
  handleFloatingMessages();
  handleSelection();
  if(playGame){
    animate();
    return;
  }
  requestAnimationFrame(handleTypeSelection);
}

function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(0,0, controlsBar.width, controlsBar.height);

  chooseDefender();
  choosePowerUps();
  handleGameGrid();
  handleWonderballs();
  handleProjectiles();
  handleEnemies();
  handleResources();
  handleGameStatus();
  handleCards();
  handleFloatingMessages();
  if(gameOver || score > winningScore && enemies.length == 0){
    frame=0;
    return;
  }
  frame++;
  requestAnimationFrame(animate);

}


canvas.addEventListener('dblclick', function(){
  if(go_next_levl || gameOver){
    score = 0;

    numberOfResources = 200;
    boss = false;
    enemies.length = 0;
    resources.length = 0;
    projectiles.length = 0;
    wonderballs.length = 0;

    if(go_next_levl){
      curr_level +=1;
      level_zombies *= 2;
      winningScore = level_zombies*10+boss_points;
    }
    go_next_levl = false;
    playGame = false;
    gameOver = false;
    console.log(gameOver);
    cards = [];
    cardsAvailable = [];
    handleTypeSelection();
  }

})

initAllCards();
handleTypeSelection();
//animate();



function collision(first, second){
  if( !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y)
  ){
    return true;
  };
}

window.addEventListener('resize', function(){
  canvasPosition = canvas.getBoundingClientRect();
})
