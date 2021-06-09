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

export const stillLogic: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 5, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: () => {
    console.log(123);
  },
};

export const linearLogic: IBehaviourLogic = {
  state: 0,
  stateDurationCur: 0,
  bulletTypes: [linearLockOn, spread5LockOn],
  behaviour: [
    {
      duration: 1000,
      path: { x: 100 },
      bulletType: 0,
      shootAfter: 1000,
      shootWhilePathing: false,
    },
    {
      duration: 1000,
      path: { y: 300 },
      bulletType: 1,
      shootAfter: 1000,
      shootWhilePathing: false,
    },
  ],
};
