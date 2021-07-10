import Player from './player';
import Enemy from './enemy';
import Boss from './boss';
import type Bullet from './bullet';
import * as bp from './bulletPatterns';
import type Particle from './particle';
import type Item from './item';
import { explosion, ripple } from './particle';
import { point } from './item';
import { testLogic } from './behaviourLogics';
import * as pattern from './spawnPatterns';

class Game {
  state: number;
  player: Player;
  bullets: Bullet[];
  enemies: Enemy[];
  particles: Particle[];
  items: Item[];
  wave: number = 0;
  spawnTimer: number = 0;
  spawnCount: number = 0;
  enemyWavePattern: any[];
  score: number = 0;
  showWarning: boolean = false;
  // Framerate independence using timestamps
  dt: number = 1; // initial value to 1
  constructor() {
    this.state = 0;
    this.player = new Player(100, 100, 8, 8, 'aqua');
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

    this.enemyWavePattern = [pattern.testSpawn(), pattern.bossSpawn()];
    setTimeout(() => this.addEnemy(), 2000);
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
        if (item.type === 0) {
          console.log('get item: point');
          this.score += 300;
          // Show text display
        } else if (item.type === 1) {
          console.log('get item: powerup');
        } else if (item.type === 2) {
          console.log('get item: life');
        }
      }
    }
    // Enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.logic(ctx, this.dt);
      // Collision and dead check
      if (enemy.dead) {
        this.score += 10000;
        explosion({
          x: enemy.x + enemy.width / 2,
          y: enemy.y + enemy.height / 2,
          size: 10,
          amount: Math.max(enemy.width / 4, 30),
          particleArr: this.particles,
          speed: Math.min(enemy.width / 40, 7),
        });
        point({
          x: enemy.x + enemy.width / 2,
          y: enemy.y + enemy.height / 2,
          size: 40,
          amount: 2,
          particleArr: this.items,
        });
        this.enemies.splice(i, 1);
        continue;
      }
      if (enemy.outOfRange) {
        this.enemies.splice(i, 1);
        continue;
      }
      // Player collision with enemy, hurts the player too
      if (enemy.collision(this.player)) this.player.hit();
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
  }
  addEnemy() {
    let timer = 0;
    const wave = this.enemyWavePattern[this.wave];
    const boss = wave?.boss ?? false;
    if (boss) {
      this.addBoss(wave);
    } else {
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
        setTimeout(() => {
          this.enemies.push(newEnemy);
        }, timer);
        timer += timeToSpawn;
      }
    }
    this.wave++;
  }
  // Add boss
  addBoss(wave: any) {
    this.showWarning = true;
    setTimeout(() => {
      this.showWarning = false;
      for (let i = 0; i < wave.spawner.length; i++) {
        const pos = wave.spawner[i].pos;
        const enemyIndex = wave.spawner[i].enemyIndex;
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
        this.enemies.push(newEnemy);
      }
    }, 6100);
  }
}
export default Game;
