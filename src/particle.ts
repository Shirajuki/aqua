import Bullet from './bullet';

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
    lifeTime: number
  ) {
    super(x, y, width, height, color, velocity, [0, 0]);
    this.lifeTime = lifeTime;
    this.friction = 0.96;
  }
  move() {
    this.velocity[0] *= this.friction;
    this.x += Math.cos(this.velocity[1]) * this.velocity[0] + 0.5;
    this.y += Math.sin(this.velocity[1]) * this.velocity[0];
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
    ctx.fillStyle = `rgba(150,220,200,${this.lifeTime})`;
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
        'green',
        [speed, angle],
        1
      )
    );
  }
};
