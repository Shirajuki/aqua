import * as bp from './bulletPatterns';

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

export const linearLogic: () => IBehaviourLogic = () => {
  return {
    state: 0,
    stateDurationCur: 0,
    bulletTypes: [bp.linearLockOn, bp.spread5LockOn],
    behaviour: [
      {
        duration: 200,
        path: { x: 100, y: 300 },
        bulletType: 1,
        shootAfter: 50,
        shootAfterPathing: false,
      },
      {
        duration: 100,
        path: { y: 400 },
        bulletType: 0,
        shootAfter: 50,
        shootAfterPathing: false,
      },
      {
        duration: 300,
        path: { x: 900 },
        bulletType: 0,
        shootAfter: 0,
        shootAfterPathing: false,
      },
    ],
  };
};
