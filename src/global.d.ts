/// <reference types="svelte" />

// BulletPatterns interface
interface IBulletPattern {
  x: number;
  y: number;
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
  shootAfterPathing: boolean;
  easing: {
    x: (t: number, b: number, c: number, d: number) => number;
    y: (t: number, b: number, c: number, d: number) => number;
  };
}
// BehaviourLogic interface
interface IBehaviourLogic {
  state: number;
  stateDurationCur: number;
  bulletTypes: IBulletType[];
  behaviour: IBehaviour[];
}

// Particle interface
interface IParticlePattern {
  x: number;
  y: number;
  size: number;
  amount: number;
  particleArr: Particle[];
  speed?: number;
}
// Spawn interface
interface ISpawnPattern {
  enemies: {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    behaviour: () => IBehaviourLogic;
    bulletType: IBulletType;
    hp: number;
    reverse?: boolean;
  }[];
  spawner: {
    enemyIndex: number;
    timeToSpawn: number;
    pos: { x?: number; y?: number };
  }[];
  waveDuration?: number;
  boss?: boolean;
}
