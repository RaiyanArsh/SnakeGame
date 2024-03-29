const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class snakeAdd {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;
let tile = 20;
let tileSize = canvas.width / tile - 2;
let X = 10;
let Y = 10;
let foodx = 5;
let foody = 5;
const snakeadd = [];
let tail = 2;

let xv = 0;
let yv = 0;
let score = 0;

function drawGame() {
  changePos();
  let result = check();
  if (check()) return;

  clearScreen();

  collison();

  drawFood();
  drawSnake();
  drawScore();
  if (score < 5) {
    setTimeout(drawGame, 1000 / speed);
  }
  if (score >= 5 && score < 10) {
    speed = 9;
    setTimeout(drawGame, 1000 / speed);
  }
  if (score >= 10 && score < 20) {
    speed = 12;
    setTimeout(drawGame, 1000 / speed);
  }
  if (score >= 20) {
    speed = 15;
    setTimeout(drawGame, 1000 / speed);
  }
}

function clearScreen() {
  ctx.fillStyle = "#161515";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
  ctx.fillStyle = "white";
  for (let i = 0; i < snakeadd.length; i++) {
    let part = snakeadd[i];
    ctx.fillRect(part.x * tile, part.y * tile, tileSize, tileSize);
  }
  snakeadd.push(new snakeAdd(X, Y));
  while (snakeadd.length > tail) {
    snakeadd.shift();
  }
  ctx.shadowColor = "wheat"; // Color of the glow
  ctx.shadowBlur = 20; // Blur radius
  ctx.fillStyle = "white";
  ctx.fillRect(X * tile, Y * tile, tileSize, tileSize);
//   ctx.globalAlpha = 0.75;
  ctx.shadowColor = "transparent"; // Reset shadow color
}
function changePos() {
  X = X + xv;
  Y = Y + yv;
}
function drawFood() {
  ctx.fillStyle = "green";
  // ctx.fillRect(foodx * tile,foody *tile,tileSize,tileSize);
  ctx.shadowColor = "green"; // Color of the glow
  ctx.shadowBlur = 15; // Blur radius
  ctx.fillRect(foodx * tile, foody * tile, tileSize, tileSize);
  ctx.shadowColor = "transparent"; // Reset shadow color
}
function collison() {
  if (foodx == X && foody == Y) {
    foodx = Math.floor(Math.random() * tile);
    foody = Math.floor(Math.random() * tile);
    tail++;
    score++;
  }
}
function drawScore() {
  ctx.fillStyle = "aqua";
  ctx.font = "11px Roboto";
  ctx.fillText("Score : " + score, canvas.width - 50, 10);
}
function check() {
  let over = false;
  if (xv == 0 && yv == 0) {
    return false;
  }
  // if(X<0)
  // {
  //     over = true;
  // }
  // else if(X>=tile)
  // {
  //     over=true;
  // }
  // else if(Y<0)
  // {
  //     over = true;
  // }
  // else if(Y>=tile)
  // {
  //     over=true;
  // }

  if (X < 0) {
    X = tile - 1;
  }
  if (X >= tile) {
    X = 0;
  }
  if (Y < 0) {
    Y = tile - 1;
  }
  if (Y >= tile) {
    Y = 0;
  }

  for (let i = 0; i < snakeadd.length; i++) {
    let part = snakeadd[i];
    if (part.x === X && part.y === Y) {
      over = true;
      break;
    }
  }

  if (over) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

    if (over) {
      ctx.fillStyle = "white";
      ctx.font = "50px Verdana";

      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0.05", "red");
      gradient.addColorStop("0.55", "darkblue");
      gradient.addColorStop("1.0", "darkred");
      // Fill with gradient
      ctx.fillStyle = gradient;

      ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    document.body.addEventListener("keydown", reload);
  }
  return over;
}
function reload(a) {
  location.reload();
}

document.body.addEventListener("keydown", keydown);
function keydown(event) {
  if (event.keyCode == 38) {
    if (yv == 1) return;
    yv = -1;
    xv = 0;
  }
  if (event.keyCode == 40) {
    if (yv == -1) return;

    xv = 0;
    yv = 1;
  }
  if (event.keyCode == 37) {
    if (xv == 1) return;
    xv = -1;
    yv = 0;
  }
  if (event.keyCode == 39) {
    if (xv == -1) return;
    xv = 1;
    yv = 0;
  }
}

canvas.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    });

    canvas.addEventListener("touchmove", (event) => {
        const touchEndX = event.touches[0].clientX;
        const touchEndY = event.touches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0) {
                // Right swipe
                if (xv === -1) return;
                xv = 1;
                yv = 0;
            } else {
                // Left swipe
                if (xv === 1) return;
                xv = -1;
                yv = 0;
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                // Down swipe
                if (yv === -1) return;
                xv = 0;
                yv = 1;
            } else {
                // Up swipe
                if (yv === 1) return;
                xv = 0;
                yv = -1;
            }
        }

        // Prevent page scrolling
        event.preventDefault();
    });



drawGame();
