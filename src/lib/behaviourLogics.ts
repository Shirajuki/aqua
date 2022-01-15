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
    bulletTypes: [bp.linearLockOn],
    behaviour: [
      {
        duration: 6,
        path: { x: -1000, y: 600 },
        bulletType: 0,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeInOutSine },
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
        easing: { x: easing.easeLinear, y: easing.easeLinear },
      },
      {
        duration: 3,
        path: { x: -300 },
        bulletType: 0,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeLinear },
      },
      {
        duration: 3,
        path: { x: -300 },
        bulletType: 0,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeLinear },
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
        easing: { x: easing.easeOutQuad, y: easing.easeOutQuad },
      },
      {
        duration: 1.4,
        path: { x: 300, y: 50 },
        bulletType: 0,
        shootAfter: 4,
        shootAfterPathing: false,
        easing: { x: easing.easeOutQuad, y: easing.easeOutQuad },
      },
      {
        duration: 1,
        path: { x: 900 },
        bulletType: 0,
        shootAfter: 4,
        shootAfterPathing: false,
        easing: { x: easing.easeOutQuad, y: easing.easeOutQuad },
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
        duration: 5,
        path: { x: 500 },
        bulletType: 0,
        shootAfter: 4,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeLinear },
      },
      {
        duration: 5,
        path: { x: 500 },
        bulletType: 0,
        shootAfter: 6,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeLinear },
      },
      {
        duration: 3,
        path: { x: 300 },
        bulletType: 0,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeLinear },
      },
    ],
  };
};
export const waveLogic: () => IBehaviourLogic = () => {
  return {
    state: 0,
    stateDurationCur: 0,
    bulletTypes: [bp.linearLockOn],
    behaviour: [
      {
        duration: 1,
        path: { x: -150, y: 70 },
        bulletType: 0,
        shootAfter: 4,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeInOutSine },
      },
      {
        duration: 1,
        path: { x: -150, y: -70 },
        bulletType: 0,
        shootAfter: 4,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeInOutSine },
      },
      {
        duration: 1,
        path: { x: -150, y: 70 },
        bulletType: 0,
        shootAfter: 0,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeInOutSine },
      },
      {
        duration: 1,
        path: { x: -150, y: -70 },
        bulletType: 0,
        shootAfter: 4,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeInOutSine },
      },
    ],
  };
};
export const curveDownLogic: () => IBehaviourLogic = () => {
  return {
    state: 0,
    stateDurationCur: 0,
    bulletTypes: [bp.linearLockOn],
    behaviour: [
      {
        duration: 6,
        path: { x: -1000, y: 600 },
        bulletType: 0,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeInOutSine },
      },
    ],
  };
};
export const curveUpLogic: () => IBehaviourLogic = () => {
  return {
    state: 0,
    stateDurationCur: 0,
    bulletTypes: [bp.linearLockOn],
    behaviour: [
      {
        duration: 8,
        path: { x: -1500, y: -500 },
        bulletType: 0,
        shootAfter: 1,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeInOutSine },
      },
    ],
  };
};

export const inOutLinearLogic: () => IBehaviourLogic = () => {
  return {
    state: 0,
    stateDurationCur: 0,
    bulletTypes: [bp.linearLockOn],
    behaviour: [
      {
        duration: 1.4,
        path: { x: -250 },
        bulletType: 0,
        shootAfter: 0.5,
        shootAfterPathing: true,
        easing: { x: easing.easeOutQuad, y: easing.easeOutQuad },
      },
      {
        duration: 2,
        path: { x: 250 },
        bulletType: 0,
        shootAfter: 4,
        shootAfterPathing: false,
        easing: { x: easing.easeOutQuad, y: easing.easeOutQuad },
      },
      {
        duration: 1,
        path: { x: 900 },
        bulletType: 0,
        shootAfter: 4,
        shootAfterPathing: false,
        easing: { x: easing.easeOutQuad, y: easing.easeOutQuad },
      },
    ],
  };
};
export const fastLinearLogic: () => IBehaviourLogic = () => {
  return {
    state: 0,
    stateDurationCur: 0,
    bulletTypes: [bp.linearLockOn],
    behaviour: [
      {
        duration: 1,
        path: { x: -600 },
        bulletType: 0,
        shootAfter: 2,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeLinear },
      },
      {
        duration: 1,
        path: { x: -600 },
        bulletType: 0,
        shootAfter: 2,
        shootAfterPathing: false,
        easing: { x: easing.easeLinear, y: easing.easeLinear },
      },
    ],
  };
};
