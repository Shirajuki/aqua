import Player from './player';
import Enemy from './enemy';
import type Bullet from './bullet';
import {
  linear,
  linearAccel,
  linearDecel,
  way20TurnRight,
  way20TurnLeft,
  way20,
  way30,
  spiralHowl,
  spiralHowlInward,
  spread5,
  spread8,
  spread5Reverse,
  linearAim,
  linearLockOn,
  spread5LockOn,
  spread8LockOn,
  homingSimple,
} from './bulletPatterns';

import { stillLogic, linearLogic } from './behaviourLogics';

class Game {
  state: number;
  player: Player;
  bullets: Bullet[];
  enemies: Enemy[];
  wave: number = 0;
  enemyWavePattern: any[];
  constructor() {
    this.state = 0;
    this.player = new Player(100, 100, 10, 10, 'red');
    this.bullets = [];

    let boss = new Enemy(
      900,
      300,
      50,
      50,
      'black',
      this.bullets,
      this.player,
      linearAim,
      null
    );
    this.enemies = [boss];

    this.enemyWavePattern = [
      {
        enemies: [
          new Enemy(
            900,
            100,
            50,
            50,
            'orange',
            this.bullets,
            this.player,
            spread5LockOn,
            linearLogic
          ),
        ],
      },
    ];
    this.addEnemy();
  }
  addEnemy() {
    for (const enemy of this.enemyWavePattern[this.wave].enemies) {
      this.enemies.push(enemy);
    }
  }
}
export default Game;
