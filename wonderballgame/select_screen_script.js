

//catalogo
const catalogImg = new Image();
catalogImg.src = 'assets/world_choose.png';

const l1Btn ={
  x: 750,
  y: 485,
  width: 45,
  height: 45
};

//catalogo
const startScreenImg = new Image();
startScreenImg.src = 'assets/map.jpg';

var player = document.getElementById("myVideo");
player.addEventListener("ended", function() {
  player.parentNode.removeChild(player);
  var audioPlayer = document.getElementById("menuAudio");
  audioPlayer.src = "assets/mapsong.mp3";
  canvasPosition = canvas.getBoundingClientRect();
  animate();
});

function handleBtn(){
  if(collision(l1Btn, mouse) && mouse.clicked){
    console.log("collision", mouse.x, mouse.y);
    window.location.assign("./world.html");
  }
}

function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.drawImage(startScreenImg, 0, 0, 1300, 900, 10,10,canvas.width, canvas.height);

  ctx.strokeStyle='blue';
  ctx.strokeRect(l1Btn.x, l1Btn.y, l1Btn.width, l1Btn.height);
  //ctx.drawImage(catalogBtn.img, 0, 0, 200, 200, catalogBtn.x, catalogBtn.y, catalogBtn.width, catalogBtn.height);

  ctx.fillStyle='black';
  ctx.font = '20px Orbitron';
  ctx.fillText('Feli! This is your game, click a world to start', 120, 80);

  handleBtn();
  requestAnimationFrame(animate);
}

audioEl = document.getElementById("menuAudio");
audioEl.src = "assets/menusong.mp3";
