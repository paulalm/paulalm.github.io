//const canvas = document.getElementById('canvas1');
//const ctx = canvas.getContext('2d')
//canvas.width= 900;
//canvas.height = 600;

//catalogo
const worldBgnImg = new Image();
worldBgnImg.src = 'assets/forestWorldbackground.jpg';

//dialogs
const winDialogImg = new Image();
winDialogImg.src = 'dialogmarie/Slide4.PNG';

const gameOverDialogImg = new Image();
gameOverDialogImg.src = 'dialogmarie/Slide1.PNG';

const gameOver3DialogImg = new Image();
gameOver3DialogImg.src = 'dialogmarie/Slide2.PNG';


// global variables
const cellSize = 100;
const cellGap = 3;

const gameGrid = [];
const wonderballs = [];
const enemies = [];
const enemyPositions = [];
const projectiles = [];
const resources = [];
const nutrients = [];
let enemiesInterval = 400;
let enemiesPowerBoost = 1;
let numberOfResources = 1000;
let frame = 0;
let playGame = false;
let gameOver = false;
let score = 0;
let choosenDefender = 0;
let boss = false;

let gameOverCount = 0;

let curr_level = 1;
let level_zombies = curr_level*10+Math.pow(curr_level,2);
let boss_points = 50;
let go_next_levl = false;
let winningScore = level_zombies*10+boss_points;
let givenZombies = 0;



//let canvasPosition = canvas.getBoundingClientRect();

console.log(canvasPosition);

// game board
const controlsBar = {
  width : cellSize,
  height : canvas.width,
};

//pausa
const pauseImg = new Image();
pauseImg.src = 'resources/pause.png';

const pauseBtn ={
  x: 7*90,
  y: 10,
  width: 85,
  height: 70,
  active: false,
  paused: false,
  img: pauseImg
};

powerUps = [];
powerUpsTime = [];
//pala
const shovelImg = new Image();
shovelImg.src = 'resources/palacolor.png';

const shovel ={
  x: 30,
  y: canvas.height-50,
  width: 40,
  height: 40,
  active: false,
  img: shovelImg
};
powerUps.push(shovel);
powerUpsTime.push(0);

//Gema de agua
const watergemImg = new Image();
watergemImg.src = 'resources/gemaAgua.png';

const watergem ={
  x: 80,
  y: canvas.height-50,
  width: 40,
  height: 40,
  active: false,
  img: watergemImg
};

powerUps.push(watergem);
powerUpsTime.push(1000);

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
  for (let y = 0; y < canvas.height-cellSize; y+= cellSize ){
    for (let x = cellSize; x < canvas.width; x+= cellSize){
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


function handleProjectiles(){
  for (let i=0; i< projectiles.length; i++){
    projectiles[i].update();
    projectiles[i].draw();

    for (let j = 0; j < enemies.length; j++){
      if(enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])){
        enemies[j].health -= projectiles[i].power;
        p = projectiles[i];
        p.destroy();
        if(p.getType() != penetratingproj ){
          projectiles.splice(i, 1);
          i--;
        }
      }
    }

    if ( projectiles[i] && projectiles[i].x > canvas.width -cellSize){
      projectiles.splice(i, 1);
      i--;
    }
  }
}

function handleNutrients(){
  for (let i=0; i< nutrients.length; i++){
    nutrients[i].update();
    nutrients[i].draw();

    for (let j = 0; j < wonderballs.length; j++){
      if(wonderballs[j] && nutrients[i] && collision(nutrients[i], wonderballs[j])){
        wonderballs[j].health += nutrients[i].power;
        p = nutrients[i];
        p.destroy();
        nutrients.splice(i, 1);
        i--;
      }
    }

    if ( nutrients[i] && nutrients[i].x > canvas.width -cellSize){
      nutrients.splice(i, 1);
      i--;
    }

    if ( nutrients[i] && nutrients[i].y < 0 ){
      nutrients.splice(i, 1);
      i--;
    }
  }
}


