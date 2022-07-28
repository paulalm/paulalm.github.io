const wonderballTypes = [];
const allTypes = [];

//types
const producer = 0;
const distanceshoot = 1;
const defenser = 2;
const contactshoot = 3;
const timedshoot = 4;

const wonderball1 = new Image();
wonderball1.src = 'wonderballs/wonderball1.png';
wonderballTypes.push(wonderball1);

const card1 = {
  img: wonderballTypes[0],
  cost: 200,
  defense: 0.08,
  power: 35,
  health: 100,
  type: distanceshoot,
  projectile_img :  null,
  shootingFrames : 1,
  restingFrames : 1,
  shootFrame : 2
}
allTypes.push(card1);

const wonderball2 = new Image();
wonderball2.src = 'wonderballs/girasol.png';
wonderballTypes.push(wonderball2);

const card2 = {
  img: wonderballTypes[1],
  cost: 50,
  defense: 0.02,
  power: 25,
  health: 100,
  type: producer,
  projectile_img :  null,
  shootingFrames : 1,
  restingFrames : 1
}
allTypes.push(card2);

const wonderball3 = new Image();
wonderball3.src = 'wonderballs/lanzaguisantes.png';
wonderballTypes.push(wonderball3);

const card3 = {
  img: wonderballTypes[2],
  cost: 100,
  defense: 0.05,
  power: 20,
  health: 100,
  type: distanceshoot,
  projectile_img :  null,
  shootingFrames : 1,
  restingFrames : 1,
  shootFrame : 2
}
allTypes.push(card3);

const wonderball4 = new Image();
wonderball4.src = 'wonderballs/nuez.png';
wonderballTypes.push(wonderball4);

const card4 = {
  img: wonderballTypes[3],
  cost: 80,
  defense: 0,
  power: 0,
  health: 300,
  type: defenser,
  projectile_img :  null,
  shootingFrames : 1,
  restingFrames : 1
}
allTypes.push(card4);

const wonderball5 = new Image();
wonderball5.src = 'wonderballs/doudis.png';
wonderballTypes.push(wonderball5);

const card5 = {
  img: wonderballTypes[4],
  cost: 0,
  defense: 0.05,
  power: 0,
  health: 50,
  type: contactshoot,
  projectile_img:  null,
  shootingFrames : 1,
  restingFrames : 1,
  shootFrame : 2
}
allTypes.push(card5);

const melon = new Image();
melon.src = 'wonderballs/melon.png';

const wonderball6 = new Image();
wonderball6.src = 'wonderballs/melonpulta.png';
wonderballTypes.push(wonderball6);

const card6 = {
  img: wonderballTypes[5],
  cost: 225,
  defense: 0.1,
  power: 40,
  health: 100,
  type: distanceshoot,
  projectile_img: melon,
  shootingFrames : 1,
  restingFrames : 1,
  shootFrame : 2
}
allTypes.push(card6);

//cloudino
const wonderball7 = new Image();
wonderball7.src = 'wonderballs/cloudino.png';
wonderballTypes.push(wonderball7);

const card7 = {
  img: wonderballTypes[6],
  cost: 125,
  defense: 0.13,
  power: 35,
  health: 125,
  type: distanceshoot,
  projectile_img: null,
  shootingFrames : 1,
  restingFrames : 1,
  shootFrame: 2
}
allTypes.push(card7);

//doudiscarta
const lanza = new Image();
lanza.src = 'wonderballs/flecha.png';

const wonderball8 = new Image();
wonderball8.src = 'wonderballs/doudiscarta.png';
wonderballTypes.push(wonderball8);

const card8 = {
  img: wonderballTypes[7],
  cost: 125,
  defense: 0.15,
  power: 50,
  health: 300,
  type: distanceshoot,
  projectile_img: lanza,
  shootingFrames : 1,
  restingFrames : 1,
  shootFrame: 2
}
allTypes.push(card8);

const wonderball9 = new Image();
wonderball9.src = 'wonderballs/arcoiris.png';
wonderballTypes.push(wonderball9);

const card9 = {
  img: wonderballTypes[8],
  cost: 200,
  defense: 0.3,
  power: 50,
  health: 150,
  type: timedshoot,
  projectile_img: null,
  shootingFrames : 3,
  restingFrames : 0,
  shootFrame: 2
}
allTypes.push(card9);

const wonderball11 = new Image();
wonderball11.src = 'wonderballs/frailejon.png';
wonderballTypes.push(wonderball11);

const fraiproy = new Image();
fraiproy.src = 'wonderballs/fraiproy.png';

const card11 = {
  img: wonderball11,
  cost: 200,
  defense: 0.2,
  power: 18,
  health: 250,
  type: distanceshoot,
  projectile_img: fraiproy,
  shootingFrames : 2,
  restingFrames : 1,
  shootFrame: 2
}
allTypes.push(card11);


const wonderball10 = new Image();
wonderball10.src = 'wonderballs/dilan.png';
wonderballTypes.push(wonderball10);

const dilanproy = new Image();
dilanproy.src = 'wonderballs/dilanproy.png';

const card10 = {
  img: wonderball10,
  cost: 150,
  defense: 0.2,
  power: 25,
  health: 150,
  type: distanceshoot,
  projectile_img: dilanproy,
  shootingFrames : 3,
  restingFrames : 1,
  shootFrame: 3
}
allTypes.push(card10);
