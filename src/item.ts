import Particle from './particle';
import type Player from './player';

export default class Item extends Particle {
  color: string = 'lime';
  type: number = 0;
  // Type:
  // 0 : point
  // 1 : smallpoint
  // 2 : powerup
  // 3 : life
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
export class HomingItem extends Item {
  player: Player;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    speed: number,
    acceleration: number,
    lifeTime: number,
    type: number,
    player: Player
  ) {
    super(
      x,
      y,
      width,
      height,
      color,
      [0, 0],
      [speed, acceleration],
      lifeTime,
      type
    );
    this.player = player;
    this.color = 'lightgreen';
  }
  move() {
    const angle = Math.atan2(this.y - this.player.y, this.x - this.player.x);
    this.velocity[0] = Math.cos(angle) * this.acceleration[0];
    this.velocity[1] = Math.sin(angle) * this.acceleration[0];
    // this.velocity[0] *= this.friction;
    this.x += this.velocity[0];
    this.y += this.velocity[1];
    this.acceleration[0] += this.acceleration[1];
    if (
      !this.outOfRange &&
      (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900)
    )
      this.outOfRange = true;
  }
}
export const point = ({ x, y, size, amount, itemArr }: IItemPattern) => {
  const speed = 15;
  for (let i = 0; i < amount; i++) {
    const offsetX = Math.random() * 60 - 30;
    const offsetY = Math.random() * 40 - 20;
    itemArr.push(
      new Item(
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
export const smallPoint = ({
  x,
  y,
  size,
  amount,
  itemArr,
  player,
}: IItemPattern) => {
  const speed = -5;
  const acceleration = -0.1;
  for (let i = 0; i < amount; i++) {
    const offsetX = Math.random() * 60 - 30;
    const offsetY = Math.random() * 40 - 20;
    itemArr.push(
      new HomingItem(
        x + offsetX,
        y + offsetY + i * 20 - 10,
        size,
        size,
        '#ffffff',
        speed,
        acceleration,
        1,
        1,
        player
      )
    );
  }
};
export const powerup = ({ x, y, size, amount, itemArr }: IItemPattern) => {
  const speed = 15;
  for (let i = 0; i < amount; i++) {
    const offsetX = Math.random() * 60 - 30;
    const offsetY = Math.random() * 40 - 20;
    itemArr.push(
      new Item(
        x + offsetX,
        y + offsetY + i * 20 - 10,
        size,
        size,
        '#ffffff',
        [speed, 0],
        [-6, 0],
        1,
        2
      )
    );
  }
};
