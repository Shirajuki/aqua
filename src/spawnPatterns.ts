import * as behaviour from './behaviourLogics';

export const testSpawn = () => reverseLinearSpawn();
export const linearSpawn = () => [
  {
    enemies: [
      {
        x: 950,
        y: 250,
        width: 120,
        height: 70,
        color: 'rgba(0,0,0,0.5)',
        behaviour: behaviour.linearLogic,
        hp: 15,
      },
    ],
    spawner: [
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 250 } },
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 150 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 250 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 350 } },
      { enemyIndex: 0, timeToSpawn: 0, pos: { y: 50 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 250 } },
    ],
    waveDuration: 2000,
  },
];
export const inOutSpawn = () => [
  {
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
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 250 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 50 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 350 } },
      { enemyIndex: 0, timeToSpawn: 2000, pos: { y: 100 } },
    ],
    waveDuration: 2000,
  },
];
export const reverseLinearSpawn = () => [
  {
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
      { enemyIndex: 0, timeToSpawn: 2200, pos: { y: 50 } },
      { enemyIndex: 0, timeToSpawn: 2500, pos: { y: 350 } },
    ],
    waveDuration: 2000,
  },
];
