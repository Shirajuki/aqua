import * as behaviour from './behaviourLogics';
import * as bp from './bulletPatterns';

export const testSpawn = (): ISpawnPattern => curveDownSpawn();
export const bossSpawn = (): ISpawnPattern => {
  return {
    enemies: [
      {
        x: 950,
        y: 200,
        width: 400,
        height: 227,
        color: 'rgba(0,0,0,0.2)',
        behaviour: undefined,
        bulletType: bp.homingSimple,
        hp: 100,
      },
    ],
    spawner: [{ enemyIndex: 0, timeToSpawn: 0, pos: {} }],
    boss: true,
  };
};
export const linearSpawn = (): ISpawnPattern => {
  return {
    enemies: [
      {
        x: 950,
        y: 250,
        width: 120,
        height: 70,
        color: 'rgba(0,0,0,0.5)',
        behaviour: behaviour.linearLogic,
        hp: 8,
      },
    ],
    spawner: [
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 250 } },
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 150 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 300 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 350 } },
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 70 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 250 } },
    ],
    waveDuration: 11000,
  };
};
export const inOutSpawn = (): ISpawnPattern => {
  return {
    enemies: [
      {
        x: 950,
        y: 250,
        width: 120,
        height: 70,
        color: 'rgba(0,0,0,0.5)',
        behaviour: behaviour.inOutLogic,
        hp: 8,
      },
    ],
    spawner: [
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 250 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 150 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 300 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 70 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 350 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 100 } },
    ],
    waveDuration: 14000,
  };
};
export const reverseLinearSpawn = (): ISpawnPattern => {
  return {
    enemies: [
      {
        x: -150,
        y: 250,
        width: 120,
        height: 70,
        color: 'rgba(0,0,0,0.5)',
        behaviour: behaviour.reverseLinearLogic,
        hp: 8,
        reverse: true,
      },
    ],
    spawner: [
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 400 } },
      { enemyIndex: 0, timeToSpawn: 2100, pos: { y: 100 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 200 } },
      { enemyIndex: 0, timeToSpawn: 2200, pos: { y: 70 } },
      { enemyIndex: 0, timeToSpawn: 2500, pos: { y: 350 } },
    ],
    waveDuration: 22000,
  };
};
export const waveSpawn = (): ISpawnPattern => {
  return {
    enemies: [
      {
        x: 950,
        y: 250,
        width: 120,
        height: 70,
        color: 'rgba(0,0,0,0.5)',
        behaviour: behaviour.waveLogic,
        hp: 8,
      },
    ],
    spawner: [
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 360 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 40 } },
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 360 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 40 } },
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 360 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 40 } },
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 360 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 40 } },
    ],
    waveDuration: 8000,
  };
};
export const curveDownSpawn = (): ISpawnPattern => {
  return {
    enemies: [
      {
        x: 950,
        y: 250,
        width: 120,
        height: 70,
        color: 'rgba(0,0,0,0.5)',
        behaviour: behaviour.curveDownLogic,
        hp: 8,
      },
    ],
    spawner: [
      { enemyIndex: 0, timeToSpawn: 1500, pos: { y: 50 } },
      { enemyIndex: 0, timeToSpawn: 1500, pos: { y: 50 } },
      { enemyIndex: 0, timeToSpawn: 1500, pos: { y: 100 } },
      { enemyIndex: 0, timeToSpawn: 1500, pos: { y: 100 } },
      { enemyIndex: 0, timeToSpawn: 1500, pos: { y: 150 } },
      { enemyIndex: 0, timeToSpawn: 1500, pos: { y: 150 } },
    ],
    waveDuration: 13000,
  };
};
export const curveUpSpawn = (): ISpawnPattern => {
  return {
    enemies: [
      {
        x: 950,
        y: 250,
        width: 120,
        height: 70,
        color: 'rgba(0,0,0,0.5)',
        behaviour: behaviour.curveUpLogic,
        hp: 8,
      },
    ],
    spawner: [
      { enemyIndex: 0, timeToSpawn: 1500, pos: { y: 400 } },
      { enemyIndex: 0, timeToSpawn: 1500, pos: { y: 400 } },
      { enemyIndex: 0, timeToSpawn: 1500, pos: { y: 410 } },
      { enemyIndex: 0, timeToSpawn: 1500, pos: { y: 410 } },
      { enemyIndex: 0, timeToSpawn: 1500, pos: { y: 420 } },
      { enemyIndex: 0, timeToSpawn: 1500, pos: { y: 420 } },
    ],
    waveDuration: 17000,
  };
};
export const doubleSlowWave = (): ISpawnPattern => {
  return {
    enemies: [
      {
        x: 950,
        y: 250,
        width: 120,
        height: 70,
        color: 'rgba(0,0,0,0.5)',
        behaviour: behaviour.waveLogic,
        hp: 8,
      },
    ],
    spawner: [
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 200 } },
      { enemyIndex: 0, timeToSpawn: 2500, pos: { y: 90 } },
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 200 } },
      { enemyIndex: 0, timeToSpawn: 2500, pos: { y: 90 } },
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 200 } },
      { enemyIndex: 0, timeToSpawn: 2500, pos: { y: 90 } },
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 200 } },
      { enemyIndex: 0, timeToSpawn: 2500, pos: { y: 90 } },
    ],
    waveDuration: 13000,
  };
};
export const inOutLinear = (): ISpawnPattern => {
  return {
    enemies: [
      {
        x: 950,
        y: 250,
        width: 120,
        height: 70,
        color: 'rgba(0,0,0,0.5)',
        behaviour: behaviour.inOutLinearLogic,
        hp: 8,
      },
    ],
    spawner: [
      { enemyIndex: 0, timeToSpawn: 2300, pos: { y: 250 } },
      { enemyIndex: 0, timeToSpawn: 2300, pos: { y: 150 } },
      { enemyIndex: 0, timeToSpawn: 2300, pos: { y: 300 } },
      { enemyIndex: 0, timeToSpawn: 2300, pos: { y: 70 } },
      { enemyIndex: 0, timeToSpawn: 2300, pos: { y: 350 } },
      { enemyIndex: 0, timeToSpawn: 2300, pos: { y: 100 } },
    ],
    waveDuration: 16000,
  };
};
export const fastLinearSpawn = (): ISpawnPattern => {
  return {
    enemies: [
      {
        x: 950,
        y: 250,
        width: 120,
        height: 70,
        color: 'rgba(0,0,0,0.5)',
        behaviour: behaviour.fastLinearLogic,
        hp: 3,
      },
    ],
    spawner: [
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 250 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 150 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 300 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 70 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 325 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 125 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 115 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 70 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 350 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 100 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 320 } },
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 255 } },
    ],
    waveDuration: 16000,
  };
};
export const tripleLinearSpawn = (): ISpawnPattern => {
  return {
    enemies: [
      {
        x: 950,
        y: 250,
        width: 120,
        height: 70,
        color: 'rgba(0,0,0,0.5)',
        behaviour: behaviour.linearLogic,
        hp: 8,
      },
    ],
    spawner: [
      { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 225 } },
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 100 } },
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 350 } },
    ],
    waveDuration: 16000,
  };
};
