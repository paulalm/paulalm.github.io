const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d')
canvas.width= 900;
canvas.height = 600;

// global variables
const cellSize = 100;
const cellGap = 3;
const winningScore = 20;
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


//mouse
const mouse ={
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1,
};
let canvasPosition = canvas.getBoundingClientRect();

console.log(canvasPosition);

canvas.addEventListener('mousemove', function(e){
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener('mouseleave', function(e){
  mouse.x = undefined;
  mouse.y = undefined;
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
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.power = 20;
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
wonderball1.src = 'wonderball1.png';
wonderballTypes.push(wonderball1);

class Wonderball{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.width = cellSize - cellGap *2;
    this.height = cellSize - cellGap *2;
    console.log("created W " + this.y)
    this.shooting = false;
    this.health = 100;
    this.projectiles = [];
    this.timer = 0;
    this.wonderballType = wonderballTypes[0];
    this.frameX = 0;
    this.frameY = 0;
    this.minFrame = 0;
    this.maxFrame = 3;
    this.spriteWidth = 340;
    this.spriteHeight = 367;
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
    }

    if (this.shooting){
      this.timer++;
      if (this.timer % 100 === 0){
        projectiles.push(new Projectile(this.x + 70, this.y + 30));
      }
    }else{
      this.timer=0;
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
//Floating messages
const floatingMessages = [];
class floatingMessage{
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
  for (let i=0; i < floatingMessages; i++){
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
  constructor(verticalPosition){
    this.x = canvas.width;
    this.y = verticalPosition;
    console.log("created enemy " + this.y)
    this.width = cellSize - cellGap*2;
    this.height = cellSize - cellGap*2;
    this.speed = Math.random() * 0.2 + 0.4;
    this.movement = this.speed;
    this.health = 100;
    this.maxHealth = this.health;
    this.attack = 0.2;
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
      floatingMessages.push(new floatingMessage("+"+gainedResources, enemies[i].x, enemies[i].y, 30, 'black'));
      floatingMessages.push(new floatingMessage("+"+gainedResources, 250, 50, 30, 'gold'));
      numberOfResources += gainedResources;
      score += gainedResources;
      const findThisIndex = enemyPositions.indexOf(enemies[i].y);
      enemyPositions.splice(findThisIndex, 1);
      enemies.splice(i, 1);
      i--;
    }
  }

  if (frame % enemiesInterval == 0){
    let verticalPosition = Math.floor(Math.random()*5 +1) * cellSize + cellGap;
    enemies.push(new Enemy(verticalPosition));
    enemyPositions.push(verticalPosition);
    if ( enemiesInterval > 120 ){
      enemiesInterval -=50
    }
  }
}
// Resources
const amounts = [20, 30, 40];

class Resource{
  constructor(){
    this.x = Math.random() * (canvas.width - cellSize);
    this.y = (Math.floor(Math.random()*5)+1)*cellSize + 25;
    this.width = cellSize * 0.6;
    this.height = cellSize * 0.6;
    this.amount = amounts[Math.floor(Math.random()* amounts.length)];
  }
  draw(){
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '20px Orbitron';
    ctx.fillText(this.amount, this.x + 15, this.y + 25);
  }
}

function handleResources(){
  if(frame%500 === 0 && score < winningScore){
    resources.push(new Resource());
  }
  for(let i = 0; i < resources.length; i++){
    resources[i].draw();
    if (resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)){
      numberOfResources+=resources[i].amount;

      floatingMessages.push(new floatingMessage("+"+resources[i].amount, resources[i].x, resources[i].y, 30, 'black'));
      floatingMessages.push(new floatingMessage("+"+resources[i].amount, 250,50,30,'gold' ));
      resources.splice(i, 1);
      i--;
    }
  }
}
// Utilities
function handleGameStatus(){
  ctx.fillStyle = 'gold';
  ctx.font = '30px Arial';
  ctx.fillText('Score: ' + score, 20, 40);
  ctx.fillText('Resources: ' + numberOfResources, 20, 80);
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
  }
}

canvas.addEventListener('click', function(){
  const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
  const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
  if (gridPositionY < cellSize) return;
  for (let i=0; i < wonderballs[i]; i++){
    if(wonderballs[i].x === gridPositionX && wonderballs[i].y === gridPositionY){
      return;
    }
  }
  let defenderCost = 100;
  if (numberOfResources >= defenderCost){
    wonderballs.push(new Wonderball(gridPositionX, gridPositionY));
    numberOfResources -= defenderCost;
  }else{
    floatingMessages.push(new floatingMessage("No resources available", mouse.x, mouse.y, 20, 'blue'));
  }
});

function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(0,0, controlsBar.width, controlsBar.height);


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
