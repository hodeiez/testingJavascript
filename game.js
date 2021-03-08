const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 100;
const paddleHeight = 10;
let leftArrowPressed = false;
let rightArrowPressed = false;

//objects

const user = {
  x: canvas.width / 2 - paddleWidth / 2,
  y: canvas.height - 20,
  width: paddleWidth,
  height: paddleHeight,
  color: "#FFFFFF",
  score: 0,
};
const brick = {
  x: canvas.width / 2 - paddleWidth / 2,
  y: canvas.height-(canvas.height-10),
  width:30,
  height:10,
  color: "#03fc6f",
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 7,
  speed: 1,
  velocityX: 1,
  velocityY: 1,
  color: "#ca03fc",
};

//draw
function drawScore(x,y,score){
  ctx.fillStyle = '#fff';
  ctx.font = '35px sans-serif';
  ctx.fillText(score, x, y);
}
function drawPaddle(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}
function drawBall(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}
function drawBrick(x,y,width,height,color){

  ctx.fillStyle=color;

  ctx.fillRect(x,y,width,height);

}
function render() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawPaddle(user.x, user.y, user.width, user.height, user.color);
  drawBall(ball.x, ball.y, ball.radius, ball.color);

  drawBrick(brick.x,brick.y,brick.width,brick.height,brick.color);
  drawScore(canvas.width/10,canvas.height/9,user.score);
  //drawBrick(brick.x,brick.y,brick.width,brick.height,brick.color);
}



function update() {
let player=user;

  if(rightArrowPressed && user.x>0){
   
    user.x-=8;
  }
  else if(leftArrowPressed &&(user.x<canvas.width-user.width)){
    user.x +=8;
  }


  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  if(ball.y + ball.radius >= canvas.height||ball.y-ball.radius<= 0){
    ball.velocityY=-ball.velocityY;
  }
  else if(ball.x+ball.radius>=canvas.width || ball.x-ball.radius<=0){
    ball.velocityX=-ball.velocityX; 
  }
  if(ball.y + ball.radius>=canvas.height){
    reset();
  }
//TODO: fix the angle depending on where in player hits
  if (collisionDetect(player, ball)) {
    // play hitSound
   
    // default angle is 0deg in Radian
    let angle = 0;

    // if ball hit the top of paddle
    if (ball.y < (player.y + player.height / 2)) {
    
      // then -1 * Math.PI / 4 = -45deg
      angle = -1 * Math.PI / 4;
    } else if (ball.y > (player.y + player.height / 2)) {
      
      // then angle will be Math.PI / 4 = 45deg
      angle = Math.PI / 4;
      
    }
  


    /* change velocity of ball according to on which paddle the ball hitted */
    ball.velocityY =  -1*ball.speed*0.1 * Math.cos(angle);
    ball.velocityX = ball.speed*0.1 * Math.sin(angle);

    // increase ball speed
    ball.speed += 0.2;
  }
  if(collisionDetect(brick,ball)){
    console.log("hit");
    brick.x=1000;
    brick.color="#0000"
    user.score++;
  }
}
function collisionDetect(player, ball) {
  // returns true or false
  player.top = player.y;
  player.right = player.x + player.width;
  player.bottom = player.y + player.height;
  player.left = player.x;

  ball.top = ball.y - ball.radius;
  ball.right = ball.x + ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;


 // return ball.top < player.top;
  return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}
function brickCollisionDetect(player, ball) {
  // returns true or false
  player.top = player.y;
  player.right = player.x + player.width;
  player.bottom = player.y + player.height;
  player.left = player.x;

  ball.top = ball.y - ball.radius;
  ball.right = ball.x + ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;

 // return ball.top < player.top;
  return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}
function reset(){
  ball.x=canvas.width/2;
  ball.y=canvas.height/2;
  ball.speed=7;

ball.velocityY=-ball.velocityY;
ball.velocityX=-ball.velocityX;
}
//moving
window.addEventListener('keydown', keyLeftHandler);
window.addEventListener('keyup', keyRightHandler);
function keyLeftHandler(event) {
 
  switch (event.keyCode) {
    case 39:
      leftArrowPressed = true;
      break;
    case 37:
      rightArrowPressed = true;
      break;
  }
}
function keyRightHandler(event) {
  switch (event.keyCode) {
    case 39:
      leftArrowPressed = false;
      break;
    case 37:
      rightArrowPressed = false;
      break;
  }
}
function gameLoop() {
  update();
  render();
}
setInterval(gameLoop, 100 / 60);
//testin to move elements by cursor
/*
function detectKey(e) {
  let player = document.getElementById("player");
  let screen = document.getElementById("screen");
const speed=10;
  //console.log("screen width " + screen.getBoundingClientRect().width);
  //console.log("screen height " + screen.getBoundingClientRect().height);
  //console.log(player.getBoundingClientRect().x+' p position');

  let posLeft2 = player.offsetLeft;
  let posLeft=screen.offsetLeft;
  let posTop = player.offsetTop;
  
  //console.log("posTop " + posTop);
  //console.log("posLeft " + posLeft);
  e = e || window.event;

  if (e.keyCode == "32") {
    // up arrow
    player.style.marginTop = posTop - speed * 4 + "px";
    //player.top((posTop-58*4)+"px");
  } else if (e.keyCode == "40") {
    // down arrow
    player.style.marginTop = posTop + speed + "px";
  } else if (e.keyCode == "37") {
    // left arrow
    player.style.marginLeft = posLeft-posLeft2 - speed + "px";
   // player.style.rotate = "45deg";
  } else if (e.keyCode == "39") {
    // right arrow
    player.style.marginLeft = posLeft + speed + "px";
  }
  if (posTop < document.getElementById("screen").offsetTop) {
    document.getElementById("player").style.backgroundColor = "red";
    document.getElementById("player").style.marginTop = posTop + "px";
    console.log(posTop);
  }
}

*/
