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
function createProjectile(x,y,power,img, type, store){
  if(type==straightpath){
    store.push(new StraightPathProjectile(x,y,power,img));
  }
  else if(type==arcpath){
    store.push(new ArcPathProjectile(x,y,power,img));
  }
  else if(type == randompath){
    store.push(new RandomPathProjectile(x,y,power,img));
  }
  else if(type == penetratingproj){
    store.push(new PenetratingProjectile(x,y,power,img));
  }
  else if(type == nutrientproj){
    store.push(new NutrientProjectile(x,y,power,img));
  }
  else if(type == teledirected){
    store.push(new TeleDirectedProjectile(x,y,power,img));
  }
  else {
    store.push(new Projectile(x,y,power,img));
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
    this.x += this.speed;
    this.y += this.speedy;
  }

  destroy(){

  }

  getType(){
    return noType;
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

class TeleDirectedProjectile extends Projectile{
  constructor(x,y, power, img){
    super(x,y,power,img);
    this.target = enemies[enemies.length-1]
  }

  update(){
    this.speedy = 0.05*( this.target.y - this.y);
    this.speedx = 0.05*( this.target.x - this.x);
    super.update();
  }
  destroy(){

  }

  getType(){
    return teledirected;
  }

  draw(){
    super.draw();
  }
}

class ArcPathProjectile extends Projectile{
  constructor(x,y, power, img){
    super(x,y,power,img);
  }

  update(){
    if (this.originaly-this.y > 30) this.speedy *= -1;
    if (this.y == this.originaly) this.speedy = 0;
  }
  destroy(){

  }

  getType(){
    return arcpath;
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
    super.update();
  }
  destroy(){
    super.destroy();
  }
  getType(){
    return straightpath;
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
  getType(){
    return randompath;
  }
}

class PenetratingProjectile extends StraightPathProjectile{
  constructor(x,y, power, img){
    super(x,y,power,img);
    this.speed = 10;
    this.speedy = 0;
  }
  update(){
    super.update();
  }
  destroy(){
    super.destroy();
    this.x = this.x + 100;
  }
  getType(){
    return penetratingproj;
  }
}

class NutrientProjectile extends Projectile{
  constructor(x,y, power, img){
    super(x,y,power,img);
    this.speed = 3;
    this.speedy = -0.25;
  }
  update(){
    super.update();
  }
  destroy(){
    super.destroy();
  }
  getType(){
    return nutrientproj;
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

  getType(){
    return noType;
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

function createWonderball(type, gridPositionX, gridPositionY){
  if (type == producer) return new ProducerWonderball(gridPositionX, gridPositionY);
  else if ( type==timedshoot) return new TimedShootWonderball(gridPositionX, gridPositionY);
  else if ( type == distanceshoot) return new DistanceWonderball(gridPositionX, gridPositionY);
  else if ( type == contactshoot) return new ContactWonderball(gridPositionX, gridPositionY);
  else if ( type == general) return new DoudisGeneral(gridPositionX, gridPositionY);
  else if ( type == manualshoot) return new ManualAttackWonderball(gridPositionX, gridPositionY);
  else if (type == teamwork) return new TeamworkWonderball(gridPositionX, gridPositionY, true);
  else if (type == trap) return new TrapWonderball(gridPositionX, gridPositionY);
  else return new Wonderball(gridPositionX, gridPositionY);
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

class TrapWonderball extends Wonderball{
  constructor(x,y){
    super(x,y);
    this.timer = 500;
    this.animation = 0;
    this.rechargeFrames = cards[choosenDefender].card.rechargeFrames;
    this.defeatedEnemies = 0;
  }
  draw(){
    super.draw();
  }

  enemyAttacking(attack, health){
    this.defeatedEnemies++;
    if(this.defeatedEnemies % 3 == 0){
      return false;
    }else {
      return true;
    }
  }

  update(){
    if(this.animation < this.restingFrames){
      if(frame % 120 == 0){
        this.animation+=2;
      }
      this.minFrame = this.animation;
      this.maxFrame = this.animation+1;
    }else{
      this.minFrame = this.restingFrames;
      this.maxFrame = this.restingFrames + this.rechargeFrames;
    }


    super.update();

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
        if(prob < th) {
          if(this.projectileType==nutrientproj){
            createProjectile(this.x + cellSize+10, this.y + 30, this.power, this.projectiles,this.projectileType, nutrients);
          }else{
            createProjectile(this.x + 70, this.y + 30, this.power, this.projectiles,this.projectileType, projectiles);
          }
        }
        this.shootNow = false;
    }
  }
}

class SupportWonderball extends DistanceWonderball{
  draw(){
    ctx.fillStyle='gold';
    ctx.font = '20px Orbitron';
    ctx.fillText(Math.floor(this.health), this.x+15, this.y+30);
    ctx.drawImage(this.wonderballType, this.frameX*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
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

class TeamworkWonderball extends DistanceWonderball{
  constructor(x,y, shoot){
    super(x,y);
    this.type_selected = choosenDefender;
    this.wonderballShoot = shoot;
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

      if(this.wonderballShoot == true){
        let selected = choosenDefender;
        choosenDefender = this.type_selected;
        wonderballs.push(new TeamworkWonderball(this.x+3*cellSize, this.y, false));
        choosenDefender = selected;
        this.wonderballShoot = false;
      }
  }
}
