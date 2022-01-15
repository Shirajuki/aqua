import Bullet, {
  BulletSpiral,
  BulletSpiralInward,
  BulletAngle,
  BulletHoming,
} from '../bullet';

export const linear: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 5, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, size, bulletArr }: IBulletPattern) => {
    bulletArr.push(new Bullet(x, y, size, size, 'green', [-8, 0], [0, 0]));
  },
};

export const linearAccel: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 5, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, size, bulletArr }: IBulletPattern) => {
    bulletArr.push(new Bullet(x, y, size, size, 'green', [-5, 0], [-0.15, 0]));
  },
};

export const linearDecel: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 5, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, size, bulletArr }: IBulletPattern) => {
    bulletArr.push(new Bullet(x, y, size, size, 'green', [-8, 0], [0.03, 0]));
  },
};

export const way20TurnRight: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, cooldown, size, bulletArr }: IBulletPattern) => {
    let j = cooldown.burstCur;
    let speed = 5;
    let amount = 20;
    let start = 0;
    let step = (2 * Math.PI) / amount;
    for (let i = 1; i <= amount; i++) {
      let angle = start + (j + i) * step;
      let vx = Math.cos(angle + 2 * j) * speed;
      let vy = Math.sin(angle + 2 * j) * speed;
      bulletArr.push(new Bullet(x, y, size, size, 'green', [vx, vy], [0, 0]));
    }
  },
};

export const way20TurnLeft: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 100,
  },
  pattern: ({ x, y, cooldown, size, bulletArr }: IBulletPattern) => {
    let j = cooldown.burstCur;
    let speed = 5;
    let amount = 20;
    let start = 0;
    let step = (2 * Math.PI) / amount;
    for (let i = 1; i <= amount; i++) {
      let angle = start + (j + i) * step;
      let vx = Math.cos(angle - 2 * j) * speed;
      let vy = Math.sin(angle - 2 * j) * speed;
      bulletArr.push(new Bullet(x, y, size, size, 'green', [vx, vy], [0, 0]));
    }
  },
};

export const way20: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, size, bulletArr }: IBulletPattern) => {
    let speed = 5;
    let amount = 20;
    let start = 0;
    let step = (2 * Math.PI) / amount;
    for (let i = 1; i <= amount; i++) {
      let angle = start + i * step;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(new Bullet(x, y, size, size, 'green', [vx, vy], [0, 0]));
    }
  },
};

export const way30: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, size, bulletArr }: IBulletPattern) => {
    let speed = 5;
    let amount = 30;
    let start = 0;
    let step = (2 * Math.PI) / amount;
    for (let i = 1; i <= amount; i++) {
      let angle = start + i * step;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(new Bullet(x, y, size, size, 'green', [vx, vy], [0, 0]));
    }
  },
};

export const spiralHowl: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 250,
  },
  pattern: ({ x, y, cooldown, size, bulletArr }: IBulletPattern) => {
    let j = cooldown.burstCur;
    const speed = 1;
    let antall = 12;
    let start = 0;
    let step = (2 * Math.PI) / antall;
    for (let i = 1; i <= antall; i++) {
      let angle = start + (j + i) * step;
      let vx = Math.sin(angle + 3 * j) * speed;
      let vy = Math.cos(angle + 3 * j) * speed;
      bulletArr.push(
        new BulletSpiral(x, y, size, size, 'green', [vx, vy], [0, 0])
      );
    }
  },
};

export const spiralHowlInward: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 250,
  },
  pattern: ({ x, y, cooldown, size, bulletArr }: IBulletPattern) => {
    let j = cooldown.burstCur;
    const speed = 1;
    let antall = 12;
    let start = 0;
    let step = (2 * Math.PI) / antall;
    for (let i = 1; i <= antall; i++) {
      let angle = start + (j + i) * step;
      let vx = Math.sin(angle + 3 * j) * speed;
      let vy = Math.cos(angle + 3 * j) * speed;
      bulletArr.push(
        new BulletSpiralInward(x, y, size, size, 'green', [vx, vy], [0, 0])
      );
    }
  },
};

export const spread5: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, size, bulletArr }: IBulletPattern) => {
    let speed = 6;
    let amount = 5 - 2;
    let start = Math.PI; // Start at end
    let spread = Math.PI / 24; // spread angle
    for (let i = 0; i < amount; i++) {
      // Change angle for 3 on top
      let angle = start + i * spread;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(new Bullet(x, y, size, size, 'green', [vx, vy], [0, 0]));
    }
    // Loop the other 2
    for (let i = 1; i <= amount - 1; i++) {
      let angle = start - i * spread;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(new Bullet(x, y, size, size, 'green', [vx, vy], [0, 0]));
    }
  },
};

