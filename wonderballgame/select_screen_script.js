

//catalogo
const catalogImg = new Image();
catalogImg.src = 'assets/world_choose.png';

let dialogTime = 0;

const l1Btn ={
  x: 750,
  y: 485,
  width: 45,
  height: 45
};

const l2Btn ={
  x: 700,
  y: 475,
  width: 45,
  height: 45
};

const l3Btn ={
  x: 600,
  y: 465,
  width: 45,
  height: 45
};

//catalogo
const startScreenImg = new Image();
startScreenImg.src = 'assets/map.jpg';

const welcomeDialogImg = new Image();
welcomeDialogImg.src = 'dialogmarie/Slide3.PNG';

var player = document.getElementById("myVideo");
player.addEventListener("ended", function() {
  player.parentNode.removeChild(player);
  var audioPlayer = document.getElementById("menuAudio");
  audioPlayer.src = "assets/mapsong.mp3";
  canvasPosition = canvas.getBoundingClientRect();
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.drawImage(welcomeDialogImg, 0, 0, 2959, 1881, 10,10,canvas.width, canvas.height);
  dialog();
});

function dialog(){
  dialogTime +=1;
  if(dialogTime > 500){
    animate();
  }
  requestAnimationFrame(dialog);
}

function handleBtn(){
  if(collision(l1Btn, mouse) && mouse.clicked){
    window.location.assign("./world.html");
  }
  else if(collision(l2Btn, mouse) && mouse.clicked){
    window.location.assign("./poolWorld.html");
  }
  else if(collision(l3Btn, mouse) && mouse.clicked){
    window.location.assign("./forestWorld.html");
  }
}

function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.drawImage(startScreenImg, 0, 0, 1300, 900, 10,10,canvas.width, canvas.height);

  ctx.strokeStyle='blue';
  ctx.strokeRect(l1Btn.x, l1Btn.y, l1Btn.width, l1Btn.height);
  ctx.strokeRect(l2Btn.x, l2Btn.y, l2Btn.width, l2Btn.height);
  ctx.strokeRect(l3Btn.x, l3Btn.y, l3Btn.width, l3Btn.height);
  //ctx.drawImage(catalogBtn.img, 0, 0, 200, 200, catalogBtn.x, catalogBtn.y, catalogBtn.width, catalogBtn.height);

  ctx.fillStyle='black';
  ctx.font = '20px Orbitron';
  ctx.fillText('Feli! This is your game, click a world to start', 120, 80);

  handleBtn();
  requestAnimationFrame(animate);
}

audioEl = document.getElementById("menuAudio");
audioEl.src = "assets/menusong.mp3";
