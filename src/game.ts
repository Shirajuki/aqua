import Player from './player';
import Enemy from './enemy';
import type Bullet from './bullet';
import * as bp from './bulletPatterns';

import { stillLogic, linearLogic } from './behaviourLogics';

class Game {
  state: number;
  player: Player;
  bullets: Bullet[];
  enemies: Enemy[];
  wave: number = 0;
  spawnTimer: number = 0;
  spawnCount: number = 0;
  enemyWavePattern: any[];
  constructor() {
    this.state = 0;
    this.player = new Player(100, 100, 10, 10, 'red');
    this.bullets = [];

    let boss = new Enemy(
      800,
      300,
      50,
      50,
      'black',
      this.bullets,
      this.player,
      bp.linearAim,
      null,
      10000
    );
    this.enemies = [boss];

    this.enemyWavePattern = [
      {
        enemies: [
          {
            x: 800,
            y: 100,
            width: 50,
            height: 50,
            color: 'orange',
            bulletType: bp.spread5LockOn,
            behaviourLogics: linearLogic,
            hp: 10,
          },
        ],
        spawner: [
          // { enemyIndex: 0, timeToSpawn: 1000 },
          //{ enemyIndex: 0, timeToSpawn: 1000 },
          //{ enemyIndex: 0, timeToSpawn: 1000 },
          //{ enemyIndex: 0, timeToSpawn: 1000 },
          //{ enemyIndex: 0, timeToSpawn: 1000 },
        ],
        waveDuration: 2000,
      },
    ];
    this.addEnemy();
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
