import Animal from './animal';
import Bullet, { BulletSinus } from './bullet';
import { lerp } from './utilities';

class Player extends Animal {
  // Movement values
  height = this.width;
  movement = { left: false, up: false, right: false, down: false };
  shooting: boolean = false;
  spelling: boolean = false;
  focusing: boolean = false;
  velocity: number[] = [6, 3]; // [normal, slow]
  bullets: Bullet[] = [];
  cooldown = {
    shootingCur: 0,
    shootingMax: 5,
  };
  // Animation
  sprite = new Image();
  animation = {
    curFrame: 0,
    frames: 5,
    frameSpeed: 1,
    frameCurTimer: 0,
    frameDuration: 3,
  };
  // Rotate player on movement
  leanSpeed: number = 0.5;
  lean: number = 0;
  // Player stats
  stats = {
    life: 3,
    spell: 1,
    power: 1,
  };
  dead: boolean = false;
  // Other values
  invulnerable: boolean = false;
  invulnerableTimer: number = 0;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    super(x, y, width, height, color);
    this.sprite.src = '/images/aqua_sprite2.png';
  }
  collisionSprite(other: Animal) {
    return !(
      this.y - 80 + 133 < other.y ||
      this.y - 80 > other.y + other.height ||
      this.x - 60 + 100 < other.x ||
      this.x > other.x + other.width
    );
  }
  move(dt: number) {
    const v = this.velocity[this.focusing ? 1 : 0] * dt;
    if (this.movement.left && this.x - v - this.width * 2 > 0) this.x -= v;
    if (this.movement.up && this.y - v - this.height * 2 > 80) this.y -= v;
    if (this.movement.right && this.x + v < 924 - this.width * 2) this.x += v;
    if (this.movement.down && this.y + v < 520 - this.height * 2) this.y += v;
  }
  shoot(dt: number) {
    if (this.cooldown.shootingCur >= this.cooldown.shootingMax) {
      if (this.stats.power >= 4) {
        this.bullets.push(
          new BulletSinus(this.x, this.y, 16, 16, 'white', [8, 0], [0, 0], 2)
        );
        this.bullets.push(
          new BulletSinus(this.x, this.y, 16, 16, 'white', [8, 30], [0, 0], 2)
        );
      } else if (this.stats.power >= 3) {
        this.bullets.push(
          new BulletSinus(this.x, this.y, 16, 16, 'white', [8, 0], [0, 0], 2)
        );
        this.bullets.push(
          new BulletSinus(this.x, this.y, 16, 16, 'white', [8, 30], [0, 0], 2)
        );
      } else if (this.stats.power >= 2) {
        this.bullets.push(
          new Bullet(this.x, this.y - 10, 16, 16, 'white', [8, 0], [0, 0])
        );
        this.bullets.push(
          new Bullet(this.x, this.y + 10, 16, 16, 'white', [8, 0], [0, 0])
        );
      } else if (this.stats.power >= 1)
        this.bullets.push(
          new Bullet(this.x, this.y, 16, 16, 'blue', [8, 0], [0, 0])
        );
      this.cooldown.shootingCur = 0;
    } else this.cooldown.shootingCur += 1 * dt;
  }
  spell(dt: number) {
    if (this.cooldown.shootingCur >= this.cooldown.shootingMax) {
      this.bullets.push(
        new Bullet(this.x, this.y, 16, 16, 'red', [8, 0], [0, 0])
      );
      this.cooldown.shootingCur = 0;
    } else this.cooldown.shootingCur += 1 * dt;
  }
  draw(ctx: any) {
    // Handle player leaning smoothly using lerp
    if (this.movement.right && this.lean > -4)
      this.lean = lerp(this.lean, this.lean - this.leanSpeed, 0.5);
    else if (this.movement.left && this.lean < 3)
      this.lean = lerp(this.lean, this.lean + this.leanSpeed, 0.5);
    else if (this.lean > 0)
      this.lean = lerp(this.lean, this.lean - this.leanSpeed, 0.5);
    else if (this.lean < 0)
      this.lean = lerp(this.lean, this.lean + this.leanSpeed, 0.5);

    ctx.save();
    // Translate the origin to the center of the image
    ctx.translate(this.x - 60 + 100 / 2, this.y - 80 + 133 / 2);
    // Rotate player
    ctx.rotate((this.lean * Math.PI) / 180);
    if (this.sprite.complete)
      ctx.drawImage(
        this.sprite,
        this.invulnerable && this.invulnerableTimer > 3 ? 410 : 0,
        524 * this.animation.curFrame,
        408,
        524,
        -100 / 2, // Draw by negative width/2 and height/2
        -133 / 2,
        100,
        133
      );
    if (this.invulnerableTimer > 6) this.invulnerableTimer = 0;
    else this.invulnerableTimer++;
    ctx.restore();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    ctx.fill();
  }
  animate() {
    if (this.animation.frameCurTimer >= this.animation.frameDuration) {
      this.animation.frameCurTimer = 0;
      this.animation.curFrame++;
    } else this.animation.frameCurTimer += this.animation.frameSpeed;
    if (this.animation.curFrame === this.animation.frames)
      this.animation.curFrame = 0;
  }
  logic(ctx: any, dt: number) {
    if (this.spelling) this.spell(dt);
    if (this.shooting) this.shoot(dt);
    this.move(dt);
    this.animate();
    this.draw(ctx);
  }
  hit() {
    // Add invis on a timer
    this.color = 'white';
    this.invulnerable = true;
    setTimeout(() => {
      this.color = 'aqua';
      this.invulnerable = false;
    }, 2500); // 2.5 second invulnerable frame
    this.stats.life--;
    console.log(1);
  }
}
export default Player;
