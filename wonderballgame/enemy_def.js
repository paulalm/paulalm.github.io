enemyImages = []
enemyTypes = []

const enemy1 = new Image();
enemy1.src = 'enemies/enemy1.png';
enemyImages.push(enemy1);

const enemyType0 = {
  img: enemyImages[0],
  maxHealth: 100,
  speedFactor: 0.2,
  frameAttack: 3,
  frameBadHealth: 4,
  framesStart: 3,
  framesBadHealth: 2,
  framesAttack: 1
}
enemyTypes.push(enemyType0);

const enemyType1 = {
  img: enemyImages[0],
  maxHealth: 200,
  speedFactor: 0.25,
  frameAttack: 3,
  frameBadHealth: 4,
  framesStart: 3,
  framesBadHealth: 2,
  framesAttack: 1
}
enemyTypes.push(enemyType1);

const enemyType2 = {
  img: enemyImages[0],
  maxHealth: 1000,
  speedFactor: 0.2,
  frameAttack: 3,
  frameBadHealth: 4,
  framesStart: 3,
  framesBadHealth: 2,
  framesAttack: 1
}
enemyTypes.push(enemyType2);
