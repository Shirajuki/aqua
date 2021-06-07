import Animal from './animal';
import Bullet from './bullets';

class Player extends Animal {
  height = this.width;
  movement = { left: false, up: false, right: false, down: false };
  shooting = true;
  velocity = 6;
  bullets: Bullet[] = [];
  cooldown = {
    shootingCur: 0,
    shootingMax: 5,
  };
  move() {
    if (this.movement.left) this.x -= this.velocity;
    if (this.movement.up) this.y -= this.velocity;
    if (this.movement.right) this.x += this.velocity;
    if (this.movement.down) this.y += this.velocity;
  }
  shoot() {
    if (this.cooldown.shootingCur >= this.cooldown.shootingMax) {
      this.bullets.push(new Bullet(this.x, this.y, 10, 10, 'blue'));
      this.cooldown.shootingCur = 0;
    } else this.cooldown.shootingCur++;
  }
  draw(ctx: any) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.width * 4, this.height * 4);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(this.x + this.width * 2, this.y + this.height * 2, this.width, 0, 2 * Math.PI);
    ctx.fill();
  }
  logic(ctx: any) {
    if (this.shooting) this.shoot();
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];
      bullet.move();
      bullet.draw(ctx);
      if (bullet.outOfRange) this.bullets.splice(i, 1);
    }
    this.move();
    this.draw(ctx);
  }
}
export default Player;
