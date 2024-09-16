import Player from "../js/PlayerI.js";
import Enemy from "../js/Enemy.js";
import BulletCtrl from "../js/BulletCtrl.js";

const canvas = document.getElementById('game1');
const ctx = canvas.getContext("2d");

canvas.width = 750;
canvas.height = 500;

var bgG1 = new Audio("../audio/battle-march-action-loop-6935.mp3");
bgG1.loop=true;
bgG1.play();

const bulletCtrl = new BulletCtrl(canvas);
const player = new Player(
    canvas.width/10, 
    canvas.height/3, 
    bulletCtrl
    );

const enemies = [ //add enemies here, also bosses
    new Enemy(450,80,'green',10),
    new Enemy(450,180,'green',10),
    new Enemy(450,280,'green',10),
    new Enemy(450,380,'green',10),
    new Enemy(525,80,'blue',50),
    new Enemy(525,180,'blue',50),
    new Enemy(525,280,'blue',50),
    new Enemy(525,380,'blue',50),
    new Enemy(600,80,'red',80),
    new Enemy(600,180,'red',80),
    new Enemy(600,280,'red',80),
    new Enemy(600,380,'red',80),
];    

function gameLoop() {
        setCommonStyle();
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    bulletCtrl.draw(ctx);
    player.draw(ctx);
    enemies.forEach(enemy => {
            if(bulletCtrl.collideWith(enemy)){
                if(enemy.health <= 0){
                    const index = enemies.indexOf(enemy);
                    enemies.splice(index, 1);
                }
            }
        else {
            enemy.draw(ctx);
        }
    });
}

function setCommonStyle(){ //edit player here
    ctx.shadowColor = "white";
    ctx.shadowBlur = 10;
    ctx.lineJoin = "bevel";
    ctx.lineWidth = 3;
}

setInterval(gameLoop, 1000 / 60);