import Bullet from './bullet';

export const linear = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 5, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 100,
  },
  pattern: (
    x: number,
    y: number,
    width: number,
    height: number,
    size: number,
    _: any,
    bulletArr: Bullet[]
  ) => {
    bulletArr.push(
      new Bullet(
        x + width / 2 - size / 2,
        y + height / 2 + size / 2,
        size,
        size,
        'green',
        [-8, 0],
        [0, 0]
      )
    );
  },
};

export const linearAccel = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 5, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 100,
  },
  pattern: (
    x: number,
    y: number,
    width: number,
    height: number,
    size: number,
    _: any,
    bulletArr: Bullet[]
  ) => {
    bulletArr.push(
      new Bullet(
        x + width / 2 - size / 2,
        y + height / 2 + size / 2,
        size,
        size,
        'green',
        [-5, 0],
        [-0.15, 0]
      )
    );
  },
};

export const linearDecel = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 5, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 100,
  },
  pattern: (
    x: number,
    y: number,
    width: number,
    height: number,
    size: number,
    _: any,
    bulletArr: Bullet[]
  ) => {
    bulletArr.push(
      new Bullet(
        x + width / 2 - size / 2,
        y + height / 2 + size / 2,
        size,
        size,
        'green',
        [-8, 0],
        [0.03, 0]
      )
    );
  },
};

export const way20TurnRight = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 100,
  },
  pattern: (
    x: number,
    y: number,
    width: number,
    height: number,
    size: number,
    cooldown: any,
    bulletArr: Bullet[]
  ) => {
    let j = cooldown.burstCur;
    let speed = 5;
    let amount = 20;
    let start = 0;
    let step = (2 * Math.PI) / amount;
    for (let i = 1; i <= amount; i++) {
      let angle = start + (j + i) * step;
      let vx = Math.cos(angle + 2 * j) * speed;
      let vy = Math.sin(angle + 2 * j) * speed;
      bulletArr.push(
        new Bullet(
          x + width / 2 - size / 2,
          y + height / 2 + size / 2,
          size,
          size,
          'green',
          [vx, vy],
          [0, 0]
        )
      );
    }
  },
};

export const way20TurnLeft = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 100,
  },
  pattern: (
    x: number,
    y: number,
    width: number,
    height: number,
    size: number,
    cooldown: any,
    bulletArr: Bullet[]
  ) => {
    let j = cooldown.burstCur;
    let speed = 5;
    let amount = 20;
    let start = 0;
    let step = (2 * Math.PI) / amount;
    for (let i = 1; i <= amount; i++) {
      let angle = start + (j + i) * step;
      let vx = Math.cos(angle - 2 * j) * speed;
      let vy = Math.sin(angle - 2 * j) * speed;
      bulletArr.push(
        new Bullet(
          x + width / 2 - size / 2,
          y + height / 2 + size / 2,
          size,
          size,
          'green',
          [vx, vy],
          [0, 0]
        )
      );
    }
  },
};

export const way20 = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 100,
  },
  pattern: (
    x: number,
    y: number,
    width: number,
    height: number,
    size: number,
    _: any,
    bulletArr: Bullet[]
  ) => {
    let speed = 5;
    let amount = 20;
    let start = 0;
    let step = (2 * Math.PI) / amount;
    for (let i = 1; i <= amount; i++) {
      let angle = start + i * step;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(
        new Bullet(
          x + width / 2 - size / 2,
          y + height / 2 + size / 2,
          size,
          size,
          'green',
          [vx, vy],
          [0, 0]
        )
      );
    }
  },
};

export const way30 = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 100,
  },
  pattern: (
    x: number,
    y: number,
    width: number,
    height: number,
    size: number,
    _: any,
    bulletArr: Bullet[]
  ) => {
    let speed = 5;
    let amount = 30;
    let start = 0;
    let step = (2 * Math.PI) / amount;
    for (let i = 1; i <= amount; i++) {
      let angle = start + i * step;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(
        new Bullet(
          x + width / 2 - size / 2,
          y + height / 2 + size / 2,
          size,
          size,
          'green',
          [vx, vy],
          [0, 0]
        )
      );
    }
  },
};
