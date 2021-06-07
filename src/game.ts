import Player from './player';
import type Bullet from './bullets';

class Game {
  state: number;
  player: Player;
  bullets: Bullet[];
  constructor() {
    this.state = 0;
    this.player = new Player(100, 100, 10, 10, 'red');
    this.bullets = [];
  }
}
export default Game;
