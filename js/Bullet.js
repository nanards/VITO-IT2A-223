export default class Bullet{
    constructor(x,y,speed,damage){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damage = damage;

        this.width = 15;
        this.height = 5;
        this.color = "white";
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        this.x += this.speed;
        ctx.fillRect(this.x,this.y,this.width,this.height); 
    }

    collideWith(sprite){ //collision wooo
        if (this.x < sprite.x + sprite.width && 
            this.x + this.width > sprite.x &&
            this.y < sprite.y + sprite.height &&
            this.y + this.height > sprite.y){
                sprite.takeDamage(this.damage);
                return true;
            }
        return false;
    }
}