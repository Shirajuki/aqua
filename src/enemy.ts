import Animal from './animal';
import type Bullet from './bullet';
import {
  linear,
  linearAccel,
  linearDecel,
  way20TurnRight,
  way20TurnLeft,
  way20,
  way30,
} from './bulletPatterns';

export default class Enemy extends Animal {
  bullets: Bullet[];
  shooting: boolean = true;
  pattern: (
    x: number,
    y: number,
    width: number,
    height: number,
    size: number,
    cooldown: any,
    bulletArr: Bullet[]
  ) => void;
  cooldown = {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 100,
  };
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    bullets: Bullet[]
  ) {
    super(x, y, width, height, color);
    this.bullets = bullets;
    // Bullet Pattern
    const { cooldown, pattern } = way30;
    this.cooldown = cooldown;
    this.pattern = pattern;
  }
  logic(ctx: any) {
    if (this.shooting) this.shoot();
    else {
      if (this.cooldown.burstTimeCur >= this.cooldown.BurstTimeMax) {
        this.cooldown.burstTimeCur = 0;
        this.shooting = true;
      } else this.cooldown.burstTimeCur++;
    }
    this.draw(ctx);
  }
  shoot() {
    if (this.cooldown.shootingCur >= this.cooldown.shootingMax) {
      this.pattern(
        this.x,
        this.y,
        this.width,
        this.height,
        8,
        this.cooldown,
        this.bullets
      );
      this.cooldown.shootingCur = 0;
      this.cooldown.burstCur++;
      if (this.cooldown.burstCur >= this.cooldown.burstMax) {
        this.cooldown.burstCur = 0;
        this.shooting = false;
      }
    } else {
      this.cooldown.shootingCur++;
    }
  }
}