export const spread8: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, size, bulletArr }: IBulletPattern) => {
    let speed = 6;
    let amount = 8 - 4;
    let spread = Math.PI / 36; // spread angle
    let start = Math.PI + spread / 2; // Start at end
    for (let i = 0; i < amount; i++) {
      // Change angle for 4 on top
      let angle = start + i * spread;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(new Bullet(x, y, size, size, 'green', [vx, vy], [0, 0]));
    }
    // Loop the other half
    for (let i = 1; i <= amount; i++) {
      let angle = start - i * spread;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(
        new Bullet(
          x + size / 2 - size / 2,
          y + size / 2 + size / 2,
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

export const spread5Reverse: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 250,
  },
  pattern: ({ x, y, size, bulletArr }: IBulletPattern) => {
    const speed = 6;
    const amount = 5 - 2;
    const start = Math.PI; // Start at end
    const spread = Math.PI / 24; // spread angle
    for (let i = 0; i < amount; i++) {
      // Change angle for 3 on top
      let angle = start + i * spread;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(
        new BulletAngle(x, y, size, size, 'green', [vx, vy], [0, 0])
      );
    }
    // Loop the other 2
    for (let i = 1; i <= amount - 1; i++) {
      let angle = start - i * spread;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(
        new BulletAngle(
          x + size / 2 - size / 2,
          y + size / 2 + size / 2,
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

export const linearAim: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 5, // Delay between shots
    burstCur: 0,
    burstMax: 12, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, size, bulletArr, player }: IBulletPattern) => {
    const speed = -8;
    // Determine angle using atan
    const angle = Math.atan2(y - player.y, x - player.x);
    const vx = speed * Math.cos(angle);
    const vy = speed * Math.sin(angle);
    bulletArr.push(new Bullet(x, y, size, size, 'green', [vx, vy], [0, 0]));
  },
};

export const linearLockOn: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 5, // Delay between shots
    burstCur: 0,
    burstMax: 12, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, size, bulletArr, target }: IBulletPattern) => {
    const speed = -8;
    // Determine angle using atan
    const angle = Math.atan2(y - target[1], x - target[0]);
    const vx = speed * Math.cos(angle);
    const vy = speed * Math.sin(angle);
    bulletArr.push(new Bullet(x, y, size, size, 'green', [vx, vy], [0, 0]));
  },
};

export const spread5LockOn: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, size, bulletArr, target }: IBulletPattern) => {
    let speed = -6;
    let amount = 5 - 2;
    let start = Math.atan2(y - target[1], x - target[0]); // Start angle at target
    let spread = Math.PI / 24; // spread angle
    for (let i = 0; i < amount; i++) {
      // Change angle for 3 on top
      let angle = start + i * spread;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(new Bullet(x, y, size, size, 'green', [vx, vy], [0, 0]));
    }
    // Loop the other 2
    for (let i = 1; i <= amount - 1; i++) {
      let angle = start - i * spread;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(new Bullet(x, y, size, size, 'green', [vx, vy], [0, 0]));
    }
  },
};

export const spread8LockOn: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 8, // Delay between shots
    burstCur: 0,
    burstMax: 10, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, size, bulletArr, target }: IBulletPattern) => {
    let speed = -6;
    let amount = 8 - 4;
    let spread = Math.PI / 36; // spread angle
    let start = Math.atan2(y - target[1], x - target[0]) + spread / 2; // Start angle at target
    for (let i = 0; i < amount; i++) {
      // Change angle for 4 on top
      let angle = start + i * spread;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(new Bullet(x, y, size, size, 'green', [vx, vy], [0, 0]));
    }
    // Loop the other half
    for (let i = 1; i <= amount; i++) {
      let angle = start - i * spread;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed;
      bulletArr.push(new Bullet(x, y, size, size, 'green', [vx, vy], [0, 0]));
    }
  },
};

export const homingSimple: IBulletType = {
  cooldown: {
    shootingCur: 0,
    shootingMax: 10, // Delay between shots
    burstCur: 0,
    burstMax: 1, // Shoot 10 times then wait for cooldown
    burstTimeCur: 0,
    BurstTimeMax: 150,
  },
  pattern: ({ x, y, size, bulletArr, player }: IBulletPattern) => {
    bulletArr.push(
      new BulletHoming(x, y, size, size, 'green', [-8, 0], [0, 0], player)
    );
  },
};
