import Enemy from './enemy';
import { lerp } from './utils';
import { easeOutQuad } from './lib/easing';

export default class Boss extends Enemy {
  maxHp: number = this.hp;
  hpPercent: number = 380;
  initialized: boolean = false;
  initializeTimer = {
    cur: 0,
    max: 20,
    startX: this.x,
  };
  logic(ctx: any, dt: number) {
    // Do logic and draw hp only after boss is initialized
    if (this.initialized) {
      super.logic(ctx, dt);
      this.drawBossHp(ctx);
    } else if (this.initializeTimer.cur >= this.initializeTimer.max) {
      this.initializeTimer.cur = 0;
      this.initialized = true;
    } else if (!this.initialized) {
      // Else increment timer while moving boss to screen
      this.x = easeOutQuad(
        Math.min(this.initializeTimer.cur, this.initializeTimer.max),
        this.initializeTimer.startX,
        -360,
        this.initializeTimer.max
      );
      this.initializeTimer.cur += 0.1 * dt;
      super.draw(ctx);
    }
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
  hit(dmg: any) {
    if (this.initialized) super.hit(dmg);
  }
}
