import Bullet from './bullet';

export default class Particle extends Bullet {
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
    ctx.rect(this.x, this.y - this.height / 2, this.width, this.height);
    ctx.fill();
  }
}

export const linear: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 5, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, size, bulletArr }: IBulletPattern) => {
    bulletArr.push(new Bullet(x, y, size, size, 'green', [-8, 0], [0, 0]));
  },
};
