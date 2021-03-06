import Player from './player';
import Enemy from './enemy';
import Boss from './boss';
import type Bullet from './bullet';
import * as bp from './lib/bulletPatterns';
import type Particle from './particle';
import type Item from './item';
import { explosion, glitters, ripple, shockwave } from './particle';
import { point, smallPoint, powerup, lifeup } from './item';
// import { testLogic } from './lib/behaviourLogics';
import stages from './stages';
import { CANVAS_HEIGHT } from './constants';

class Game {
  state: number;
  player: Player;
  bullets: Bullet[];
  enemies: Enemy[];
  particles: Particle[];
  items: Item[];
  wave: number = -1;
  stage: number = 0;
  spawnTimer: number = 400;
  spawnTimerCur: number = 0;
  spawnerDivideTimer: number = 12;
  spawnerCount: number = 0;
  spawnerPool: Enemy[] = [];
  spawnerPoolTimer: number[] = [];
  enemyWavePattern: any[];
  score: number = 0;
  showWarning: boolean = false;
  isBossStage: boolean = false;

  // Framerate independence using timestamps
  dt: number = 1; // initial value to 1
  constructor() {
    this.state = 0;
    this.player = new Player(100, CANVAS_HEIGHT / 2, 8, 8, 'aqua');
    this.bullets = [];
    this.particles = [];
    this.items = [];

    let boss = new Boss(
      600,
      200,
      400,
      227,
      'rgba(0,0,0,0.2)',
      this.bullets,
      this.player,
      bp.homingSimple,
      undefined,
      100
    );
    this.enemies = [];

    this.enemyWavePattern = stages[this.stage];
    //if (this.enemies.length === 0) setTimeout(() => this.addEnemy(), 2000);
  }
  draw(ctx: any) {
    // Enemy bullets
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.move(this.dt);
      bullet.draw(ctx);
      if (bullet.outOfRange) this.bullets.splice(i, 1);
      else if (bullet.collisionC(this.player)) {
        if (!this.player.invulnerable) {
          this.bullets.splice(i, 1);
          this.player.hit();
        }
      }
    }
    // Player bullets
    for (let i = this.player.bullets.length - 1; i >= 0; i--) {
      const bullet = this.player.bullets[i];
      bullet.move(this.dt);
      bullet.draw(ctx);
      if (bullet.outOfRange) this.player.bullets.splice(i, 1);
    }
    // Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.move();
      particle.draw(ctx);
      if (particle.outOfRange || particle.lifeTime <= 0)
        this.particles.splice(i, 1);
    }
    // Items
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      item.move();
      item.draw(ctx);
      if (item.outOfRange) this.items.splice(i, 1);
      if (this.player.collisionSprite(item)) {
        this.items.splice(i, 1);
        // Spawn glitter effect
        glitters({
          x: this.player.x,
          y: this.player.y - 20,
          size: 4,
          amount: 12,
          particleArr: this.particles,
        });
        if (item.type === 0) {
          this.score += 150;
          // Show text display??
        } else if (item.type === 1) {
          this.score += 50;
        } else if (item.type === 2) {
          this.player.stats.power += 0.125;
          if (
            Math.floor(this.player.stats.power) !==
            Math.floor(this.player.stats.power - 0.125)
          )
            shockwave({
              x: this.player.x - 10,
              y: this.player.y,
              size: 20,
              amount: 1,
              particleArr: this.particles,
              lifeTime: 0.22,
            });
        } else if (item.type === 3) {
          if (this.player.stats.life < 3) this.player.stats.life += 1;
        }
      }
    }
    // Enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.logic(ctx, this.dt);
      // Collision and dead check
      if (enemy.dead) {
        this.spawnerCount++;
        this.score += 100;
        explosion({
          x: enemy.x + enemy.width / 2,
          y: enemy.y + enemy.height / 2,
          size: 10,
          amount: Math.max(enemy.width / 4, 30),
          particleArr: this.particles,
          speed: Math.min(enemy.width / 40, 7),
        });
        if (enemy.type === 1) {
          this.score += 2900; // Boss gives 3000 points
          // Reset boss stage, start spawner interval
          this.isBossStage = false;
          setTimeout(() => this.addEnemy(), 0);
          // Add in particles and item drops
          shockwave({
            x: enemy.x + enemy.width / 2,
            y: enemy.y + enemy.height / 2,
            size: 30,
            amount: 30,
            particleArr: this.particles,
          });
          smallPoint({
            x: enemy.x + enemy.width / 2,
            y: enemy.y - 100,
            size: 20,
            amount: 20,
            itemArr: this.items,
            player: this.player,
          });
          lifeup({
            x: enemy.x + enemy.width / 2,
            y: enemy.y + enemy.height / 2,
            size: 40,
            amount: 1,
            itemArr: this.items,
          });
        }
        // 1/8 chance of powerup drop
        if (Math.floor(Math.random() * 8) === 0) {
          powerup({
            x: enemy.x + enemy.width / 2,
            y: enemy.y + enemy.height / 2,
            size: 40,
            amount: 1,
            itemArr: this.items,
          });
        } else {
          point({
            x: enemy.x + enemy.width / 2,
            y: enemy.y + enemy.height / 2,
            size: 40,
            amount: 2,
            itemArr: this.items,
          });
        }
        this.enemies.splice(i, 1);
        continue;
      }
      if (enemy.outOfRange) {
        this.enemies.splice(i, 1);
        continue;
      }
      // Player collision with enemy, hurts the player too
      if (enemy.collision(this.player) && !this.player.invulnerable)
        this.player.hit();
      // Player bullet collision with enemy
      for (let j = this.player.bullets.length - 1; j >= 0; j--) {
        const bullet = this.player.bullets[j];
        if (enemy.collision(bullet)) {
          this.player.bullets.splice(j, 1);
          enemy.hit(bullet.damage);
        }
      }
    }
    // Player movement
    this.player.logic(ctx, this.dt);
    ripple({
      x: this.player.x - 30,
      y: this.player.y + 20,
      size: 4,
      amount: 1,
      particleArr: this.particles,
    });
    // this.spawnLogic();
  }
  spawnLogic() {
    if (this.spawnTimerCur >= this.spawnTimer) {
      this.spawnTimerCur = 0;
      this.addEnemy();
    } else this.spawnTimerCur++;
    if (this.spawnTimerCur % 100 === 0) console.log(this.spawnTimerCur);
    if (this.spawnerPoolTimer.length > 0) {
      if (this.spawnerCount >= this.spawnerPoolTimer.length) {
        this.spawnerCount = 0;
        this.spawnTimerCur = this.spawnTimer;
        return;
      }
      const indexes = this.spawnerPoolTimer
        .map((n, i) => (n === this.spawnTimerCur ? i : -1))
        .filter((i) => i > -1);
      for (const index of indexes) {
        this.enemies.push(this.spawnerPool[index]);
        if (this.spawnerPool[index] instanceof Boss) this.showWarning = false;
        console.log('spawn enemy', index);
      }
    }
  }
  addEnemy() {
    this.wave++;
    let timer = 0;
    const wave = this.enemyWavePattern[this.wave];
    const boss = wave?.boss ?? false;
    if (!wave) {
      // Stage finished, reset wave level and go to next stage
      this.wave = -1;
      this.stage++;
      if (!stages[this.stage]) this.stage--; // Stuck at last stage if none more found
      this.enemyWavePattern = stages[this.stage];
      return;
    }
    this.spawnTimer = Math.floor(wave.waveDuration / this.spawnerDivideTimer);
    if (boss) {
      this.spawnerPool.length = 0;
      this.spawnerPoolTimer.length = 0;
      this.addBoss(wave);
      this.spawnTimer = 100000; // Set high number
    } else {
      this.spawnerPool.length = 0;
      this.spawnerPoolTimer.length = 0;
      for (let i = 0; i < wave.spawner.length; i++) {
        const pos = wave.spawner[i].pos;
        const enemyIndex = wave.spawner[i].enemyIndex;
        const timeToSpawn = wave.spawner[i].timeToSpawn;
        const ei = wave.enemies[enemyIndex];
        const newEnemy = new Enemy(
          pos.x || ei.x,
          pos.y || ei.y,
          ei.width,
          ei.height,
          ei.color,
          this.bullets,
          this.player,
          ei.bulletType,
          ei.behaviour ? ei.behaviour() : undefined,
          ei.hp,
          ei.reverse || false
        );
        this.spawnerPool.push(newEnemy);
        this.spawnerPoolTimer.push(timer);
        timer += Math.floor(timeToSpawn / this.spawnerDivideTimer);
      }
    }
  }
  // Add boss
  addBoss(wave: any) {
    this.showWarning = true;
    this.isBossStage = true;
    const pos = wave.spawner[0].pos;
    const enemyIndex = wave.spawner[0].enemyIndex;
    const ei = wave.enemies[enemyIndex];
    const newEnemy = new Boss(
      pos.x || ei.x,
      pos.y || ei.y,
      ei.width,
      ei.height,
      ei.color,
      this.bullets,
      this.player,
      ei.bulletType,
      ei.behaviour ? ei.behaviour() : undefined,
      ei.hp
    );
    this.spawnerPool.push(newEnemy);
    this.spawnerPoolTimer.push(Math.floor(6100 / this.spawnerDivideTimer));
  }
}
export default Game;
