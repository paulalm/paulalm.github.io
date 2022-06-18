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
let gameOver = false;
let score = 0;
let choosenDefender = 0;
let boss = false;

let level_zombies = 10;
let boss_points = 50;
let go_next_levl = false;
let winningScore = level_zombies*10+boss_points;
let curr_level = 1;

//types
const producer = 0;
const distanceshoot = 1;
const defenser = 2;
const contactshoot = 3;

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
  constructor(x,y, power){
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.power = power;
    this.speed = 5;
  }
  update(){
    this.x += this.speed;
  }
  draw(){
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    ctx.fill();
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
const wonderballTypes = [];
const wonderball1 = new Image();
wonderball1.src = 'wonderballs/wonderball1.png';
wonderballTypes.push(wonderball1);

const wonderball2 = new Image();
wonderball2.src = 'wonderballs/girasol.png';
wonderballTypes.push(wonderball2);

const wonderball3 = new Image();
wonderball3.src = 'wonderballs/lanzaguisantes.png';
wonderballTypes.push(wonderball3);

const wonderball4 = new Image();
wonderball4.src = 'wonderballs/nuez.png';
wonderballTypes.push(wonderball4);

const wonderball5 = new Image();
wonderball5.src = 'wonderballs/doudis.png';
wonderballTypes.push(wonderball5);

class Wonderball{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.width = cellSize - cellGap *2;
    this.height = cellSize - cellGap *2;
    this.shooting = false;
    this.health = cards[choosenDefender].health;
    this.defense = cards[choosenDefender].defense;
    this.projectiles = [];
    this.wonderballType = cards[choosenDefender].img;
    this.frameX = 0;
    this.frameY = 0;
    this.minFrame = 0;
    this.maxFrame = 2;
    this.spriteWidth = 340;
    this.spriteHeight = 367;
    this.shootNow = false;
    this.power = cards[choosenDefender].power;
    this.type = cards[choosenDefender].type;
    this.life = 0;
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
    if(frame % 10 === 0 ){
      if(this.frameX < this.maxFrame ) this.frameX++;
      else this.frameX = this.minFrame;
      if (this.frameX == 2) this.shootNow = true;
    }

    if(this.type == distanceshoot){
      if(this.shooting){
        this.minFrame = 1;
        this.maxFrame = 2;
      }else{
        this.minFrame = 0;
        this.maxFrame = 1;
      }
    }

    if (this.shooting && this.shootNow){
      if(this.type==distanceshoot){
        let prob = Math.random();
        if(prob > 0.7) projectiles.push(new Projectile(this.x + 70, this.y + 30, this.power));
        this.shootNow = false;
      }
    }
    if(this.type == producer && this.life%500 == 0){
      resources.push(new Resource(this.x+15, this.y+15, this.power));
    }

    this.life++;
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



cards = [];
const card1 = {
  x:10,
  y:10,
  width: 70,
  height: 85,
  img: wonderballTypes[0],
  cost: 200,
  defense: 0.08,
  power: 35,
  health: 100,
  type: distanceshoot
}
cards.push(card1);

const card2 = {
  x:90,
  y:10,
  width: 70,
  height: 85,
  img: wonderballTypes[1],
  cost: 50,
  defense: 0.02,
  power: 25,
  health: 100,
  type: producer
}
cards.push(card2);

const card3 = {
  x:170,
  y:10,
  width: 70,
  height: 85,
  img: wonderballTypes[2],
  cost: 100,
  defense: 0.05,
  power: 20,
  health: 100,
  type: distanceshoot
}
cards.push(card3);

const card4 = {
  x:250,
  y:10,
  width: 70,
  height: 85,
  img: wonderballTypes[3],
  cost: 80,
  defense: 0,
  power: 0,
  health: 300,
  type: defenser
}
cards.push(card4);

const card5 = {
  x:330,
  y:10,
  width: 70,
  height: 85,
  img: wonderballTypes[4],
  cost: 0,
  defense: 0.025,
  power: 0,
  health: 50,
  type: contactshoot
}
cards.push(card5);

function chooseDefender(){
  ctx.lineWidth = 1;
  for(let i = 0; i< cards.length; i++){
    if (collision(mouse, cards[i]) && mouse.clicked){
      choosenDefender = i;
    }
    ctx.strokeStyle = 'black';
    if(i == choosenDefender) ctx.strokeStyle = 'gold';
    ctx.strokeRect(cards[i].x, cards[i].y, cards[i].width, cards[i].height);
    ctx.drawImage(cards[i].img, 0, 0, 340, 367, cards[i].x, cards[i].y, cards[i].width, cards[i].height);
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
  constructor(verticalPosition, health){
    this.x = canvas.width;
    this.y = verticalPosition;
    this.width = cellSize - cellGap*2;
    this.height = cellSize - cellGap*2;
    this.speed = Math.random() * 0.2 + 0.4;
    this.movement = this.speed;
    this.health = health;
    this.maxHealth = this.health;
    this.attack = health / 500;
  }
  update(){
    this.x -= this.movement;
  }
  draw(){
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Orbitron'
    ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
  }
}

function handleEnemies(){
  for (let i=0; i<enemies.length; i++){
    enemies[i].update();
    enemies[i].draw();
    if(enemies[i].x <0){
      gameOver = true;
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
    let health = 100;
    if (score > level_zombies*5) health = 200;
    if (score > level_zombies*9) {
      health = boss_points*20;
      boss = true;
    }
    enemies.push(new Enemy(verticalPosition, health));
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
  ctx.font = '30px Arial';
  ctx.fillText('Score: ' + score, 420, 40);
  ctx.fillText('Resources: ' + numberOfResources, 420, 80);
  ctx.fillText('Level: ' + curr_level, 700, 80);
  if (gameOver){
    ctx.fillStyle = 'black';
    ctx.font = '90px Orbitron';
    ctx.fillText("Game Over", 135, 330);
  }
  if(score >= winningScore && enemies.length === 0){
    ctx.fillStyle = 'black';
    ctx.font = '60px Orbitron';
    ctx.fillText("LEVEL COMPLETE", 130, 300);
    ctx.font = '30px Orbitron';
    ctx.fillText("Score " + score, 134, 340);
    ctx.fillText("Click for next level ", 134, 380);
    go_next_levl = true;
  }
}

canvas.addEventListener('click', function(){
  const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
  const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
  if (gridPositionY < cellSize) return;
  for (let i=0; i < wonderballs.length; i++){
    if(wonderballs[i].x === gridPositionX && wonderballs[i].y === gridPositionY){
      return;
    }
  }
  let defenderCost = cards[choosenDefender].cost;
  if (numberOfResources >= defenderCost){
    wonderballs.push(new Wonderball(gridPositionX, gridPositionY));
    numberOfResources -= defenderCost;
  }else{
    floatingMessages.push(new FloatingMessage("No resources available", mouse.x, mouse.y, 20, 'blue'));
  }
});

function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(0,0, controlsBar.width, controlsBar.height);


  chooseDefender()
  handleGameGrid();
  handleWonderballs();
  handleProjectiles();
  handleEnemies();
  handleResources();
  handleGameStatus();
  handleFloatingMessages();
  if(gameOver || score > winningScore && enemies.length == 0){
    return;
  }
  requestAnimationFrame(animate);
  frame++;
}


canvas.addEventListener('dblclick', function(){
  if(go_next_levl){
    score = 0;
    go_next_levl = false;
    winningScore = level_zombies*10+boss_points;
    numberOfResources = 200;
    boss = false;
    curr_level +=1;
    resources.length = 0;
    projectiles.length = 0;
    wonderballs.length = 0;
    level_zombies *= 2;
    animate();
  }
})


animate();

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
