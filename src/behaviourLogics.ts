import * as bp from './bulletPatterns';
import * as easing from './easing';

export const stillLogic: () => IBehaviourLogic = () => {
  return undefined;
};

export const linearLogic: () => IBehaviourLogic = () => {
  return {
    state: 0,
    stateDurationCur: 0,
    bulletTypes: [bp.linearLockOn, bp.spread5LockOn],
    behaviour: [
      {
        duration: 2,
        path: { x: -300, y: 300 },
        bulletType: 1,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: easing.easeLinear,
      },
      {
        duration: 1,
        path: { y: -400 },
        bulletType: 0,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: easing.easeLinear,
      },
      {
        duration: 3,
        path: { x: 300, y: 100 },
        bulletType: 0,
        shootAfter: 0,
        shootAfterPathing: true,
        easing: easing.easeLinear,
      },
    ],
  };
};
