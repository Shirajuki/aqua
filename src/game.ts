import Player from './player';
import Enemy from './enemy';
import Boss from './boss';
import type Bullet from './bullet';
import * as bp from './bulletPatterns';

import { stillLogic, linearLogic } from './behaviourLogics';
import type Particle from './particle';

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
