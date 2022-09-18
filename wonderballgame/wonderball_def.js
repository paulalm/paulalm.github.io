const wonderballTypes = [];
const allTypes = [];

//types
const producer = 0;
const distanceshoot = 1;
const defenser = 2;
const contactshoot = 3;
const timedshoot = 4;
const general = 5;
const manualshoot = 6;

const selectionImg = new Image();
selectionImg.src = 'wonderballs/seleccion.png';

const selectionChosenImg = new Image();
selectionChosenImg.src = 'wonderballs/seleccion_choosen.png';

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

const sol = new Image();
sol.src = 'wonderballs/sol.png';

const card2 = {
  img: wonderballTypes[1],
  cost: 50,
  defense: 0.02,
  power: 25,
  health: 100,
  type: producer,
  product_img :  sol,
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

const wonderball12 = new Image();
wonderball12.src = 'wonderballs/doudis_gral.png';
wonderballTypes.push(wonderball12);

const card12 = {
  img: wonderball12,
  cost: 300,
  defense: 0.2,
  power: 30,
  health: 200,
  type: general,
  shootingFrames : 4,
  restingFrames : 1,
  shootFrame: 3
}
allTypes.push(card12);


const wonderball13 = new Image();
wonderball13.src = 'wonderballs/ninja.png';
wonderballTypes.push(wonderball13);

const wonderball13pry = new Image();
wonderball13pry.src = 'wonderballs/ninja_proy.png';


const card13 = {
  img: wonderball13,
  cost: 125,
  defense: 0.2,
  power: 30,
  health: 200,
  type: distanceshoot,
  projectile_img: wonderball13pry,
  shootingFrames : 2,
  restingFrames : 1,
  shootFrame: 2
}
allTypes.push(card13);

const wonderball14 = new Image();
wonderball14.src = 'wonderballs/birasol.png';
wonderballTypes.push(wonderball14);

const wonderball14pry = new Image();
wonderball14pry.src = 'wonderballs/soldoble.png';


const card14 = {
  img: wonderball14,
  cost: 125,
  defense: 0.2,
  power: 100,
  health: 100,
  type: producer,
  product_img: wonderball14pry,
  shootingFrames : 1,
  restingFrames : 2
}
allTypes.push(card14);

const wonderball15 = new Image();
wonderball15.src = 'wonderballs/doudisbateador.png';
wonderballTypes.push(wonderball15);

const wonderball15pry = new Image();
wonderball15pry.src = 'wonderballs/batproy.png';


const card15 = {
  img: wonderball15,
  cost: 225,
  defense: 0.35,
  power: 60,
  health: 200,
  type: distanceshoot,
  projectile_img: wonderball15pry,
  shootingFrames : 3,
  restingFrames : 2,
  shootFrame:4
}
allTypes.push(card15);

const wonderball16 = new Image();
wonderball16.src = 'wonderballs/lanzadora.png';
wonderballTypes.push(wonderball16);

const wonderball16pry = new Image();
wonderball16pry.src = 'wonderballs/lanzadoraproy.png';


const card16 = {
  img: wonderball16,
  cost: 200,
  defense: 0.25,
  power: 40,
  health: 180,
  type: distanceshoot,
  projectile_img: wonderball16pry,
  shootingFrames : 2,
  restingFrames : 1,
  shootFrame:1
}
allTypes.push(card16);

const wonderball17 = new Image();
wonderball17.src = 'wonderballs/flormeteorito.png';
wonderballTypes.push(wonderball17);

const wonderball17pry = new Image();
wonderball17pry.src = 'wonderballs/florobjetivo.png';


const card17 = {
  img: wonderball17,
  cost: 525,
  defense: 0.30,
  power: 250,
  health: 400,
  type: manualshoot,
  projectile_img: wonderball17pry,
  shootingFrames : 1,
  restingFrames : 0,
  rechargeFrames: 1,
  shootFrame:1
}
allTypes.push(card17);
