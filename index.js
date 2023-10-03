const img = new Image();
img.src = './assets/ss.jpg';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const backgroundImage = {
  img: img,
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage.img, backgroundImage.x, backgroundImage.y, backgroundImage.width, backgroundImage.height);
  requestAnimationFrame(updateCanvas);
}

// Wait for the image to load before starting to update the canvas
img.onload = updateCanvas;
