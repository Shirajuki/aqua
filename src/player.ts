import Animal from './animal';
import Bullet from './bullet';

class Player extends Animal {
  height = this.width;
  movement = { left: false, up: false, right: false, down: false };
  shooting = true;
  focusing = false;
  velocity: number[] = [6, 3]; // [normal, slow]
  bullets: Bullet[] = [];
  cooldown = {
    shootingCur: 0,
    shootingMax: 5,
  };
  move() {
    // Maybe set this to constant v
    const i = this.focusing ? 1 : 0;
    if (this.movement.left && this.x - this.velocity[i] - this.width * 2 > 0)
      this.x -= this.velocity[i];
    if (this.movement.up && this.y - this.velocity[i] - this.height * 2 > 0)
      this.y -= this.velocity[i];
    if (
      this.movement.right &&
      this.x + this.velocity[i] < 1024 - this.width * 2
    )
      this.x += this.velocity[i];
    if (this.movement.down && this.y + this.velocity[i] < 600 - this.height * 2)
      this.y += this.velocity[i];
  }
  shoot() {
    if (this.cooldown.shootingCur >= this.cooldown.shootingMax) {
      this.bullets.push(
        new Bullet(this.x, this.y, 16, 16, 'blue', [8, 0], [0, 0])
      );
      this.cooldown.shootingCur = 0;
    } else this.cooldown.shootingCur++;
  }
  draw(ctx: any) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(
      this.x - this.width * 2,
      this.y - this.height * 2,
      this.width * 4,
      this.height * 4
    );
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    ctx.fill();
  }
  logic(ctx: any) {
    if (this.shooting) this.shoot();
    this.move();
    this.draw(ctx);
  }
  hit() {
    this.color = 'white';
    setTimeout(() => (this.color = 'red'), 500);
    console.log(1);
  }
}
export default Player;
