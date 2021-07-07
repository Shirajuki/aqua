import Player from './player';
import Enemy from './enemy';
import Boss from './boss';
import type Bullet from './bullet';
import * as bp from './bulletPatterns';

import { stillLogic, linearLogic } from './behaviourLogics';
import type Particle from './particle';
import { explosion, ripple } from './particle';

class Game {
  state: number;
  player: Player;
  bullets: Bullet[];
  enemies: Enemy[];
  particles: Particle[];
  wave: number = 0;
  spawnTimer: number = 0;
  spawnCount: number = 0;
  enemyWavePattern: any[];
  score: number = 0;
  constructor() {
    this.state = 0;
    this.player = new Player(100, 100, 8, 8, 'red');
    this.bullets = [];
    this.particles = [];

    let enemy = new Boss(
      600,
      200,
      400,
      227,
      'rgba(0,0,0,0.2)',
      this.bullets,
      this.player,
      bp.spread5LockOn,
      undefined,
      100
    );
    this.enemies = [enemy];

    this.enemyWavePattern = [
      {
        enemies: [
          {
            x: 800,
            y: 100,
            width: 50,
            height: 50,
            color: 'orange',
            bulletType: bp.linearAim,
            hp: 15,
          },
        ],
        spawner: [
          { enemyIndex: 0, timeToSpawn: 1000 },
          { enemyIndex: 0, timeToSpawn: 1000 },
          { enemyIndex: 0, timeToSpawn: 1000 },
          { enemyIndex: 0, timeToSpawn: 1000 },
          { enemyIndex: 0, timeToSpawn: 1000 },
        ],
        waveDuration: 2000,
      },
    ];
    // setTimeout(() => this.addEnemy(), 2000);
  }
  draw(ctx: any) {
    // Game bullets
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.move();
      bullet.draw(ctx);
      if (bullet.outOfRange) this.bullets.splice(i, 1);
      else if (bullet.collisionC(this.player)) {
        this.bullets.splice(i, 1);
        this.player.hit();
      }
    }
    // Player bullets
    for (let i = this.player.bullets.length - 1; i >= 0; i--) {
      const bullet = this.player.bullets[i];
      bullet.move();
      bullet.draw(ctx);
      if (bullet.outOfRange) this.player.bullets.splice(i, 1);
    }
    // Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.move();
      particle.draw(ctx);
      if (particle.outOfRange) this.particles.splice(i, 1);
    }
    // Enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.logic(ctx);
      if (enemy.outOfRange2 || enemy.dead) {
        this.score += 10000;
        explosion({
          x: enemy.x + enemy.width / 2,
          y: enemy.y + enemy.height / 2,
          size: 10,
          amount: Math.max(enemy.width / 4, 30),
          particleArr: this.particles,
        });
        this.enemies.splice(i, 1);
        continue;
      }
      // Player bullet collision with enemy
      for (let j = this.player.bullets.length - 1; j >= 0; j--) {
        const bullet = this.player.bullets[j];
        if (enemy.collision(bullet)) {
          this.player.bullets.splice(j, 1);
          enemy.hit();
        }
      }
    }
    // Player movement
    this.player.logic(ctx);
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
    for (let i = 0; i < wave.spawner.length; i++) {
      const enemyIndex = wave.spawner[i].enemyIndex;
      const timeToSpawn = wave.spawner[i].timeToSpawn;
      const ei = wave.enemies[enemyIndex];
      const newEnemy = new Enemy(
        ei.x,
        ei.y,
        ei.width,
        ei.height,
        ei.color,
        this.bullets,
        this.player,
        ei.bulletType,
        ei.hp
      );
      setTimeout(() => {
        this.enemies.push(newEnemy);
      }, timer);
      timer += timeToSpawn;
    }
  }
  // Add boss
  addBoss() {
    let timer = 0;
    const wave = this.enemyWavePattern[this.wave];
    for (let i = 0; i < wave.spawner.length; i++) {
      const enemyIndex = wave.spawner[i].enemyIndex;
      const timeToSpawn = wave.spawner[i].timeToSpawn;
      const ei = wave.enemies[enemyIndex];
      const newEnemy = new Boss(
        ei.x,
        ei.y,
        ei.width,
        ei.height,
        ei.color,
        this.bullets,
        this.player,
        ei.bulletType,
        ei.behaviourLogics(),
        ei.hp
      );
      setTimeout(() => {
        this.enemies.push(newEnemy);
      }, timer);
      timer += timeToSpawn;
    }
  }
}
export default Game;
