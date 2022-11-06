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
const support= 7;
const teamwork = 8;
const instant=9;
const powerUp=10;
const trap=11;

//projectile allTypes
const noType = 0;
const straightpath=1;
const randompath = 2;
const arcpath=3;
const penetratingproj = 4;
const nutrientproj=5;
const teledirected=6;

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
  projectile_type: straightpath,
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
  power: 50,
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
  projectile_type: straightpath,
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
  projectile_type: noType,
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
  defense: 0.50,
  power: 22,
  health: 100,
  type: contactshoot,
  projectile_img:  null,
  projectile_type: noType,
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
  projectile_type: arcpath,
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
  defense: 1,
  power: 35,
  health: 125,
  type: distanceshoot,
  projectile_img: null,
  projectile_type: arcpath,
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
  projectile_type: arcpath,
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
  defense: 0.67,
  power: 50,
  health: 150,
  type: timedshoot,
  projectile_img: null,
  projectile_type: noType,
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
  projectile_type: arcpath,
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
  defense: 0.34,
  power: 75,
  health: 150,
  type: distanceshoot,
  projectile_img: dilanproy,
  projectile_type: arcpath,
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
  defense: 0.32,
  power: 300,
  health: 567,
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
  projectile_type: arcpath,
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
  projectile_type: noType,
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
  projectile_type: arcpath,
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
  power: 125,
  health: 180,
  type: distanceshoot,
  projectile_img: wonderball16pry,
  projectile_type: straightpath,
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
  projectile_type: noType,
  shootingFrames : 1,
  restingFrames : 0,
  rechargeFrames: 1,
  shootFrame:1
}
allTypes.push(card17);

const wonderball18 = new Image();
wonderball18.src = 'wonderballs/crabball.png';
wonderballTypes.push(wonderball18);

const card18 = {
  img: wonderball18,
  cost: 275,
  defense: 0.7,
  power: 200,
  health: 340,
  type: contactshoot,
  projectile_img: null,
  projectile_type: noType,
  shootingFrames : 9,
  restingFrames : 3,
  rechargeFrames: 1,
  shootFrame:12
}
allTypes.push(card18);

const wonderball19 = new Image();
wonderball19.src = 'wonderballs/pinball.png';
wonderballTypes.push(wonderball19);

const wonderball19proy = new Image();
wonderball19proy.src = 'wonderballs/pinproy.png';

const card19 = {
  img: wonderball19,
  cost: 125,
  defense: 0.12,
  power: 234,
  health: 300,
  type: distanceshoot,
  projectile_img: wonderball19proy,
  projectile_type:randompath,
  shootingFrames : 3,
  restingFrames : 2,
  rechargeFrames: 0,
  shootFrame:3
}
allTypes.push(card19);

const wonderball20 = new Image();
wonderball20.src = 'wonderballs/newgunbird.png';
wonderballTypes.push(wonderball20);

const wonderball20proy = new Image();
wonderball20proy.src = 'wonderballs/newgunbirdproy.png';

const card20 = {
  img: wonderball20,
  cost: 75,
  defense: 0.34,
  power:32,
  health: 140,
  type: support,
  projectile_img: wonderball20proy,
  projectile_type:penetratingproj,
  shootingFrames : 2,
  restingFrames : 2,
  rechargeFrames: 0,
  shootFrame:2
}
allTypes.push(card20);

const wonderball21 = new Image();
wonderball21.src = 'wonderballs/axebird.png';
wonderballTypes.push(wonderball21);

const wonderball21proy = new Image();
wonderball21proy.src = 'wonderballs/axebirdproy.png';

const card21 = {
  img: wonderball21,
  cost: 200,
  defense: 30,
  power: 200,
  health: 348,
  type: contactshoot,
  projectile_img: null,
  projectile_type:null,
  shootingFrames : 2,
  restingFrames : 2,
  rechargeFrames: 0,
  shootFrame:2
}
allTypes.push(card21);

const wonderball22 = new Image();
wonderball22.src = 'wonderballs/bravebird.png';
wonderballTypes.push(wonderball22);

const wonderball22proy = new Image();
wonderball22proy.src = 'wonderballs/bravebirdproy.png';

const card22 = {
  img: wonderball22,
  cost: 200,
  defense: 30,
  power: 200,
  health: 409,
  type: contactshoot,
  projectile_img: null,
  projectile_type:null,
  shootingFrames : 2,
  restingFrames : 1,
  rechargeFrames: 0,
  shootFrame:2
}
allTypes.push(card22);

const wonderball23 = new Image();
wonderball23.src = 'wonderballs/pugbert.png';
wonderballTypes.push(wonderball23);

const wonderball23proy = new Image();
wonderball23proy.src = 'wonderballs/pugproy.png';

