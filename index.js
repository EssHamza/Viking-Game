const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const backgroundImg = new Image();
backgroundImg.src  = 'assets/ss.jpg';
const playerImg = new Image ();
playerImg.src = 'assets/bb-removebg-preview.png';
const objectImg = new Image();
let score = 0 ;
const startSound = new Audio();
startSound.src = 'assets/y2mate.com - Woody Path.mp3';
const player = {
  x : 15,
  y : 280,
  width : 100,
  height:100,
   
}
const randomItem = [
 {
    x : 100,
    y : 208,
    width : 100,
    height:100,
    src : 'assets/mmm.png',
  },
  
 {
    x : 10,
    y : 208,
    width : 25,
    height:25,
    src : 'assets/mmmmmmmmm.png'
  },
  {
    x : 10,
    y : 208,
    width : 25,
    height:25,
    src : 'assets/mmmmm.png'
  },
  {
    x : 10,
    y : 208,
    width : 25,
    height:25,
    src : 'assets/mmmmmmm.png'
  },{
    x : 200,
    y : 208,
    width : 100,
    height:100,
    src : 'assets/mm.png',
  },
  {
    x : 10,
    y : 208,
    width : 25,
    height:25,
    src : 'assets/mmmmmmmmm.png'
  }
]

let previousRandomObject = null;

function getRandomObject(arr) {
  let randomIndex;
  
  do {
    randomIndex = Math.floor(Math.random() * arr.length);
  } while (previousRandomObject === arr[randomIndex]);

  previousRandomObject = arr[randomIndex];
  return arr[randomIndex];
}


const randomObject = getRandomObject(randomItem);
objectImg.src = randomObject.src; 

  function updateCanvas() {
    ctx.clearRect(0, 0,canvas.width,canvas.height);
    ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height);
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
    ctx.drawImage(objectImg, randomObject.x, randomObject.y, randomObject.width, randomObject.height);
    
  }
  window.onload = function () {
    updateCanvas();
  };
 
  
  document.addEventListener('click', function () {
  startSound.play().catch(function(error) {
    console.error("Audio play failed:", error);
  });
});

