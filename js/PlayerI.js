export default class Player {
    constructor(x,y, bulletCtrl){
        this.x = x;
        this.y = y;
        this.bulletCtrl = bulletCtrl;
        this.width = 50;
        this.height = 50;
        this.speed = 4;

        document.addEventListener('keydown',this.keydown);
        document.addEventListener('keyup',this.keyup);
    }  

    draw(ctx){
            this.move();
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        this.shoot();
    }

    shoot(){
        if(this.shootPressed){
            console.log("shoot");
            const speed = 5;
            const delay = 7;
            const damage = 1; //config damage here
            const bulletX = this.x;
            const bulletY = this.y + this.height/2;
            this.bulletCtrl.shoot(bulletX,bulletY,speed,damage,delay);
        }
    }

    move(){
        if(this.downPressed){
            this.y += this.speed;
        }
        if(this.upPressed){
            this.y -= this.speed;
        }
        if(this.leftPressed){
            this.x -= this.speed;
        }
        if(this.rightPressed){
            this.x += this.speed;
        }
    }

    keydown =(e)=>{
        if(e.code === "KeyW"){
            this.upPressed = true;
        }
        if(e.code === "KeyS"){
            this.downPressed = true;
        }
        if(e.code === "KeyA"){
            this.leftPressed = true;
        }
        if(e.code === "KeyD"){
            this.rightPressed = true;
        }
        if(e.code === "KeyJ"){
            this.shootPressed = true;
        }
    }

    keyup =(e)=>{ //e.code = event code
        if(e.code === "KeyW"){
            this.upPressed = false;
        }
        if(e.code === "KeyS"){
            this.downPressed = false;
        }
        if(e.code === "KeyA"){
            this.leftPressed = false;
        }
        if(e.code === "KeyD"){
            this.rightPressed = false;
        }
        if(e.code === "KeyJ"){
            this.shootPressed = false;
        }
    }
}