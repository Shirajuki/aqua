import Animal from './animal';
import type Bullet from './bullet';
import type Player from './player';
import {
  linear,
  linearAccel,
  linearDecel,
  way20TurnRight,
  way20TurnLeft,
  way20,
  way30,
  spiralHowl,
  spiralHowlInward,
  spread5,
  spread8,
  spread5Reverse,
  linearAim,
  linearLockOn,
  spread5LockOn,
  spread8LockOn,
  homingSimple,
} from './bulletPatterns';

export default class Enemy extends Animal {
  bullets: Bullet[];
  player: Player;
  shooting: boolean = true;
  target: number[];
  pattern: ({
    x,
    y,
    width,
    height,
    cooldown,
    size,
    bulletArr,
    player,
    target,
  }: IBulletPattern) => void;
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
    bullets: Bullet[],
    player: Player
  ) {
    super(x, y, width, height, color);
    this.bullets = bullets;
    this.player = player;

    // Bullet Pattern
    const { cooldown, pattern } = homingSimple;
    this.cooldown = cooldown;
    this.pattern = pattern;
    this.target = [this.player.x, this.player.y];
  }
  logic(ctx: any) {
    if (this.shooting) this.shoot();
    else {
      if (this.cooldown.burstTimeCur >= this.cooldown.BurstTimeMax) {
        this.cooldown.burstTimeCur = 0;
        this.shooting = true;
        this.target = [this.player.x, this.player.y]; // Set target when begin shooting sequence
      } else this.cooldown.burstTimeCur++;
    }
    this.draw(ctx);
  }
  shoot() {
    if (this.cooldown.shootingCur >= this.cooldown.shootingMax) {
      this.pattern({
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        size: 8,
        cooldown: this.cooldown,
        bulletArr: this.bullets,
        player: this.player,
        target: this.target,
      });
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
