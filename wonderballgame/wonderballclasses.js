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
function createProjectile(x,y,power,img, type){
  if(type==straightpath){
    return new StraightPathProjectile(x,y,power,img);
  }
  else if(type==arcpath){
    return new ArcPathProjectile(x,y,power,img);
  }
  else if(type == randompath){
    return new RandomPathProjectile(x,y,power,img);
  }
  else {
    return new Projectile(x,y,power,img);
  }
}

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

  }

  destroy(){

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

class ArcPathProjectile extends Projectile{
  constructor(x,y, power, img){
    super(x,y,power,img);
  }

  update(){
    this.x += this.speed;
    this.y += this.speedy;
    if (this.originaly-this.y > 30) this.speedy *= -1;
    if (this.y == this.originaly) this.speedy = 0;
  }
  destroy(){

  }

  draw(){
    super.draw();
  }
}

class StraightPathProjectile extends Projectile{
  constructor(x,y, power, img){
    super(x,y,power,img);
  }

  update(){
    this.x += this.speed;
  }
  destroy(){
    super.destroy();
  }

  draw(){
    super.draw();
  }
}

class RandomPathProjectile extends Projectile{
  constructor(x,y, power, img){
    super(x,y,power,img);
  }
  update(){
    let xRandom = Math.random() * (1 - (-1)) - 1;
    this.x += xRandom*this.speed;
    let yRandom = Math.random() * (1 - (-1)) - 1;
    this.y += yRandom * this.speedy;
  }
}

class ManualShootObjective{
  constructor(power, img, owner){
    this.x = mouse.x;
    this.y = mouse.y;
    this.height=20;
    this.width=20;
    this.power = power;
    this.img = img;
    this.owner = owner;
  }
  update(){
    this.x = mouse.x;
    this.y = mouse.y;
  }

  destroy(){
    this.owner.projectileDestroyed();
  }
  draw(){
    if(this.img.length == 0){
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
      ctx.fill();
    }else{
      ctx.drawImage(this.img[0], 0, 0, 340, 367, this.x, this.y-30, this.width*5, this.height*5 );
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
    this.product_img = cards[choosenDefender].card.product_img;
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
      resources.push(new Resource(this.x+15, this.y+15, this.produce, this.product_img));
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

class ManualAttackWonderball extends AttackerWonderball{
  constructor(x,y){
    super(x,y);
    this.chargingTime = 0;
    this.charging = false;
    this.resting = true;
    this.shooting = false;
  }

  enemyAttacking(attack, health){
    super.enemyAttacking(attack);
    this.shooting = true;
  }

  projectileDestroyed(){
    this.shooting = false;
    this.charging = true;
  }

  update(){
    super.update();

    if(collision(mouse, this) && this.resting && mouse.clicked){
      projectiles.push(new ManualShootObjective(this.power, this.projectiles, this));
      this.shooting = true;
      this.resting = false;
      this.minFrame = 2;
      this.maxFrame = 3;
    }

    if(this.charging){
      this.minFrame = 1;
      this.maxFrame = 2;
      this.chargingTime++;
      if(this.chargingTime==100){
        this.resting = true;
        this.charging = false;
        this.chargingTime = 0;
      }
    }

    if(this.resting){
      this.minFrame=0;
      this.maxFrame=1;
    }
  }

}



class DistanceWonderball extends AttackerWonderball{
  constructor(x,y){
    super(x,y);
    this.projectileType = cards[choosenDefender].card.projectile_type;
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
        if(prob < th) projectiles.push(createProjectile(this.x + 70, this.y + 30, this.power, this.projectiles,this.projectileType));
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
