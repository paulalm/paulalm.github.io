class WonderballType{
  constructor(x, y, width, height, card ){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.card = card;
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


// Wonderballs
class Wonderball{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.width = cellSize - cellGap *2;
    this.height = cellSize - cellGap *2;
    this.shooting = false;
    this.health = cards[choosenDefender].card.health;
    this.maxDefense = cards[choosenDefender].card.defense;
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

    this.maxPower = cards[choosenDefender].card.power;
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

  enemyOnRow(onRow){

  }

  enemyAttacking(attack, health){
    this.health -= attack;
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
    this.maxProduce = cards[choosenDefender].card.power;
    this.produce = cards[choosenDefender].card.power;
    this.life = 0;
  }
  draw(){
    super.draw();
  }

  update(){
    super.update();

    if(powerUps[1].active){
      this.produce = this.maxProduce + 20;
    }else{
      this.produce = this.maxProduce;
    }

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

  enemyOnRow(onRow){

  }

  enemyAttacking(attack, health){
    this.health -= attack;
  }

  update(){
    super.update();
    if(this.shooting){
      this.minFrame = 1;
      this.maxFrame = this.restingFrames + this.shootingFrames;
    }else{
      this.minFrame = 0;
      this.maxFrame = this.restingFrames;
    }

    if(powerUps[1].active){
      this.defense = this.maxDefense +this.maxDefense*2;
      this.power = this.maxPower + this.maxPower * 0.2;
    }else{
      this.defense = this.maxDefense;
      this.power = this.maxPower;
    }

    if(frame%10 == 0 && this.frameX == this.shootFrame) this.shootNow = true;

  }
}

class DistanceWonderball extends AttackerWonderball{
  constructor(x,y){
    super(x,y);
  }

  enemyOnRow(onRow){
    this.shooting = true;
  }

  enemyAttacking(attack, health){
    super.enemyAttacking(attack);
    this.shooting = true;
  }

  update(){
    super.update();



    if (this.shooting && this.shootNow){
        let prob = Math.random();
        let th = 10/this.power;
        if(prob < th) projectiles.push(new Projectile(this.x + 70, this.y + 30, this.power, this.projectiles));
        this.shootNow = false;
    }
  }
}

class ContactWonderball extends AttackerWonderball{
  constructor(x,y){
    super(x,y);
  }

  enemyOnRow(onRow){

  }

  enemyAttacking(attack, health){
    super.enemyAttacking(attack);
    this.shooting = true;
  }

  update(){
    super.update();
    if(this.shooting){
      this.shooting = false;
    }
  }
}

class DoudisGeneral extends ContactWonderball{
  constructor(x,y){
    super(x,y);
    this.defeatedEnemies = 0;
    this.origX = x;
    this.origY = y;
  }

  enemyAttacking(attack, health){
    super.enemyAttacking(attack, health);
    if(health - this.defense <= 0){
      this.defeatedEnemies += 1;
      this.defense *= 1.05;
      this.health += 15;
      this.height += cellSize/2;
      this.width += cellSize/2;
      this.x -= cellSize/4;
      this.y -= cellSize/4;
    }
  }

  draw(){
    ctx.fillStyle = 'white';
    ctx.fillRect(this.origX, this.origY, cellSize - cellGap *2, cellSize - cellGap *2);
    ctx.fillStyle='gold';
    ctx.font = '20px Orbitron';
    ctx.fillText(Math.floor(this.health), this.origX+15, this.origY+30);
    ctx.drawImage(this.wonderballType, this.frameX*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.origX, this.origY, cellSize - cellGap *2, cellSize - cellGap *2);
  }
}

class TimedShootWonderball extends AttackerWonderball{
  constructor(x,y){
    super(x,y);
  }

  enemyOnRow(onRow){
    this.shooting = onRow;
  }

  update(){
    super.update();

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
}
