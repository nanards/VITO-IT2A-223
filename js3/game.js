const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");
cvs.style.border = "2px solid #0ff";
ctx.lineWidth = 3;
 
 const PADDLE_WIDTH = 100;
 const PADDLE_MARGIN_BOTTOM = 50;
 const PADDLE_HEIGHT = 20;
 const BALL_RADIUS = 8;
 let LIFE = 3;
 let LEVEL =1;
 const MAX_LEVEL = 4;
 let SCORE = 0;
 let SCORE_UNIT = 10;
 let leftArrow =false;
 let rightArrow = false;
 let GAME_OVER = false;

const paddle = {
    x: cvs.width/2 - PADDLE_WIDTH/2,
    y: cvs.height - PADDLE_MARGIN_BOTTOM -PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dx: 5
}

function drawPaddle(){
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x,paddle.y,paddle.width,paddle.height);
    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x,paddle.y,paddle.width,paddle.height);
}

//control paddle

document.addEventListener("keydown",function(event){
    if(event.keyCode== 37)
    {
        leftArrow = true;
    }
    else if(event.keyCode == 39)
    {
        rightArrow = true;
    }
});

document.addEventListener("keyup",function(event){
    if(event.keyCode== 37)
    {
        leftArrow = false;
    }
    else if(event.keyCode == 39)
    {
        rightArrow = false;
    }
});

//move paddle 

function movePladdle(){
    if(rightArrow  && paddle.x + paddle.width < cvs.width)
    {
        paddle.x += paddle.dx;
    }
    else if(leftArrow && paddle.x> 0)
    {
        paddle.x -=paddle.dx;
    }
}

//create ball

const ball  = {

    x: cvs.width/2,
    y: paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : 4,
    dx: 3*(Math.random()*2 -1),
    dy : -3
}

//Draw ball

function drawBall(){

    ctx.beginPath();

    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
    ctx.fillStyle = "#ffcd05"
    ctx.fill();
    ctx.strokeStyle = "#2e3548";
    ctx.stroke();
    ctx.closePath();
}

//move ball

function moveBall()
{
    ball.x += ball.dx;
    ball.y += ball.dy;
}

//reset ball

function resetBall()
{
    ball.x  = cvs.width/2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3*(Math.random()*2 -1);
    ball.dy = -3;
}

//ball and wall collision detector

function ballWallCollision()
{
    if(ball.x + ball.radius >= cvs.width  || ball.x - ball.radius <= 0)
    {
        WALL_HIT.play();
        ball.dx = -ball.dx;
    }

    if(ball.y -ball.radius <= 0)
    {
        WALL_HIT.play();
        ball.dy = -ball.dy;
    }

    if(ball.y + ball.radius >= cvs.height)
    {
        LIFE_LOST.play();
        LIFE--;
        resetBall();
    }
}

//ball and paddle collision detector

function ballPaddleCollision()
{
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && ball.y < paddle.y + paddle.height && ball.y>paddle.y)
    {
        PADDLE_HIT.play();
 
        //check where the ball hit the paddle
        let collisionPoint = ball.x - (paddle.x + paddle.width/2);

        //noramlise the values
        collisionPoint = (collisionPoint / (paddle.width/2));

        //calculte the angle
         let angle = collisionPoint * Math.PI/3;
        ball.dx = ball.speed*Math.sin(angle);
        ball.dy = -ball.speed*Math.cos(angle);
    }
}

//create the bricks

const brick = {
    row : 1,
    column :5,
    width : 55,
    height: 20,
    offSetLeft: 20,
    offSettop: 20,
    marginTop: 40,
    fillColor: "#2e3548",
    strokeColor: "#FFF"
}

let bricks = [];

function createBrick()
{
    for(let r=0;r<brick.row;r++)
    {
        bricks[r] = [];
        for(let c=0;c<brick.column;c++)
        {
            bricks[r][c] ={
                x:c*(brick.offSetLeft + brick.width) + brick.offSetLeft,
                y:r*(brick.offSettop + brick.height) + brick.offSettop + brick.marginTop,
                status: true
            }
        }
    }
}

createBrick();

//draw bricks

function drawBricks()
{
    for(let r=0;r<brick.row;r++)
    {
        for(let c=0;c<brick.column;c++)
        {
            let b=bricks[r][c];
            if(b.status)
            {
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x,b.y,brick.width,brick.height);
                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(b.x,b.y,brick.width,brick.height);

            }
        }
    }
}

//ball brick collision detector

function ballBrickCollision()
{
    for(let r=0;r<brick.row;r++)
    {
        for(let c=0;c<brick.column;c++)
        {
            let b=bricks[r][c];
           if(b.status)
           {
               if(ball.x + ball.radius >b.x && ball.x -ball.radius < b.x + brick.width && ball.y + ball.radius >b.y && ball.y-ball.radius<b.y+brick.height)
               {
                   BRICK_HIT.play();
                   ball.dy = -ball.dy;
                   b.status = false;
                   SCORE += SCORE_UNIT;
               }
           }
        }
    }
}

//show game stats

function showGameStats(text,textX,textY,img,imgX,imgY)
{
    //draw test
    ctx.fillStyle = "#fff";
    ctx.font = "25px Germania One";
    ctx.fillText(text,textX,textY);

    //draw image
    ctx.drawImage(img,imgX,imgY,width=25,height=25);
}

function draw()
{
    drawPaddle();
    drawBall();
    drawBricks();
    //show score
    showGameStats(SCORE,35,25,SCORE_IMAGE,5,5);
    //show lives
    showGameStats(LIFE,cvs.width - 25, 25,LIFE_IMAGE,cvs.width-55,5);
    //show level
    showGameStats(LEVEL,cvs.width/2,25,LEVEL_IMAGE,cvs.width/2-30,5);
}

function gameOver()
{
    if(LIFE <= 0)
    {
        showYouLose();
        GAME_OVER = true;
    }
}

//level up 

function levelUp()
{
    let isLevelDone = true;
    for(let r=0;r<brick.row;r++)
    {
        for(let c=0;c<brick.column;c++)
        {
            isLevelDone = isLevelDone && !bricks[r][c].status;
        }
    }
    if(isLevelDone)
    {
        WIN.play();
        if(LEVEL >= MAX_LEVEL)
        {
            showYouWin();
            GAME_OVER= true;
            return;
        }
        brick.row++;
        createBrick();
        ball.speed += 1;
        resetBall();
        LEVEL++;
    }
}

function update()
{
  movePladdle();
  moveBall();
  ballWallCollision();
  ballPaddleCollision();
  ballBrickCollision();
  gameOver();
  levelUp();
}

function loop(){
    ctx.drawImage(BG_IMAGE,0,0);
    draw();
    update();
    
    if(!GAME_OVER)
    {
       requestAnimationFrame(loop);
    }
}

loop();

//show game over message

const gameover = document.getElementById("gameover");
const youwin = document.getElementById("youwon");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");
const scoreCard = document.getElementById("score-card");

//click on play again button

restart.addEventListener('click',function()
{
    location.reload();
})

//show you win

function showYouWin()
{
    scoreCard.innerHTML = "Your Score is " +  SCORE ;
    gameover.style.display = "block";
    youwin.style.display = "block";
}

//show you lose

function showYouLose()
{
    scoreCard.innerHTML = "Your Score is " +  SCORE ;
    gameover.style.display = "block";
    youlose.style.display = "block";
}