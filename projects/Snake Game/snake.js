
//board
var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var ctx;



//snake head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;
var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food 
var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
 board = document.getElementById("board");
 board.height = rows * blocksize;
 board.width = cols * blocksize;
 ctx = board.getContext("2d"); //used for drawing on board
 
 placeFood();
 document.addEventListener("keyup", changeDirection);

 //update
 setInterval(update, 1000/10); //100 milliseconds

 //restart
 let button = document.getElementById("button");
 button.onclick=function(){
  location.reload();
 }
}



function update(){
if(gameOver){
 return;
}

 //canvas
 ctx.fillStyle="black";
 ctx.fillRect(0, 0, board.width, board.height);

 //food
 ctx.fillStyle="red";
 ctx.fillRect(foodX, foodY, blocksize, blocksize);

 //handles eating of food, creates new green square
 if(snakeX == foodX && snakeY == foodY){
  snakeBody.push([foodX, foodY]);
  placeFood();

 }

 //attach head to body
 for(let i = snakeBody.length-1; i>0; i--){
  snakeBody[i] = snakeBody[i - 1];
 }
 if(snakeBody.length) {
  snakeBody[0] = [snakeX, snakeY];
 }


 //snake
 ctx.fillStyle="lime";
 snakeX += velocityX * blocksize;
 snakeY += velocityY * blocksize;
 ctx.fillRect(snakeX, snakeY, blocksize, blocksize);
 for(let i = 0; i <snakeBody.length; i++){
  ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
 }

 //game over conditions
 if(snakeX < 0 || snakeX > cols*blocksize-1 || snakeY < 0 || snakeY > rows*blocksize-1){
  gameOver = true;
  alert("Game Over");
 } 
 for(let i = 0; i<snakeBody.length; i++){
  if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
   gameOver = true;
   alert("Game Over");
  }
 }

}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1){
     velocityX = 0;
     velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1){
     velocityX = 0;
     velocityY = 1;
    }else if(e.code == "ArrowLeft" && velocityX != 1){
     velocityX = -1;
     velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX != -1){
     velocityX = 1;
     velocityY = 0;
    }
}

function placeFood(){ 
 //0-1) * cols ->(0-19.9999) -> (0-19)   * 25
 foodX = Math.floor(Math.random() * cols) * blocksize;
 foodY = Math.floor(Math.random() * rows) * blocksize;
}