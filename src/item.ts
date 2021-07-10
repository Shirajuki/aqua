import Particle from './particle';

export default class Items extends Particle {
  color: string = 'lime';
  type: number = 0;
  // Type:
  // 0 : point
  // 1 : powerup
  // 2 : life
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    velocity: number[],
    acceleration: number[],
    lifeTime: number,
    type: number
  ) {
    super(x, y, width, height, color, velocity, acceleration, lifeTime);
    this.type = type;
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
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}
export const point = ({
  x,
  y,
  size,
  amount,
  particleArr,
}: IParticlePattern) => {
  const speed = 15;
  for (let i = 0; i < amount; i++) {
    const offsetX = Math.random() * 60 - 30;
    const offsetY = Math.random() * 40 - 20;
    particleArr.push(
      new Items(
        x + offsetX,
        y + offsetY + i * 20 - 10,
        size,
        size,
        '#ffffff',
        [speed, 0],
        [-6, 0],
        1,
        0
      )
    );
  }
};
export const powerup = ({
  x,
  y,
  size,
  amount,
  particleArr,
}: IParticlePattern) => {
  const speed = 15;
  for (let i = 0; i < amount; i++) {
    const offsetX = Math.random() * 60 - 30;
    const offsetY = Math.random() * 40 - 20;
    particleArr.push(
      new Items(
        x + offsetX,
        y + offsetY + i * 20 - 10,
        size,
        size,
        '#ffffff',
        [speed, 0],
        [-6, 0],
        1,
        1
      )
    );
  }
};
