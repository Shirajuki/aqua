import Bullet from './bullet';

const getRGBColor = (color: string) => {
  if (color[0] === '#') {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }
  return color;
};
export default class Particle extends Bullet {
  lifeTime: number = 0;
  friction: number = 0;
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
    super(x, y, width, height, color, velocity, acceleration);
    this.lifeTime = lifeTime;
    this.friction = 0.96;
    this.color = color;
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
      this.lifeTime -= 0.01;
    }
    ctx.beginPath();
    ctx.fillStyle = `rgba(${getRGBColor(this.color)},${this.lifeTime})`;
    ctx.arc(this.x, this.y - this.height / 2, this.width, 0, Math.PI * 2);
    ctx.fill();
  }
}

export const explosion = ({
  x,
  y,
  size,
  amount,
  particleArr,
}: IParticlePattern) => {
  for (let i = 1; i <= amount; i++) {
    const speed = Math.random() * 5;
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

export const ripple = ({
  x,
  y,
  size,
  amount,
  particleArr,
}: IParticlePattern) => {
  for (let i = 1; i <= amount; i++) {
    const speed = Math.random() * 5;
    let angle = Math.PI * 2;
    particleArr.push(
      new Particle(
        x,
        y,
        Math.random() * size + 5,
        size,
        '#ffffff',
        [speed, angle],
        [-1, 1],
        0.4
      )
    );
  }
};
