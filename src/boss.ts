import Enemy from './enemy';
import { lerp } from './utilities';

export default class Boss extends Enemy {
  maxHp: number = this.hp;
  hpPercent: number = 380;
  logic(ctx: any, dt: number) {
    super.logic(ctx, dt);
    if (!this.showWarning) this.drawBossHp(ctx);
  }
  showWarning: boolean = true;
  warning = {
    cur: 0,
    max: 5,
    y: 10,
    scrollX: 0,
    amount: 0,
    amountMax: 10,
  };
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
    super.hit();
  }
}
