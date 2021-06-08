/// <reference types="svelte" />
//
interface IBulletPattern {
  x: number;
  y: number;
  width: number;
  height: number;
  size: number;
  cooldown?: any;
  bulletArr: Bullet[];
  player?: Player;
  target?: number[];
}
