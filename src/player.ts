import Animal from './animal';
import Bullet from './bullet';
import { lerp } from './utilities';

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
  sprite = new Image();
  animation = {
    curFrame: 0,
    frames: 5,
    frameSpeed: 1,
    frameCurTimer: 0,
    frameDuration: 3,
  };
  // Rotate player on movement
  leanSpeed: number = 0.5;
  lean: number = 0;
  // Player stats
  life: number = 3;
  spell: number = 0;
  power: number = 0;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    super(x, y, width, height, color);
    this.sprite.src = '/images/aqua_sprite.png';
  }
  move() {
    // Maybe set this to constant v
    const i = this.focusing ? 1 : 0;
    if (this.movement.left && this.x - this.velocity[i] - this.width * 2 > 0)
      this.x -= this.velocity[i];
    if (this.movement.up && this.y - this.velocity[i] - this.height * 2 > 50)
      this.y -= this.velocity[i];
    if (this.movement.right && this.x + this.velocity[i] < 924 - this.width * 2)
      this.x += this.velocity[i];
    if (this.movement.down && this.y + this.velocity[i] < 520 - this.height * 2)
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
    // Handle player leaning smoothly using lerp
    if (this.movement.right && this.lean > -4)
      this.lean = lerp(this.lean, this.lean - this.leanSpeed, 0.5);
    else if (this.movement.left && this.lean < 3)
      this.lean = lerp(this.lean, this.lean + this.leanSpeed, 0.5);
    else if (this.lean > 0)
      this.lean = lerp(this.lean, this.lean - this.leanSpeed, 0.5);
    else if (this.lean < 0)
      this.lean = lerp(this.lean, this.lean + this.leanSpeed, 0.5);
    ctx.save();
    // Translate the origin to the center of the image
    ctx.translate(this.x - 60 + 100 / 2, this.y - 80 + 133 / 2);
    // Rotate player
    ctx.rotate((this.lean * Math.PI) / 180);
    if (this.sprite.complete)
      ctx.drawImage(
        this.sprite,
        0,
        524 * this.animation.curFrame,
        408,
        524,
        -100 / 2, // Draw by negative width/2 and height/2
        -133 / 2,
        100,
        133
      );
    ctx.restore();
    ctx.beginPath();
    ctx.fillStyle = 'aqua';
    ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    ctx.fill();
  }
  animate() {
    if (this.animation.frameCurTimer >= this.animation.frameDuration) {
      this.animation.frameCurTimer = 0;
      this.animation.curFrame++;
    } else this.animation.frameCurTimer += this.animation.frameSpeed;
    if (this.animation.curFrame === this.animation.frames)
      this.animation.curFrame = 0;
  }
  logic(ctx: any) {
    if (this.shooting) this.shoot();
    this.move();
    this.animate();
    this.draw(ctx);
  }
  hit() {
    this.color = 'white';
    setTimeout(() => (this.color = 'red'), 500);
    console.log(1);
  }
}
export default Player;