const card23 = {
  img: wonderball23,
  cost: 300,
  defense: 1,
  power: 0,
  health: 200,
  type: contactshoot,
  projectile_img: null,
  projectile_type:null,
  shootingFrames : 1,
  restingFrames : 2,
  rechargeFrames: 0,
  shootFrame:3
}
allTypes.push(card23);

const wonderball24 = new Image();
wonderball24.src = 'wonderballs/megagunbird.png';
wonderballTypes.push(wonderball24);

const wonderball24proy = new Image();
wonderball24proy.src = 'wonderballs/megagunbirdproy.png';

const card24 = {
  img: wonderball24,
  cost: 220,
  defense: 346,
  power: 200,
  health: 120,
  type: distanceshoot,
  projectile_img: wonderball24proy,
  projectile_type:penetratingproj,
  shootingFrames : 2,
  restingFrames : 3,
  rechargeFrames: 0,
  shootFrame:5
}
allTypes.push(card24);

const wonderball25 = new Image();
wonderball25.src = 'wonderballs/doudistenista.png';
wonderballTypes.push(wonderball25);

const wonderball25proy = new Image();
wonderball25proy.src = 'wonderballs/doudistenistaproy.png';

const card25 = {
  img: wonderball25,
  cost: 150,
  defense: 0.45,
  power: 100,
  health: 100,
  type: teamwork,
  projectile_img: wonderball25proy,
  projectile_type: straightpath,
  shootingFrames : 4,
  restingFrames : 2,
  rechargeFrames: 0,
  shootFrame:5
}
allTypes.push(card25);


const wonderball26 = new Image();
wonderball26.src = 'wonderballs/appel.png';
wonderballTypes.push(wonderball26);

const wonderball26proy = new Image();
wonderball26proy.src = 'wonderballs/nutriente.png';

const card26 = {
  img: wonderball26,
  cost: 200,
  defense: 0.20,
  power: 150,
  health: 100,
  type:distanceshoot,
  projectile_img: wonderball26proy,
  projectile_type: nutrientproj,
  shootingFrames : 7,
  restingFrames : 6,
  rechargeFrames: 0,
  shootFrame:9
}
allTypes.push(card26);

const wonderball27 = new Image();
wonderball27.src = 'wonderballs/terrorbird.png';
wonderballTypes.push(wonderball27);

const wonderball27proy = new Image();
wonderball27proy.src = 'wonderballs/nutriente.png';

const card27 = {
  img: wonderball27,
  cost: 150,
  defense: 0.20,
  power: 35,
  health: 250,
  type:contactshoot,
  projectile_img: wonderball27proy,
  projectile_type: nutrientproj,
  shootingFrames : 3,
  restingFrames : 2,
  rechargeFrames: 0,
  shootFrame:3
}
allTypes.push(card27);

const wonderball28 = new Image();
wonderball28.src = 'wonderballs/horrorbird.png';
wonderballTypes.push(wonderball28);

const wonderball28proy = new Image();
wonderball28proy.src = 'wonderballs/nutriente.png';

const card28 = {
  img: wonderball28,
  cost: 240,
  defense: 0.50,
  power: 80,
  health: 350,
  type:contactshoot,
  projectile_img: wonderball28proy,
  projectile_type: nutrientproj,
  shootingFrames : 3,
  restingFrames : 2,
  rechargeFrames: 0,
  shootFrame:3
}
allTypes.push(card28);


const wonderball29 = new Image();
wonderball29.src = 'wonderballs/hammerbird.png';
wonderballTypes.push(wonderball29);


const card29 = {
  img: wonderball29,
  cost: 250,
  defense: 0.35,
  power: 0,
  health: 150,
  type:contactshoot,
  projectile_img: null,
  projectile_type: noType,
  shootingFrames : 4,
  restingFrames : 2,
  rechargeFrames: 0,
  shootFrame:3
}
allTypes.push(card29);

const wonderball30 = new Image();
wonderball30.src = 'wonderballs/rabodegato.png';
wonderballTypes.push(wonderball30);

const wonderball30proy = new Image();
wonderball30proy.src = 'wonderballs/rabodegatoproy.png';

const card30 = {
  img: wonderball30,
  cost: 250,
  defense: 0.50,
  power: 35,
  health: 200,
  type:distanceshoot,
  projectile_img: wonderball30proy,
  projectile_type: teledirected,
  shootingFrames : 3,
  restingFrames : 1,
  rechargeFrames: 0,
  shootFrame:3
}
allTypes.push(card30);

const wonderball31 = new Image();
wonderball31.src = 'wonderballs/pozoliva.png';
wonderballTypes.push(wonderball31);


const card31 = {
  img: wonderball31,
  cost: 175,
  defense: 0.50,
  power: 20000,
  health: 200,
  type:trap,
  projectile_img: null,
  projectile_type: null,
  shootingFrames : 0,
  restingFrames : 8,
  rechargeFrames: 3,
  shootFrame:12
}
allTypes.push(card31);
