import Animal from './animal';
import type Player from './player';

export default class Bullet extends Animal {
  outOfRange = false;
  velocity: number[];
  acceleration: number[];
  damage: number = 1;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    velocity: number[],
    acceleration: number[],
    damage: number = 1
  ) {
    super(x, y, width, height, color);
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.damage = damage;
  }
  move(dt: number) {
    this.x += this.velocity[0] * dt;
    this.y += this.velocity[1] * dt;
    this.velocity[0] += this.acceleration[0] * dt;
    this.velocity[1] += this.acceleration[1] * dt;
    if (
      !this.outOfRange &&
      (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900)
    )
      this.outOfRange = true;
  }
  draw(ctx: any) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y - this.height / 2, this.width, this.height);
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

export class BulletSinus extends Bullet {
  startY: number = this.y;
  move(dt: number) {
    this.x += this.velocity[0] * dt;
    this.velocity[1] += 1 * dt;
    this.y = 25 * Math.sin(this.velocity[1] / 10) + this.startY;
    this.velocity[0] += this.acceleration[0] * dt;
    this.velocity[1] += this.acceleration[1] * dt;
    if (
      !this.outOfRange &&
      (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900)
    )
      this.outOfRange = true;
  }
  draw(ctx: any) {
    super.draw(ctx);
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

export class BulletHoming extends Bullet {
  player: Player;
  speed: number = -7;
  homingTimerCur: number = 0;
  homingTimerMax: number = 120;
  homingIntervalCur: number = 0;
  homingIntervalMax: number = 10;
  oldAngle: number = 0;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    velocity: number[],
    acceleration: number[],
    player: Player
  ) {
    super(x, y, width, height, color, velocity, acceleration);
    this.player = player;
  }
  move(dt: number) {
    this.x += this.velocity[0] * dt;
    this.y += this.velocity[1] * dt;
    this.velocity[0] += this.acceleration[0] * dt;
    this.velocity[1] += this.acceleration[1] * dt;
    if (
      !this.outOfRange &&
      (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900)
    )
      this.outOfRange = true;
  }
  draw(ctx: any) {
    super.draw(ctx);
    // Determine angle using atan
    if (this.homingTimerCur <= this.homingTimerMax) {
      if (this.homingIntervalCur >= this.homingIntervalMax) {
        const angle = Math.atan2(
          this.y - this.player.y - this.height,
          this.x - this.player.x
        );
        if (Math.abs(angle - this.oldAngle) > 3 || this.player.dead) {
          this.homingTimerCur = this.homingTimerMax;
          this.velocity[0] = Math.cos(angle) * this.speed;
          this.velocity[1] = Math.sin(angle) * this.speed;
          return;
        }
        this.oldAngle = angle;
        this.velocity[0] = Math.cos(angle) * this.speed;
        this.velocity[1] = Math.sin(angle) * this.speed;
        this.homingIntervalCur = 0;
      } else this.homingIntervalCur++;
      this.homingTimerCur++;
    }
  }
}
