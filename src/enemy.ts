import Animal from './animal';
import type Bullet from './bullet';
import type Player from './player';
import * as ease from './easing';

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
  speed: number = 0;
  arrived: boolean = false;
  hp: number = 0;
  dead: boolean = false;
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
    hp: number
  ) {
    super(x, y, width, height, color);
    this.bullets = bullets;
    this.player = player;
    this.sprite.src = '/images/neko_sprite.png';

    // Bullet Pattern
    this.bulletType = bulletType;
    this.updateBulletType();

    this.hp = hp;
  }
  updateBulletType() {
    const { cooldown, pattern } = this.bulletType;
    this.cooldown = cooldown;
    this.pattern = pattern;
    this.target = [this.player.x, this.player.y];
  }
  animate() {
    if (this.animation.frameCurTimer >= this.animation.frameDuration) {
      this.animation.frameCurTimer = 0;
      this.animation.curFrame++;
    } else this.animation.frameCurTimer += this.animation.frameSpeed;
    if (this.animation.curFrame === this.animation.frames)
      this.animation.curFrame = 0;
  }
  logic(ctx: any) {
    this.shootingLogic();
    this.x -= ease.easeInQuad(1.2);
    this.y += ease.easeInQuad(0.8);
    // Animate and draw enemy
    this.animate();
    this.draw(ctx);
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
      }
    } else {
      this.cooldown.shootingCur++;
    }
  }
}
