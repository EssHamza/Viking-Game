const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.querySelector('#start-btn');
const jumpbtn = document.querySelector('#jump-btn');
const backgroundImg = new Image();
backgroundImg.src  = 'assets/ss.jpg';
const playerImg = new Image ();
playerImg.src = 'assets/bb-removebg-preview.png';
let score = 0 ;
const startSound = new Audio();
startSound.src = 'assets/y2mate.com - Woody Path.mp3';
const player = {
  x : 15,
  y : 280,
  width : 100,
  height: 100,
  jumping: false,
  jumpHeight: 250,
  jumpSpeed: 3,
  initialY: 280,
}
const movingStuff = [];


function getRandomObject() {
  const randomY = Math.random() * (canvas.height - 200) ;
  const randomItem = [
    {
      x : canvas.width,
      y : randomY,
      width : 100,
      height: 100,
      src : 'assets/tresor.png',
    },
    {
      x : canvas.width,
      y : randomY,
      width : 25,
      height: 25,
      src : 'assets/coin.png'
    },
    {
      x : canvas.width,
      y : randomY,
      width : 25,
      height: 25,
      src : 'assets/direction.png'
    },
    {
      x : canvas.width,
      y : randomY,
      width : 25,
      height: 25,
      src : 'assets/knif.png'
    },
    {
      x : canvas.width,
      y : randomY,
      width : 100,
      height: 100,
      src : 'assets/death.png',
    },
    {
      x : canvas.width,
      y : randomY,
      width : 25,
      height: 25,
      src : 'assets/coin.png'
    }
  ];

  return randomItem[Math.floor(Math.random() * randomItem.length)];
}

setInterval(function () {
  const newObject = getRandomObject();
  movingStuff.push(newObject);
}, 2000); 


function moveItems(){for (let i = 0; i < movingStuff.length; i++) {
  const item = movingStuff[i];
  item.x -= 3.5;
  const objectImg = new Image();
  objectImg.src = item.src;
  ctx.drawImage(objectImg, item.x, item.y, item.width, item.height);

  if (item.x + item.width < 0) {
    movingStuff.splice(i, 1);
    i--;
  }
}}

function jump(){
  if (!player.jumping) {
    player.jumping = true;
    let jumpInterval = setInterval(() => {
        player.y -= player.jumpSpeed;
        if (player.y <= player.initialY - player.jumpHeight) {
            clearInterval(jumpInterval);
            fall();
        }
    }, 20);
}
}

function fall() {
let fallInterval = setInterval(() => {
    player.y += player.jumpSpeed;
    if (player.y >= player.initialY) {
        player.y = player.initialY; 
        player.jumping = false;
        clearInterval(fallInterval);
    }
}, 20);
}


function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
  moveItems();
 

  requestAnimationFrame(updateCanvas);
}

startBtn.onclick = function () {
  updateCanvas();
};


document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
      jump();
  }
});

document.addEventListener('click', function () {
  startSound.play().catch(function(error) {
    console.error("Audio play failed:", error);
  });
});
