import Enemy from './enemy';
import type Bullet from './bullet';
import type Player from './player';
import { lerp } from './utilities';

const easeLinear = (t: number, b: number, c: number, d: number): number => {
  return (c * t) / d + b;
};

export default class Boss extends Enemy {
  outOfRange: boolean = false;
  outOfRange2: boolean = false;
  shooting: boolean = false;
  cooldown: ICooldown = {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 100,
  };
  behaviourLogic: IBehaviourLogic;
  speed: number = 0;
  arrived: boolean = false;
  dead: boolean = false;
  maxHp: number = 0;
  hpPercent: number = 380;
  oldX: number = 0;
  oldY: number = 0;
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
    super(x, y, width, height, color, bullets, player, bulletType, hp);
    // Behaviour Logics s.t. movements and different attack patterns
    this.behaviourLogic = behaviourLogic;
    this.updateBulletType();
    this.maxHp = hp;

    this.oldX = this.x;
    this.oldY = this.y;
  }
  updateBulletType() {
    const { cooldown, pattern } =
      this.behaviourLogic?.bulletTypes[
        this.behaviourLogic?.behaviour[this.behaviourLogic?.state]?.bulletType
      ] || this.bulletType;
    this.cooldown = cooldown;
    this.pattern = pattern;
    this.target = [this.player.x, this.player.y];
    if (
      !this.behaviourLogic?.behaviour[this.behaviourLogic?.state]
        ?.shootAfterPathing
    )
      this.cooldown.burstTimeCur = this.cooldown.BurstTimeMax; // Set to begin shooting at once
  }
  logic(ctx: any) {
    // Behaviour logic
    const behaviour =
      this.behaviourLogic?.behaviour[this.behaviourLogic?.state];
    // If a behaviour logic is found, follow through the logic
    if (behaviour) {
      const x = behaviour.path.x || 0;
      const y = behaviour.path.y || 0;
      this.x = behaviour.easing(
        Math.min(this.behaviourLogic.stateDurationCur, behaviour.duration),
        this.oldX,
        x,
        behaviour.duration
      );
      this.y = behaviour.easing(
        Math.min(this.behaviourLogic.stateDurationCur, behaviour.duration),
        this.oldY,
        y,
        behaviour.duration
      );
      // Increment state duration
      if (this.behaviourLogic.stateDurationCur < behaviour.duration)
        this.behaviourLogic.stateDurationCur += 0.01;
      // Shoot while pathing
      if (
        !behaviour.shootAfterPathing &&
        this.behaviourLogic.stateDurationCur >= behaviour.shootAfter
      )
        this.shootingLogic();
      if (this.behaviourLogic.stateDurationCur > behaviour.duration) {
        if (!this.arrived) {
          this.arrived = true;
          this.speed = 0;
          this.cooldown.burstTimeCur = this.cooldown.BurstTimeMax; // Set to begin shooting at once
        }
        // Shoot after pathing
        if (behaviour.shootAfterPathing) {
          if (
            this.behaviourLogic.stateDurationCur - behaviour.duration >=
            behaviour.shootAfter
          )
            this.shootingLogic();
          else this.behaviourLogic.stateDurationCur += 0.01;
        } else this.updateState();
      }
    } else {
      // Normal shoot logic
      this.shootingLogic();
    }

    // Animate and draw enemy
    this.animate();
    this.draw(ctx);
    this.drawBossHp(ctx);
  }
  drawBossHp(ctx: any) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(530, 470, 380, 40);
    ctx.fill();

    // Lerp hp bar drain
    this.hpPercent = lerp(this.hpPercent, (380 * this.hp) / this.maxHp, 0.1);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(200,0,0,0.7)';
    ctx.rect(530, 470, this.hpPercent, 40);
    ctx.fill();
    if (this.sprite.complete)
      ctx.drawImage(this.sprite, 0, 0, 430, 245, 500, 455, 103, 58);
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
        y: this.y + this.height / 2 + 4,
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
    this.oldX = this.x;
    this.oldY = this.y;
  }
}
