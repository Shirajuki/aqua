import Animal from './animal';
import type Bullet from './bullet';
import type Player from './player';

export default class Enemy extends Animal {
  // Other values
  outOfRange: boolean = false;
  bullets: Bullet[];
  player: Player;
  hp: number = 0;
  // Type:
  // 0 : enemy
  // 1 : boss
  type: number = 0;
  // Bullet shooting values
  dead: boolean = false;
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
  // BehaviourLogic values
  speed: number = 0;
  arrived: boolean = false;
  behaviourLogic: IBehaviourLogic;
  oldX: number = 0;
  oldY: number = 0;
  reverse: boolean = false;
  // Sprite and animation values
  sprite = new Image();
  animation = {
    curFrame: 0,
    frames: 5,
    frameSpeed: 1,
    frameCurTimer: 0,
    frameDuration: 5,
  };
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
    hp: number,
    reverse: boolean = false
  ) {
    super(x, y, width, height, color);
    this.bullets = bullets;
    this.player = player;
    this.sprite.src = '/images/neko_sprite.png';

    // Behaviour Logics such as movements and different attack patterns
    this.behaviourLogic = behaviourLogic;
    this.bulletType = bulletType;
    this.updateBulletType();

    this.hp = hp;
    this.oldX = this.x;
    this.oldY = this.y;
    this.reverse = reverse;
  }
  updateBulletType() {
    // Prioritize bulletType over behaviourLogic
    const { cooldown, pattern } =
      this.bulletType ||
      this.behaviourLogic?.bulletTypes[
        this.behaviourLogic?.behaviour[this.behaviourLogic?.state]?.bulletType
      ];
    this.cooldown = cooldown;
    this.pattern = pattern;
    this.target = [this.player.x, this.player.y];
    if (
      !this.behaviourLogic?.behaviour[this.behaviourLogic?.state]
        ?.shootAfterPathing
    )
      this.cooldown.burstTimeCur = this.cooldown.BurstTimeMax; // Set to begin shooting at once
  }
  logic(ctx: any, dt: number) {
    // Behaviour logic
    const behaviour =
      this.behaviourLogic?.behaviour[this.behaviourLogic?.state];
    // If a behaviour logic is found, follow through the logic
    if (behaviour) {
      const x = behaviour.path.x || 0;
      const y = behaviour.path.y || 0;
      this.x = behaviour.easing.x(
        Math.min(this.behaviourLogic.stateDurationCur, behaviour.duration),
        this.oldX,
        x,
        behaviour.duration
      );
      this.y = behaviour.easing.y(
        Math.min(this.behaviourLogic.stateDurationCur, behaviour.duration),
        this.oldY,
        y,
        behaviour.duration
      );
      // Increment state duration
      if (this.behaviourLogic.stateDurationCur < behaviour.duration)
        this.behaviourLogic.stateDurationCur += 0.01 * dt;
      // Shoot while pathing
      if (
        !behaviour.shootAfterPathing &&
        this.behaviourLogic.stateDurationCur >= behaviour.shootAfter
      )
        this.shootingLogic(dt);
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
            this.shootingLogic(dt);
          else this.behaviourLogic.stateDurationCur += 0.01 * dt;
        } else this.updateState();
      }
    } else {
      // Normal shoot logic
      this.shootingLogic(dt);
    }

    // Animate and draw enemy
    this.animate();
    this.draw(ctx);
  }
  animate() {
    if (this.animation.frameCurTimer >= this.animation.frameDuration) {
      this.animation.frameCurTimer = 0;
      this.animation.curFrame++;
    } else this.animation.frameCurTimer += this.animation.frameSpeed;
    if (this.animation.curFrame === this.animation.frames)
      this.animation.curFrame = 0;
  }
  draw(ctx: any) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    if (this.sprite.complete)
      ctx.drawImage(
        this.sprite,
        0,
        245 * this.animation.curFrame,
        430,
        245,
        this.x,
        this.y,
        this.width,
        this.height
      );
    if (
      !this.outOfRange &&
      (this.x < -200 || this.x > 1200 || this.y < -200 || this.y > 600)
    )
      this.outOfRange = true;
  }
  hit(dmg: number) {
    this.hp -= dmg || 1;
    if (this.hp <= 0) {
      this.dead = true;
    }
  }
  shootingLogic(dt: number) {
    if (this.shooting) this.shoot(dt);
    else {
      if (this.cooldown.burstTimeCur >= this.cooldown.BurstTimeMax) {
        this.cooldown.burstTimeCur = 0;
        this.shooting = true;
        this.target = [this.player.x, this.player.y]; // Set target when begin shooting sequence
      } else this.cooldown.burstTimeCur += 1 * dt;
    }
  }
  shoot(dt: number) {
    if (this.cooldown.shootingCur >= this.cooldown.shootingMax) {
      // Shoot using bullet pattern
      this.pattern({
        x: this.reverse ? this.x + this.width : this.x,
        y: this.y + this.height / 2 + 4,
        size: 8,
        cooldown: this.cooldown,
        bulletArr: this.bullets,
        player: this.player,
        target: this.target,
      });
      this.cooldown.shootingCur = 0;
      this.cooldown.burstCur += 1 * dt;
      if (this.cooldown.burstCur >= this.cooldown.burstMax * dt) {
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
      this.cooldown.shootingCur += 1 * dt;
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
