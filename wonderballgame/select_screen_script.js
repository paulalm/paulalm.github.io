

//catalogo
const catalogImg = new Image();
catalogImg.src = 'assets/world_choose.png';

const catalogBtn ={
  x: 10,
  y: 10,
  width: 200,
  height: 200,
  img: catalogImg
};

function handleCatalogBtn(){
  if(collision(catalogBtn, mouse) && mouse.clicked){
    console.log("collision", mouse.x, mouse.y)
    window.location.assign("./world.html")
  }
}

function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height);

  ctx.strokeRect(catalogBtn.x, catalogBtn.y, catalogBtn.width, catalogBtn.height);
  ctx.drawImage(catalogBtn.img, 0, 0, 200, 200, catalogBtn.x, catalogBtn.y, catalogBtn.width, catalogBtn.height);

  ctx.fillStyle='black';
  ctx.font = '30px Orbitron';
  ctx.fillText('Feli! This is your game, click the soup to start', 0, 245);

  handleCatalogBtn();
  requestAnimationFrame(animate);
}

animate();
