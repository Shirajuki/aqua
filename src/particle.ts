import Bullet from './bullet';
import { getRGBColor } from './utils';
import { lerp } from './utils';
import { GLITTERS_COLORS } from './constants';

export default class Particle extends Bullet {
  lifeTime: number = 0;
  lifeTimeDrain: number = 0.01;
  friction: number = 0;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    velocity: number[],
    acceleration: number[],
    lifeTime: number,
    lifeTimeDrain: number = 0.01
  ) {
    super(x, y, width, height, color, velocity, acceleration);
    this.lifeTime = lifeTime;
    this.lifeTimeDrain = lifeTimeDrain;
    this.friction = 0.96;
  }
  move() {
    this.velocity[0] *= this.friction;
    this.x +=
      Math.cos(this.velocity[1]) * this.velocity[0] + this.acceleration[0];
    this.y +=
      Math.sin(this.velocity[1]) * this.velocity[0] + this.acceleration[1];
    if (
      !this.outOfRange &&
      (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900)
    )
      this.outOfRange = true;
  }
  draw(ctx: any) {
    if (this.lifeTime !== 0) {
      this.lifeTime -= this.lifeTimeDrain;
    }
    this.width = lerp(this.width, 0, 0.005);
    ctx.beginPath();
    ctx.fillStyle = `rgba(${getRGBColor(this.color)},${this.lifeTime})`;
    ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    ctx.fill();
  }
}
export class Ripple extends Particle {
  draw(ctx: any) {
    if (this.lifeTime !== 0) {
      this.lifeTime -= 0.01;
    }
    this.width = lerp(this.width, 0, 0.01);
    ctx.beginPath();
    ctx.fillStyle = `rgba(${getRGBColor(this.color)},${this.lifeTime})`;
    ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    ctx.fill();
  }
}
export class Shockwave extends Particle {
  lineWidth: number = 6;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    velocity: number[],
    acceleration: number[],
    lifeTime: number
  ) {
    super(x, y, width, height, color, velocity, acceleration, lifeTime);
  }
  move() {
    this.velocity[0] *= this.friction;
    this.x +=
      Math.cos(this.velocity[1]) * this.velocity[0] + this.acceleration[0];
    this.y +=
      Math.sin(this.velocity[1]) * this.velocity[0] + this.acceleration[1];
    if (
      !this.outOfRange &&
      (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900)
    )
      this.outOfRange = true;
  }
  draw(ctx: any) {
    if (this.lineWidth > 0) {
      this.lineWidth -= 0.1;
      if (this.lineWidth <= 0) this.lifeTime = 0;
    }
    if (this.lifeTime !== 0) this.lifeTime -= 0.005;
    this.width = lerp(this.width, 900, 0.01);
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${getRGBColor(this.color)},${this.lifeTime})`;
    ctx.lineWidth = this.lineWidth;
    ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    ctx.stroke();
  }
}
// Enemy explosion particle effect
export const explosion = ({
  x,
  y,
  size,
  amount,
  particleArr,
  speed: spd,
}: IParticlePattern) => {
  for (let i = 1; i <= amount; i++) {
    const speed = Math.random() * (spd || 7);
    let angle = Math.random() * Math.PI * 2;
    particleArr.push(
      new Particle(
        x,
        y,
        Math.random() * size + 5,
        size,
        '#ffffff',
        [speed, angle],
        [0.5, 0],
        1
      )
    );
  }
};

// Player water ripple particle effect
export const ripple = ({
  x,
  y,
  size,
  amount,
  particleArr,
}: IParticlePattern) => {
  for (let i = 1; i <= amount; i++) {
    const speed = Math.random() * 5;
    particleArr.push(
      new Ripple(
        x,
        y,
        Math.random() * size + 8,
        size,
        '#ffffff',
        [speed, 0],
        [-1.2, 1],
        0.4
      )
    );
  }
};

// Boss explosion particle effect
export const shockwave = ({
  x,
  y,
  size,
  amount,
  particleArr,
  lifeTime = 0.4,
}: IParticlePattern) => {
  for (let i = 1; i <= amount; i++) {
    const speed = Math.random() * 3;
    let angle = Math.random() * Math.PI * 2;
    particleArr.push(
      new Particle(
        x,
        y,
        Math.random() * 15,
        15,
        '#ffffff',
        [speed, angle],
        [0.5, 0],
        0.5
      )
    );
  }
  particleArr.push(
    new Shockwave(x, y, size, size, '#ffffff', [0, 0], [0.5, 0], lifeTime)
  );
};

// Item pickup particle effect
export const glitters = ({
  x,
  y,
  size,
  amount,
  particleArr,
  speed: spd,
}: IParticlePattern) => {
  for (let i = 1; i <= amount; i++) {
    const speed = Math.random() * (spd || 7);
    let angle = Math.random() * Math.PI * -1;
    particleArr.push(
      new Particle(
        x,
        y,
        Math.random() * size + 3,
        size,
        GLITTERS_COLORS[Math.floor(Math.random() * GLITTERS_COLORS.length)],
        [speed, angle],
        [-1, (Math.random() * 60) / 100],
        0.5
      )
    );
  }
};
