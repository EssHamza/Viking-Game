const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.querySelector('#start-btn');
const scoreDisplay = document.querySelector('#score');
const gameOverScreen = document.querySelector('#game-over-screen');
const gameOverScoreDisplay = document.querySelector('#game-over-score');
const restartBtn = document.querySelector('#restart-btn');
const toHide = document.querySelectorAll('#hide');
const startSound = new Audio('assets/y2mate.com - Woody Path.mp3');
const playerImg = new Image();
playerImg.src = 'assets/bb-removebg-preview.png';
const coinCollisionSound = new Audio('assets/coin.mp3');
const tresorCollisionSound = new Audio('assets/tresorr.mp3');
const directionCollisionSound = new Audio('assets/direction.wav');
const deathCollisionSound = new Audio('assets/Sword.mp3');
const knifCollisionSound = new Audio('assets/Sword.mp3');

const player = {
  x: 15,
  y: 280,
  width: 100,
  height: 100,
  velocityY: 0,
  moveSpeed: 4,
};

const movingObjects = [];
let score = 0;
let isMovingUp = false;
let isMovingDown = false;
let isGameOver = false;

function startGame() {
  startBtn.style.display = 'none';

  
  toHide.forEach(element => {
    element.style.display = 'none';
  });

  
  scoreDisplay.style.display = 'block';

  updateCanvas();
  addEventListeners();
  spawnObjects();

  startSound.volume = 0.3; 

  startSound.play().catch(function (error) {
    console.error("Audio play failed:", error);
  });
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (!isGameOver) {
    drawBackground();
    drawPlayer();
    moveObjects();
    requestAnimationFrame(updateCanvas);
  }
}

function addEventListeners() {
  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
      isMovingUp = true;
    } else if (event.key === 'ArrowDown') {
      isMovingDown = true;
    }
  });

  document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowUp') {
      isMovingUp = false;
    } else if (event.key === 'ArrowDown') {
      isMovingDown = false;
    }
  });
}

function drawBackground() {
  const backgroundImg = new Image();
  backgroundImg.src = 'assets/ss.jpg';
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
  updatePlayerPosition();
}

function moveObjects() {
  for (let i = 0; i < movingObjects.length; i++) {
    const obj = movingObjects[i];
    obj.x -= 3.5;
    drawObject(obj);

    if (obj.x + obj.width < 0) {
      movingObjects.splice(i, 1);
      i--;
    }

    if (checkCollision(player, obj)) {
      handleCollision(obj, i);
    }
  }
}

function updatePlayerPosition() {
  if (isMovingUp) {
    player.velocityY = -player.moveSpeed;
  } else if (isMovingDown) {
    player.velocityY = player.moveSpeed;
  } else {
    player.velocityY = 0;
  }

  player.y += player.velocityY;

  if (player.y >= canvas.height - player.height) {
    player.y = canvas.height - player.height;
  } else if (player.y <= 0) {
    player.y = 0;
  }
}

function spawnObjects() {
  setInterval(function () {
    const randomY = Math.random() * (canvas.height - 200);
    const objectTypes = [
      'assets/tresor.png',
      'assets/coin.png',
      'assets/direction.png',
      'assets/knif.png',
      'assets/death.png',
      'assets/coin.png',
    ];
    const randomType = objectTypes[Math.floor(Math.random() * objectTypes.length)];
    const newObj = {
      x: canvas.width,
      y: randomY,
      width: randomType.includes('coin') ? 25 : 100,
      height: randomType.includes('coin') ? 25 : 100,
      src: randomType,
    };
    movingObjects.push(newObj);
  }, 1600);
}

function drawObject(obj) {
  if (obj.isHidden) {
    return; 
  }
  const objectImg = new Image();
  objectImg.src = obj.src;
  ctx.drawImage(objectImg, obj.x, obj.y, obj.width, obj.height);
}

function checkCollision(player, obj) {
  return (
    player.x < obj.x + obj.width &&
    player.x + player.width > obj.x &&
    player.y < obj.y + obj.height &&
    player.y + player.height > obj.y
  );
}

function handleCollision(obj, index) {
  let itemScore = 0;

  switch (obj.src) {
    case 'assets/coin.png':
      itemScore = 10;
      coinCollisionSound.play().catch(function (error) {
        console.error("Coin collision sound play failed:", error);
      });
      break;
    case 'assets/tresor.png':
      itemScore = 100;
      tresorCollisionSound.play().catch(function (error) {
        console.error("Tresor collision sound play failed:", error);
      });
      break;
    case 'assets/direction.png':
      itemScore = 50;
      directionCollisionSound.play().catch(function (error) {
        console.error("Direction collision sound play failed:", error);
      });
      break;
    case 'assets/death.png':
    case 'assets/knif.png':
      deathCollisionSound.play().catch(function (error) {
        console.error("Death collision sound play failed:", error);
      });
      gameOver();
      break;
    default:
      itemScore = 0;
      break;
  }

  score += itemScore;
  scoreDisplay.textContent = 'Score: ' + score;

  movingObjects[index].isHidden = true;
  setTimeout(() => {
    movingObjects.splice(index, 1);
  }, 0);
}



function gameOver() {
  isGameOver = true;
 
  scoreDisplay.style.display = 'none';
  canvas.style.display = 'none';
  startSound.pause();
  
  gameOverScreen.style.display = 'block';
  gameOverScoreDisplay.textContent = score;
  cancelAnimationFrame()
}

restartBtn.addEventListener('click', function () {
  location.reload(); 
});

startBtn.addEventListener('click', startGame);
