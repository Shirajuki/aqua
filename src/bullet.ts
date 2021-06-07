import Animal from './animal';

export default class Bullet extends Animal {
  outOfRange = false;
  velocity: number[];
  acceleration: number[];
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    velocity: number[],
    acceleration: number[]
  ) {
    super(x, y, width, height, color);
    this.velocity = velocity;
    this.acceleration = acceleration;
  }
  move() {
    this.x += this.velocity[0];
    this.y += this.velocity[1];
    this.velocity[0] += this.acceleration[0];
    this.velocity[0] += this.acceleration[1];
    if (
      !this.outOfRange &&
      (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900)
    )
      this.outOfRange = true;
  }
  draw(ctx: any) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

export class BulletSpiral extends Bullet {
  r: number = 3;
  draw(ctx: any) {
    super.draw(ctx);
    this.r -= 0.05;
    this.x = (this.r + this.velocity[0]) / 1 + this.x;
    this.y = (this.r * this.velocity[1]) / 1 + this.y;
  }
}

export class BulletSpiralInward extends Bullet {
  r: number = 3;
  draw(ctx: any) {
    super.draw(ctx);
    this.r -= 0.05;
    this.x = (this.r * this.velocity[0]) / 1 + this.x;
    this.y = (this.r * this.velocity[1]) / 1 + this.y;
  }
}

export class BulletAngle extends Bullet {
  speed: number = 10;
  vx: number = 0.02;
  ax: number = 1.01;
  angleX: number = Math.acos(this.velocity[0] / this.speed);
  angleY: number = Math.asin(this.velocity[1] / this.speed);
  draw(ctx: any) {
    super.draw(ctx);
    this.speed -= this.vx;
    this.vx *= this.ax;
    this.velocity[0] = Math.cos(this.angleX) * this.speed;
    this.velocity[1] = Math.sin(this.angleY) * this.speed;
  }
}