function handleWonderballs(){
  for (let i=0; i< wonderballs.length; i++){
    wonderballs[i].draw();
    wonderballs[i].update();

    if(enemyPositions.includes(wonderballs[i].y)){
      wonderballs[i].enemyOnRow(true);
    }else{
      wonderballs[i].enemyOnRow(false);
    }

    for (let j=0; j< enemies.length; j++){
      if(wonderballs[i] && collision(wonderballs[i], enemies[j])){
        if(wonderballs[i] instanceof TrapWonderball){
          if(wonderballs[i].enemyAttacking(enemies[j].attack, enemies[j].health)){
            enemies.splice(j, 1);
            j--;
          }
          else{
            enemies[j].x -= cellSize*2;
          }
        }else{
          wonderballs[i].enemyAttacking(enemies[j].attack, enemies[j].health);
          enemies[j].wonderballAttacking(wonderballs[i].defense, wonderballs[i].health);
        }
      }
      if(wonderballs[i] && wonderballs[i].health <= 0){
        wonderballs.splice(i, 1);
        i--;
      }
    }
  }
}




cards = [];
let allcards = [];

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
    if(i== 0){
      if (collision(mouse, powerUps[i]) && mouse.clicked && powerUpsTime[i] == 0){
        powerUps[i].active = !powerUps[i].active;
      }
    }
    else{
      if(powerUpsTime[i] > 0){
        powerUpsTime[i]--;
        if(powerUpsTime[i] == 0){
          if ( powerUps[i].active){
            powerUps[i].active = false;
            powerUpsTime[i] = 700;
          }
        }
      }
      if (collision(mouse, powerUps[i]) && mouse.clicked && !powerUps[i].active){
        powerUps[i].active = true;
        powerUpsTime[i] = 1000;
      }
    }


    ctx.strokeStyle = 'black';
    ctx.globalAlpha = 1 - (powerUps[i]%1000/1000);
    if(powerUps[i].active) ctx.strokeStyle = 'gold';
    ctx.strokeRect(powerUps[i].x, powerUps[i].y, powerUps[i].width, powerUps[i].height);
    ctx.drawImage(powerUps[i].img, 0, 0, 100, 100, powerUps[i].x, powerUps[i].y, powerUps[i].width, powerUps[i].height);
    ctx.globalAlpha = 1;
  }

}

function handlePauseBtn(){
  //pauseImg
  if(collision(mouse, pauseBtn)&& mouse.clicked){
    pauseBtn.active = !pauseBtn.active;
  }
  ctx.strokeStyle = 'black';
  if(pauseBtn.active) ctx.strokeStyle = 'gold';
  ctx.strokeRect(pauseBtn.x, pauseBtn.y, pauseBtn.width, pauseBtn.height);
  ctx.drawImage(pauseBtn.img, 0, 0, 100, 100, pauseBtn.x, pauseBtn.y, pauseBtn.width, pauseBtn.height);
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
    this.health = enemyType.maxHealth*enemiesPowerBoost;
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
    ctx.fillStyle='gold';
    ctx.font = '20px Orbitron';
    ctx.fillText(Math.floor(this.health), this.x+15, this.y+30);
    ctx.drawImage(this.img, this.frameX*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }

  wonderballAttacking(defense, health){
    this.health -= defense;
    if(health - this.attack > 0){
      this.movement = 0;
    }else{
      this.movement = this.speed;
    }
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
    let verticalPosition = Math.floor(Math.random()*5) * cellSize + cellGap;
    let type = 0;
    type = Math.floor(Math.random()*(enemyTypes.length-2));
    if (givenZombies >= level_zombies) {
      type = 2;
      boss = true;
    }
    enemies.push(new Enemy(verticalPosition, enemyTypes[type]));
    givenZombies += 1;
    enemyPositions.push(verticalPosition);
    if ( enemiesInterval > 150){
      enemiesInterval -= 25;
    }
  }
}
// Resources
const amounts = [20, 30, 40];

