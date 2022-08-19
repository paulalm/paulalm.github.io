const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d')
canvas.width= 900;
canvas.height = 600;

let canvasPosition = canvas.getBoundingClientRect();


//mouse
const mouse ={
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1,
  clicked: false,
};

canvas.addEventListener('mousemove', function(e){
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener('touchmove', function(e){
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener('mouseleave', function(e){
  mouse.x = undefined;
  mouse.y = undefined;
});

canvas.addEventListener('touchend', function(e){
  mouse.x = undefined;
  mouse.y = undefined;
  mouse.clicked = false;
});

canvas.addEventListener('touchstart', function(e){
  mouse.clicked = true;
});

canvas.addEventListener('mousedown', function(e){
  mouse.clicked = true;
});

canvas.addEventListener('mouseup', function(e){
  mouse.clicked = false;
});


function collision(first, second){
  if( !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y)
  ){
    return true;
  };
}

window.addEventListener('resize', function(){
  canvasPosition = canvas.getBoundingClientRect();
})
