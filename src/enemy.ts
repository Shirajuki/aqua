import Animal from './animal';
import type Bullet from './bullet';
import type Player from './player';

export default class Enemy extends Animal {
  outOfRange: boolean = false;
  outOfRange2: boolean = false;
  bullets: Bullet[];
  player: Player;
  shooting: boolean = false;
  target: number[];
  pattern: ({
    x,
    y,
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
  bulletType: IBulletType;
  behaviourLogic: IBehaviourLogic;
  speed: number = 0;
  arrived: boolean = false;
  hp: number = 0;
  dead: boolean = false;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    bullets: Bullet[],
    player: Player,
    bulletType: IBulletType,
    behaviourLogic: IBehaviourLogic,
    hp: number
  ) {
    super(x, y, width, height, color);
    this.bullets = bullets;
    this.player = player;

    // Behaviour Logics s.t. movements and different attack patterns
    this.behaviourLogic = behaviourLogic;

    // Bullet Pattern
    this.bulletType = bulletType;
    this.updateBulletType();

    this.hp = hp;
  }
  updateBulletType() {
    const { cooldown, pattern } =
      this.behaviourLogic?.bulletTypes[
        this.behaviourLogic?.behaviour[this.behaviourLogic?.state]?.bulletType
      ] || this.bulletType;
    this.cooldown = cooldown;
    this.pattern = pattern;
    this.target = [this.player.x, this.player.y];
  }
  logic(ctx: any) {
    // Behaviour logic
    const behaviour =
      this.behaviourLogic?.behaviour[this.behaviourLogic?.state];
    // If a behaviour logic is found, follow through the logic
    if (behaviour) {
      // Get the distance from point A to B
      const x = behaviour.path.x || this.x;
      const y = behaviour.path.y || this.y;
      const distance = Math.sqrt(
        Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)
      );
      // Set the linear speed
      if (this.speed == 0 && !this.arrived)
        this.speed = (distance / behaviour.duration) * -1;
      // Move through the path to point B
      const angle = Math.atan2(this.y - y, this.x - x);
      const vx = Math.cos(angle) * this.speed;
      const vy = Math.sin(angle) * this.speed;
      this.x += vx;
      this.y += vy;
      // Increment state duration
      this.behaviourLogic.stateDurationCur++;
      // Shoot while pathing
      if (
        this.shooting ||
        (!behaviour.shootAfterPathing &&
          this.behaviourLogic.stateDurationCur >= behaviour.shootAfter)
      )
        this.shootingLogic();
      if (distance < Math.abs(this.speed) || this.speed === 0) {
        if (!this.arrived) {
          this.arrived = true;
          this.speed = 0;
          this.behaviourLogic.stateDurationCur = 0;
          this.cooldown.burstTimeCur = this.cooldown.BurstTimeMax; // Set to begin shooting at once
        }
        // Shoot after pathing
        if (behaviour.shootAfterPathing) {
          if (this.behaviourLogic.stateDurationCur >= behaviour.shootAfter)
            this.shootingLogic();
          else this.behaviourLogic.stateDurationCur++;
        } else this.updateState();
      }
    } else {
      // Normal shoot logic
      this.shootingLogic();
    }

    // Draw enemy
    this.draw(ctx);
  }
  hit() {
    this.hp--;
    if (this.hp <= 0) {
      this.dead = true;
    }
  }
  shootingLogic() {
    if (this.shooting) this.shoot();
    else {
      if (this.cooldown.burstTimeCur >= this.cooldown.BurstTimeMax) {
        this.cooldown.burstTimeCur = 0;
        this.shooting = true;
        this.target = [this.player.x, this.player.y]; // Set target when begin shooting sequence
      } else this.cooldown.burstTimeCur++;
    }
  }
  shoot() {
    if (this.cooldown.shootingCur >= this.cooldown.shootingMax) {
      // Shoot using bullet pattern
      this.pattern({
        x: this.x,
        y: this.y + this.width / 2 + 4,
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
        const behaviour =
          this.behaviourLogic?.behaviour[this.behaviourLogic?.state];
        if (behaviour)
          if (behaviour.shootAfterPathing) {
            this.updateState();
          }
      }
    } else {
      this.cooldown.shootingCur++;
    }
  }
  updateState() {
    this.behaviourLogic.state =
      (this.behaviourLogic.state + 1) % this.behaviourLogic.behaviour.length;
    this.behaviourLogic.stateDurationCur = 0;
    this.arrived = false;
    this.updateBulletType();
  }
}
