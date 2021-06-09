/// <reference types="svelte" />

// BulletPatterns interface
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
// Cooldown interface
interface ICooldown {
  shootingCur: number;
  shootingMax: number;
  burstCur: number;
  burstMax: number;
  burstTimeCur: number;
  BurstTimeMax: number;
}
interface IBulletType {
  cooldown: ICooldown;
  pattern: ({}: IBulletPattern) => void;
}

// Behaviour interface
interface IBehaviour {
  duration: number;
  path: { x?: number; y?: number };
  bulletType: number;
  shootAfter: number;
  shootWhilePathing: boolean;
}
// BehaviourLogic interface
interface IBehaviourLogic {
  state: number;
  stateDurationCur: number;
  bulletTypes: IBulletType[];
  behaviour: IBehaviour[];
}
