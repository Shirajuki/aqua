import Animal from './animal';

class Bullet extends Animal {
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
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2, false);
    ctx.fill();
  }
}
export default Bullet;
