"USE STRICT"

let header = document.getElementById("header");

//board
var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var ctx;

//snake head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;
console.log(snakeX);
var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food 
var foodX;
var foodY;

//score
let score = 0;
var gameOver = false;
let hs = document.getElementById('highscore');
//local storage score
let highscoreSesh = localStorage.getItem('highscore');



//game load
window.onload = function() {
 board = document.getElementById("board");
 board.height = rows * blocksize;
 board.width = cols * blocksize;
 ctx = board.getContext("2d"); //used for drawing on board

 //generate food
 placeFood();
 document.addEventListener("keyup", changeDirection);

 //update canvas
 setInterval(update, 1000/10); //100 milliseconds

 //restart button
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
 hs.textContent = highscoreSesh;

 //handles eating of food, creates new green square
 if(snakeX == foodX && snakeY == foodY){
  snakeBody.push([foodX, foodY]);
  score++;
  placeFood();
  playFoodSound();

  //if saved score less than current score, set saved score to current
  if(highscoreSesh < score){
    localStorage.setItem('highscore', score);
    hs.textContent = score;
  }
  
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
    //out of bounds
 if(snakeX < 0 || snakeX > cols*blocksize-1 || snakeY < 0 || snakeY > rows*blocksize-1){
  gameOver = true;
  playGameOver();
  header.textContent = "Game Over";
  header.style.color = "red";
  score = 0;
  hs.textContent = highscoreSesh;
 } 
 //hits itself
 for(let i = 0; i<snakeBody.length; i++){
  if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
   gameOver = true;
   playGameOver();
   header.textContent = "Game Over";
   header.style.color = "red"; 
   score = 0;
   hs.textContent = highscoreSesh;
  }
 }
 //show score
 let sc = document.getElementById('score');
 sc.textContent = score;
 hs.textContent = localStorage.getItem('highscore');
}


//change directions
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

//generate food
function placeFood(){ 
 //0-1) * cols ->(0-19.9999) -> (0-19)   * 25
 foodX = Math.floor(Math.random() * cols) * blocksize;
 foodY = Math.floor(Math.random() * rows) * blocksize;
}


//sounds
function playFoodSound(){
    let sound = new Audio("audio/magic.wav");
    sound.play();
}
function playGameOver(){
    let gameOver = new Audio("audio/gameOver.wav");
    gameOver.play();
}

