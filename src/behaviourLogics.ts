import * as bp from './bulletPatterns';
import * as easing from './easing';

export const stillLogic: () => IBehaviourLogic = () => {
  return undefined;
};
// Used for testing
export const testLogic: () => IBehaviourLogic = () => {
  return {
    state: 0,
    stateDurationCur: 0,
    bulletTypes: [bp.linearLockOn, bp.spread5LockOn],
    behaviour: [
      {
        duration: 1.4,
        path: { x: -300, y: 50 },
        bulletType: 1,
        shootAfter: 0,
        shootAfterPathing: true,
        easing: easing.easeOutQuad,
      },
      {
        duration: 1.4,
        path: { x: 300, y: 50 },
        bulletType: 0,
        shootAfter: 4,
        shootAfterPathing: false,
        easing: easing.easeInQuad,
      },
      {
        duration: 1,
        path: { x: 900 },
        bulletType: 0,
        shootAfter: 4,
        shootAfterPathing: false,
        easing: easing.easeLinear,
      },
    ],
  };
};
export const linearLogic: () => IBehaviourLogic = () => {
  return {
    state: 0,
    stateDurationCur: 0,
    bulletTypes: [bp.linearLockOn],
    behaviour: [
      {
        duration: 3,
        path: { x: -300 },
        bulletType: 0,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: easing.easeLinear,
      },
      {
        duration: 3,
        path: { x: -300 },
        bulletType: 0,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: easing.easeLinear,
      },
      {
        duration: 3,
        path: { x: -300 },
        bulletType: 0,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: easing.easeLinear,
      },
    ],
  };
};
export const inOutLogic: () => IBehaviourLogic = () => {
  return {
    state: 0,
    stateDurationCur: 0,
    bulletTypes: [bp.linearLockOn, bp.spread5LockOn],
    behaviour: [
      {
        duration: 1.4,
        path: { x: -300, y: 50 },
        bulletType: 1,
        shootAfter: 0,
        shootAfterPathing: true,
        easing: easing.easeOutQuad,
      },
      {
        duration: 1.4,
        path: { x: 300, y: 50 },
        bulletType: 0,
        shootAfter: 4,
        shootAfterPathing: false,
        easing: easing.easeInQuad,
      },
      {
        duration: 1,
        path: { x: 900 },
        bulletType: 0,
        shootAfter: 4,
        shootAfterPathing: false,
        easing: easing.easeLinear,
      },
    ],
  };
};
export const reverseLinearLogic: () => IBehaviourLogic = () => {
  return {
    state: 0,
    stateDurationCur: 0,
    bulletTypes: [bp.linearLockOn],
    behaviour: [
      {
        duration: 3,
        path: { x: 300 },
        bulletType: 0,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: easing.easeLinear,
      },
      {
        duration: 3,
        path: { x: 300 },
        bulletType: 0,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: easing.easeLinear,
      },
      {
        duration: 3,
        path: { x: 300 },
        bulletType: 0,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: easing.easeLinear,
      },
    ],
  };
};
