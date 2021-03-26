const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 100;
const paddleHeight = 10;
var playerSpeed = 4;


let leftArrowPressed = false;
let rightArrowPressed = false;
let gameover=false;
//objects

const user = {
  x: canvas.width / 2 - paddleWidth / 2,
  y: canvas.height - 20,
  width: paddleWidth,
  height: paddleHeight,
  color: "#000000",
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
  speed: 4,
  velocityX: 4,
  velocityY: 4,
  color: "#ca03fc",
};
let brickArr=new Array();
  for(let i=0;i<19;i++){
    for(let j=0;j<3;j++){
    //let bricks=new Bricks(canvas.width/2 + i, brick.y,brick.width,brick.height,brick.color);
    let bricks={x:canvas.width-i*33, y:brick.y+j*13, width:brick.width, height:brick.height, color:brick.color};
     brickArr.push(bricks);
    }
  }
  

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

function drawBricks(){
  for(let i=0;i<brickArr.length;i++){
    drawBrick(brickArr[i].x,brickArr[i].y,brickArr[i].width,brickArr[i].height,brickArr[i].color);
  }
}

function render() {
  ctx.fillStyle = "#FFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawPaddle(user.x, user.y, user.width, user.height, user.color);
  drawBall(ball.x, ball.y, ball.radius, ball.color);
  //drawBrick(brick.x,brick.y,brick.width,brick.height,brick.color);

 // drawScore(canvas.width/10,canvas.height/9,user.score);
  //drawBrick(brick.x,brick.y,brick.width,brick.height,brick.color);
  drawBricks();
}



function update() {
let player=user;

  if(rightArrowPressed && user.x>0){
   
    user.x-=playerSpeed;
  }
  else if(leftArrowPressed &&(user.x<canvas.width-user.width)){
    user.x +=playerSpeed;
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
    gameover=true;
    reset();
  }

  if (collisionDetect(player, ball)) {
  
    // default angle is 0deg in Radian
    let angle = 0;
    console.log(player.x + " x " + (player.width / 2));
    console.log(ball.x);
    // if ball hit middle ppadle

      //if ball hit left side paddle
    if (ball.x < (player.x + player.width / 2)) {
        if(ball.x>(player.x+player.width / 8)){
      //-45 deg
          angle = -1 * Math.PI / 4;
      
        }
        else{
        //-60 deg
          angle = -1 * Math.PI /3;
      
        }
    }
    //if ball hit right side
    else if (ball.x > (player.x + player.width / 2)) {
      if(ball.x>(player.x+player.width / 2+player.width / 8)){
        //60 deg
            angle = Math.PI / 3;
        
          }
          else{
          //45 deg
            angle = Math.PI /4;
        
          }
      //angle =  Math.PI / 4;
      
    }
  


    /* change velocity of ball according to on which paddle the ball hit */
    ball.velocityY =  -1*ball.speed*1 * Math.cos(angle);
    ball.velocityX = ball.speed*1 * Math.sin(angle);

    // increase ball speed
    ball.speed += 1;
    //increase player speed?
    playerSpeed += 2;
  }
  /*
  if(collisionDetect(brick,ball)){
    console.log("hit");
    brick.x=1000;
    brick.color="#0000"
    user.score++;
  }
  */
 //when brick collides with ball
  for(let i =0;i<brickArr.length;i++){
    if(collisionDetect(brickArr[i],ball)){
      brickArr[i].x=1000;
    brickArr[i].color="#0000"
    user.score++;
    document.getElementById("score").innerHTML=user.score;
    ball.velocityY=-ball.velocityY;
    ball.velocityX=-ball.velocityX;  

  }
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
//copy of method, gonna change it
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
  ball.speed=2;
  playerSpeed=4;

ball.velocityY=-ball.velocityY;
ball.velocityX=-ball.velocityX;

}
//moving
window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {
 
  switch (event.keyCode) {
    case 39:
      leftArrowPressed = true;
      break;
    case 37:
      rightArrowPressed = true;
      break;
  }
}
function keyUpHandler(event) {
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
  if(user.score===57){
    drawScore(canvas.width/4,canvas.height/4,"refresh the page to restart");
  }
  else{
  update();
  render();
  }
}

setInterval(gameLoop, 100 / 60);

