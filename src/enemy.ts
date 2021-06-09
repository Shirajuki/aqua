import Animal from './animal';
import type Bullet from './bullet';
import type Player from './player';

export default class Enemy extends Animal {
  outOfRange: boolean = false;
  outOfRange2: boolean = false;
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
  cooldown: ICooldown = {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 100,
  };
  bulletType: any;
  behaviourLogic: IBehaviourLogic;
  speed: number = 0;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    bullets: Bullet[],
    player: Player,
    bulletType: IBulletType,
    behaviourLogic: IBehaviourLogic
  ) {
    super(x, y, width, height, color);
    this.bullets = bullets;
    this.player = player;

    // Bullet Pattern
    const { cooldown, pattern } = bulletType;
    this.cooldown = cooldown;
    this.pattern = pattern;
    this.target = [this.player.x, this.player.y];

    // Behaviour Logics s.t. movements and different attack patterns
    this.behaviourLogic = behaviourLogic;
  }
  logic(ctx: any) {
    // Behaviour logic
    const behaviour =
      this.behaviourLogic?.behaviour[this.behaviourLogic?.state];
    if (behaviour) {
      const x = behaviour.path.x || this.x;
      const y = behaviour.path.y || this.y;
      const distance = Math.sqrt(
        Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)
      );
      if (this.speed == 0) this.speed = (distance / behaviour.duration) * -1;
      const angle = Math.atan2(this.y - y, this.x - x);
      const vx = Math.cos(angle) * this.speed;
      const vy = Math.sin(angle) * this.speed;
      this.x += vx;
      this.y += vy;
      if (true) {
        console.log('Arrived at destination');
        this.speed = 0;
        this.behaviourLogic.state++;
      }
    }
    // Shoot logic
    /*
    if (this.shooting) this.shoot();
    else {
      if (this.cooldown.burstTimeCur >= this.cooldown.BurstTimeMax) {
        this.cooldown.burstTimeCur = 0;
        this.shooting = true;
        this.target = [this.player.x, this.player.y]; // Set target when begin shooting sequence
      } else this.cooldown.burstTimeCur++;
    }
		*/

    // Draw enemy
    this.draw(ctx);
  }
  hit() {}
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