class Resource{
  constructor(x,y,amount, img){
    this.x = x;
    this.y = y;
    this.width = cellSize * 0.6;
    this.height = cellSize * 0.6;
    this.amount = amount;
    this.image = img;
  }
  draw(){
    if(this.image == null){
      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      ctx.arc(this.x+50, this.y+50, this.width/2, 0, Math.PI * 2);
      ctx.fill();
    }
    else{
      ctx.drawImage(this.image, 0, 0, 100, 100, this.x, this.y, this.width, this.height);
    }
    ctx.fillStyle = 'black';
    ctx.font = '20px Orbitron';
    //ctx.fillText(this.amount, this.x + 15, this.y + 25);
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

    resources.push(new Resource(x,y,amount, sol));
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
  //ctx.fillText('Score: ' + score, 650, 40);
  ctx.fillText('Resources: ' + numberOfResources, 740, 80);
  ctx.fillText('Level: ' + curr_level, 740, 40);
  if (gameOver){
    gameOverCount += 1;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    if (gameOverCount == 3){
      gameOverCount = 0;
      ctx.drawImage(gameOver3DialogImg, 0, 0, 2713, 1778, 10,10,canvas.width, canvas.height);
    }
    else{
      ctx.drawImage(gameOverDialogImg, 0, 0, 3200, 2100, 10,10,canvas.width, canvas.height);
    }

  }
  if(enemies.length == 0 && givenZombies >= level_zombies){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(winDialogImg, 0, 0, 2607, 1898, 10,10,canvas.width, canvas.height);
    // ctx.fillStyle = 'black';
    // ctx.font = '60px Orbitron';
    // ctx.fillText("LEVEL COMPLETE", 130, 300);
    // ctx.font = '40px Orbitron';
    // ctx.fillText("Well done, Pau & Feli!", 130, 340);
    // ctx.font = '30px Orbitron';
    // ctx.fillText("Score " + score, 134, 380);
    // ctx.fillText("Click for next level ", 134, 420);
    go_next_levl = true;
  }
}

canvas.addEventListener('click', function(){
    if(playGame){
      const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
      const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
      if (gridPositionX < cellSize) return;
      if (gridPositionY > canvas.height - cellSize) return;
      for (let i=0; i < wonderballs.length; i++){
        if(wonderballs[i]&&wonderballs[i].x === gridPositionX && wonderballs[i].y === gridPositionY){
          if(powerUps[0].active){ //shovel is active
            numberOfResources += 25;
            floatingMessages.push(new FloatingMessage("+25", mouse.x, mouse.y, 20, 'blue'));
            wonderballs.splice(i, 1);
            powerUps[0].active=false; //make shovel not active
            return;
          }
          let defenderCost = cards[choosenDefender].card.cost;
          if (numberOfResources >= defenderCost){
            if(cardAvailable[choosenDefender]<=0){
              if (cards[choosenDefender].card.type == support) wonderballs.push(new SupportWonderball(gridPositionX, gridPositionY));
            }
            numberOfResources -= defenderCost;
            cardAvailable[choosenDefender]=300;
          }
          return;
          //check other powerUps
        }
      }
      let defenderCost = cards[choosenDefender].card.cost;
      if (numberOfResources >= defenderCost){
        if(cardAvailable[choosenDefender]<=0){
          if(cards[choosenDefender].card.type==support){
            floatingMessages.push(new FloatingMessage("Use a wonderball first", mouse.x, mouse.y, 20, 'blue'));
          }
          else{
            wonderballs.push(createWonderball(cards[choosenDefender].card.type, gridPositionX, gridPositionY));
          }
          numberOfResources -= defenderCost;
          cardAvailable[choosenDefender] = cards[choosenDefender].card.cost*1.5;
          if(cardAvailable[choosenDefender]==0)cardAvailable[choosenDefender]=150;
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
  height: 150,
  text: 'Go!'
};

const backButton={
  x: 80,
  y: 550,
  width: 150,
  height: 150,
  text: '<--'
};

const nextButton={
  x: 550,
  y: 550,
  width: 150,
  height: 150,
  text: '-->'
};

let choosenOnes = [];
let curr_page = 0;

function handleSelection(){
  for(let i = 0; i < 12; i++){
    if (collision(mouse, allcards[i]) && mouse.clicked && !choosenOnes.includes(i+curr_page)){
      choosenCard = i+curr_page;
      choosenOnes.push(choosenCard);
      mouse.clicked=false;
      if(choosenOnes.length > 6){
        choosenOnes.shift();
      }
    }
  }

  if (collision(mouse, nextButton) && mouse.clicked){
    if(curr_page < Math.max(curr_level,allTypes.length-12)){
      curr_page +=1;
      mouse.clicked=false;
      initAllCards();
    }
  }
  else if (collision(mouse, backButton) && mouse.clicked){
    if(curr_page > 0){
      curr_page -=1;
      mouse.clicked=false;
      initAllCards();
    }
  }
  else if (collision(mouse, goButton) && mouse.clicked){
    if(choosenOnes.length == 6){
      cardAvailable = new Array(choosenOnes.length).fill(75);
      for(let j = 0; j < choosenOnes.length; j++){
        cards.push(new WonderballType(10, j*90, 70, 85, allTypes[choosenOnes[j]]));
        if(allTypes[choosenOnes[j]].type == 'producer') cardAvailable[j]==0;
      }
      mouse.clicked = false;
      playGame = true;
    }else{
      floatingMessages.push(new FloatingMessage("Choose 6 defenders", mouse.x, mouse.y, 20, 'blue'));
    }
  }
}

const cols = 4;

function initAllCards(){
  const width = 200;
  const height = 150;
  allcards=[];
  for(let j = curr_page; j < curr_page+12; j++){
    if(j< allTypes.length){
      i = j - curr_page;
      x = (i%cols)*width + (i%cols)*5+50;
      y = Math.floor(i / cols)*height + (Math.floor(i / cols)*5) + 100;
      allcards.push(new WonderballType(x, y, width, height, allTypes[j]));
    }
  }
}


function handleTypeSelection(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle='black';
  ctx.font = '30px Orbitron';
  ctx.fillText('Pau & Feli! Welcome to the world!', 15, 30);
  ctx.fillText('Choose your wonderballs for this battle', 15, 60);
  //initAllCards();

  for(let i = 0; i< allcards.length; i++){
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fillStyle='black';
    bgnImg = selectionImg;
    if(choosenOnes.includes(i+curr_page)){
       bgnImg = selectionChosenImg;
       ctx.fillStyle = 'gold';
     }
    //ctx.strokeRect(allcards[i].x, allcards[i].y, allcards[i].width, allcards[i].height);
    ctx.drawImage(bgnImg, 0, 0, 250, 180, allcards[i].x, allcards[i].y-25, allcards[i].width+20, allcards[i].height+50);
    ctx.drawImage(allcards[i].card.img, 0, 0, 340, 367, allcards[i].x, allcards[i].y, allcards[i].width, allcards[i].height);
    ctx.font = '20px Orbitron';
    ctx.fillText(Math.floor(allcards[i].card.cost), allcards[i].x+allcards[i].width-50, allcards[i].y+allcards[i].height-10);
  }

  //Go Button
  ctx.fillStyle='gold';
  ctx.fillRect(goButton.x, goButton.y, goButton.width, goButton.height);
  ctx.fillStyle='black';
  ctx.font = '30px Orbitron';
  ctx.fillText(goButton.text, goButton.x+20, 590);

  //NExt Button
  ctx.fillStyle='gold';
  ctx.fillRect(nextButton.x, nextButton.y, nextButton.width, nextButton.height);
  ctx.fillStyle='black';
  ctx.font = '30px Orbitron';
  ctx.fillText(nextButton.text, nextButton.x+20, 590);

  //NExt Button
  ctx.fillStyle='gold';
  ctx.fillRect(backButton.x, backButton.y, backButton.width, backButton.height);
  ctx.fillStyle='black';
  ctx.font = '30px Orbitron';
  ctx.fillText(backButton.text, backButton.x+20, 590);

  //events
  handleFloatingMessages();
  handleSelection();
  if(playGame){
    audioEl = document.getElementById("audio");
    audioEl.src = "assets/camp.mp3";

    animate();
    return;
  }
  requestAnimationFrame(handleTypeSelection);
}

function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.drawImage(worldBgnImg, 0, 0, 3143, 2415, 10,10,canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.globalAlpha = 0.85;
  ctx.fillRect(0,0, controlsBar.width, controlsBar.height);

  handlePauseBtn();
  handleGameGrid();
  if(!pauseBtn.active){
    chooseDefender();
    choosePowerUps();
    handleWonderballs();
    handleProjectiles();
    handleEnemies();
    handleResources();
    handleNutrients();
    handleFloatingMessages();
  }
  handleGameStatus();
  handleCards();
  if(gameOver || enemies.length == 0){
    frame=0;
    return;
  }
  frame++;
  requestAnimationFrame(animate);

}


canvas.addEventListener('dblclick', function(){
  if(go_next_levl || gameOver){
    score = 0;

    numberOfResources = Math.max((5-curr_level)*100, 100);
    boss = false;
    enemies.length = 0;
    resources.length = 0;
    projectiles.length = 0;
    wonderballs.length = 0;

    if(go_next_levl){
      curr_level +=1;
      level_zombies =curr_level*10+Math.pow(curr_level,2);
      winningScore = level_zombies*10+boss_points;
      enemiesPowerBoost = curr_level/2;
    }
    go_next_levl = false;
    playGame = false;
    gameOver = false;
    cards = [];
    cardsAvailable = [];
    audioEl = document.getElementById("audio");
    audioEl.src = "assets/menusong.mp3";
    handleTypeSelection();
  }

})

initAllCards();
audioEl = document.getElementById("audio");
audioEl.src = "assets/menusong.mp3";
handleTypeSelection();
//animate();
