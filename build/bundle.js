var app = (function () {
  'use strict';
  function t() {}
  function e(t, e) {
    for (const s in e) t[s] = e[s];
    return t;
  }
  function s(t) {
    return t();
  }
  function i() {
    return Object.create(null);
  }
  function n(t) {
    t.forEach(s);
  }
  function o(t) {
    return 'function' == typeof t;
  }
  function a(t, e) {
    return t != t
      ? e == e
      : t !== e || (t && 'object' == typeof t) || 'function' == typeof t;
  }
  function r(t, e) {
    t.appendChild(e);
  }
  function h(t, e, s) {
    t.insertBefore(e, s || null);
  }
  function l(t) {
    t.parentNode.removeChild(t);
  }
  function p(t) {
    return document.createElement(t);
  }
  function u(t) {
    return document.createElementNS('http://www.w3.org/2000/svg', t);
  }
  function c(t) {
    return document.createTextNode(t);
  }
  function y() {
    return c(' ');
  }
  function d(t, e, s) {
    null == s
      ? t.removeAttribute(e)
      : t.getAttribute(e) !== s && t.setAttribute(e, s);
  }
  function m(t, e) {
    (e = '' + e), t.wholeText !== e && (t.data = e);
  }
  function f(t, e, s, i) {
    t.style.setProperty(e, s, i ? 'important' : '');
  }
  let g;
  function x(t) {
    g = t;
  }
  function w(t) {
    (function () {
      if (!g)
        throw new Error('Function called outside component initialization');
      return g;
    })().$$.on_mount.push(t);
  }
  const v = [],
    b = [],
    T = [],
    S = [],
    A = Promise.resolve();
  let M = !1;
  function $(t) {
    T.push(t);
  }
  let I = !1;
  const C = new Set();
  function L() {
    if (!I) {
      I = !0;
      do {
        for (let t = 0; t < v.length; t += 1) {
          const e = v[t];
          x(e), k(e.$$);
        }
        for (x(null), v.length = 0; b.length; ) b.pop()();
        for (let t = 0; t < T.length; t += 1) {
          const e = T[t];
          C.has(e) || (C.add(e), e());
        }
        T.length = 0;
      } while (v.length);
      for (; S.length; ) S.pop()();
      (M = !1), (I = !1), C.clear();
    }
  }
  function k(t) {
    if (null !== t.fragment) {
      t.update(), n(t.before_update);
      const e = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach($);
    }
  }
  const P = new Set();
  let D;
  function z() {
    D = { r: 0, c: [], p: D };
  }
  function O() {
    D.r || n(D.c), (D = D.p);
  }
  function R(t, e) {
    t && t.i && (P.delete(t), t.i(e));
  }
  function _(t, e, s, i) {
    if (t && t.o) {
      if (P.has(t)) return;
      P.add(t),
        D.c.push(() => {
          P.delete(t), i && (s && t.d(1), i());
        }),
        t.o(e);
    }
  }
  function E(t) {
    t && t.c();
  }
  function B(t, e, i, a) {
    const { fragment: r, on_mount: h, on_destroy: l, after_update: p } = t.$$;
    r && r.m(e, i),
      a ||
        $(() => {
          const e = h.map(s).filter(o);
          l ? l.push(...e) : n(e), (t.$$.on_mount = []);
        }),
      p.forEach($);
  }
  function F(t, e) {
    const s = t.$$;
    null !== s.fragment &&
      (n(s.on_destroy),
      s.fragment && s.fragment.d(e),
      (s.on_destroy = s.fragment = null),
      (s.ctx = []));
  }
  function X(t, e) {
    -1 === t.$$.dirty[0] &&
      (v.push(t), M || ((M = !0), A.then(L)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
  }
  function W(e, s, o, a, r, h, p = [-1]) {
    const u = g;
    x(e);
    const c = (e.$$ = {
      fragment: null,
      ctx: null,
      props: h,
      update: t,
      not_equal: r,
      bound: i(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(u ? u.$$.context : s.context || []),
      callbacks: i(),
      dirty: p,
      skip_bound: !1,
    });
    let y = !1;
    if (
      ((c.ctx = o
        ? o(e, s.props || {}, (t, s, ...i) => {
            const n = i.length ? i[0] : s;
            return (
              c.ctx &&
                r(c.ctx[t], (c.ctx[t] = n)) &&
                (!c.skip_bound && c.bound[t] && c.bound[t](n), y && X(e, t)),
              s
            );
          })
        : []),
      c.update(),
      (y = !0),
      n(c.before_update),
      (c.fragment = !!a && a(c.ctx)),
      s.target)
    ) {
      if (s.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(s.target);
        c.fragment && c.fragment.l(t), t.forEach(l);
      } else c.fragment && c.fragment.c();
      s.intro && R(e.$$.fragment),
        B(e, s.target, s.anchor, s.customElement),
        L();
    }
    x(u);
  }
  class q {
    $destroy() {
      F(this, 1), (this.$destroy = t);
    }
    $on(t, e) {
      const s = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return (
        s.push(e),
        () => {
          const t = s.indexOf(e);
          -1 !== t && s.splice(t, 1);
        }
      );
    }
    $set(t) {
      var e;
      this.$$set &&
        ((e = t), 0 !== Object.keys(e).length) &&
        ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
    }
  }
  const H = [];
  const j = (function (e, s = t) {
    let i;
    const n = [];
    function o(t) {
      if (a(e, t) && ((e = t), i)) {
        const t = !H.length;
        for (let t = 0; t < n.length; t += 1) {
          const s = n[t];
          s[1](), H.push(s, e);
        }
        if (t) {
          for (let t = 0; t < H.length; t += 2) H[t][0](H[t + 1]);
          H.length = 0;
        }
      }
    }
    return {
      set: o,
      update: function (t) {
        o(t(e));
      },
      subscribe: function (a, r = t) {
        const h = [a, r];
        return (
          n.push(h),
          1 === n.length && (i = s(o) || t),
          a(e),
          () => {
            const t = n.indexOf(h);
            -1 !== t && n.splice(t, 1), 0 === n.length && (i(), (i = null));
          }
        );
      },
    };
  })(!1);
  class Y {
    x;
    y;
    width;
    height;
    color;
    constructor(t, e, s, i, n) {
      (this.x = t),
        (this.y = e),
        (this.width = s),
        (this.height = i),
        (this.color = n);
    }
    draw(t) {
      t.beginPath(),
        (t.fillStyle = this.color),
        t.rect(this.x, this.y, this.width, this.height),
        t.fill();
    }
    collision(t) {
      return !(
        this.y + this.height < t.y ||
        this.y > t.y + t.height ||
        this.x + this.width < t.x ||
        this.x > t.x + t.width
      );
    }
    collisionC(t) {
      const e = this.x - t.x,
        s = this.y - t.y;
      return Math.sqrt(e * e + s * s) < this.width / 2 + t.width;
    }
  }
  class G extends Y {
    outOfRange = !1;
    velocity;
    acceleration;
    damage = 1;
    constructor(t, e, s, i, n, o, a, r = 1) {
      super(t, e, s, i, n),
        (this.velocity = o),
        (this.acceleration = a),
        (this.damage = r);
    }
    move(t) {
      (this.x += this.velocity[0] * t),
        (this.y += this.velocity[1] * t),
        (this.velocity[0] += this.acceleration[0] * t),
        (this.velocity[1] += this.acceleration[1] * t),
        !this.outOfRange &&
          (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900) &&
          (this.outOfRange = !0);
    }
    draw(t) {
      t.beginPath(),
        (t.fillStyle = this.color),
        t.rect(this.x, this.y - this.height / 2, this.width, this.height),
        t.fill();
    }
  }
  class N extends G {
    startY = this.y;
    move(t) {
      (this.x += this.velocity[0] * t),
        (this.velocity[1] += 1 * t),
        (this.y = 25 * Math.sin(this.velocity[1] / 10) + this.startY),
        (this.velocity[0] += this.acceleration[0] * t),
        (this.velocity[1] += this.acceleration[1] * t),
        !this.outOfRange &&
          (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900) &&
          (this.outOfRange = !0);
    }
    draw(t) {
      super.draw(t);
    }
  }
  class U extends G {
    player;
    speed = -7;
    homingTimerCur = 0;
    homingTimerMax = 120;
    homingIntervalCur = 0;
    homingIntervalMax = 10;
    oldAngle = 0;
    constructor(t, e, s, i, n, o, a, r) {
      super(t, e, s, i, n, o, a), (this.player = r);
    }
    move(t) {
      (this.x += this.velocity[0] * t),
        (this.y += this.velocity[1] * t),
        (this.velocity[0] += this.acceleration[0] * t),
        (this.velocity[1] += this.acceleration[1] * t),
        !this.outOfRange &&
          (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900) &&
          (this.outOfRange = !0);
    }
    draw(t) {
      if ((super.draw(t), this.homingTimerCur <= this.homingTimerMax)) {
        if (this.homingIntervalCur >= this.homingIntervalMax) {
          const t = Math.atan2(
            this.y - this.player.y - this.height,
            this.x - this.player.x
          );
          if (Math.abs(t - this.oldAngle) > 3 || this.player.dead)
            return (
              (this.homingTimerCur = this.homingTimerMax),
              (this.velocity[0] = Math.cos(t) * this.speed),
              void (this.velocity[1] = Math.sin(t) * this.speed)
            );
          (this.oldAngle = t),
            (this.velocity[0] = Math.cos(t) * this.speed),
            (this.velocity[1] = Math.sin(t) * this.speed),
            (this.homingIntervalCur = 0);
        } else this.homingIntervalCur++;
        this.homingTimerCur++;
      }
    }
  }
  const V = (t, e, s) => (1 - s) * t + s * e;
  class Z extends Y {
    height = this.width;
    movement = { left: !1, up: !1, right: !1, down: !1 };
    shooting = !1;
    spelling = !1;
    focusing = !1;
    velocity = [6, 3];
    bullets = [];
    cooldown = { shootingCur: 0, shootingMax: 5 };
    sprite = new Image();
    animation = {
      curFrame: 0,
      frames: 5,
      frameSpeed: 1,
      frameCurTimer: 0,
      frameDuration: 3,
    };
    leanSpeed = 0.5;
    lean = 0;
    stats = { life: 3, spell: 1, power: 1 };
    dead = !1;
    invulnerable = !1;
    invulnerableTimer = 0;
    constructor(t, e, s, i, n) {
      super(t, e, s, i, n), (this.sprite.src = './images/aqua_sprite2.png');
    }
    collisionSprite(t) {
      return !(
        this.y - 80 + 133 < t.y ||
        this.y - 80 > t.y + t.height ||
        this.x - 60 + 100 < t.x ||
        this.x > t.x + t.width
      );
    }
    move(t) {
      const e = this.velocity[this.focusing ? 1 : 0] * t;
      this.movement.left && this.x - e - 2 * this.width > 0 && (this.x -= e),
        this.movement.up && this.y - e - 2 * this.height > 80 && (this.y -= e),
        this.movement.right &&
          this.x + e < 924 - 2 * this.width &&
          (this.x += e),
        this.movement.down &&
          this.y + e < 520 - 2 * this.height &&
          (this.y += e);
    }
    shoot(t) {
      this.cooldown.shootingCur >= this.cooldown.shootingMax
        ? (this.stats.power >= 4
            ? (this.bullets.push(
                new N(this.x, this.y, 16, 16, 'white', [8, 0], [0, 0], 2)
              ),
              this.bullets.push(
                new N(this.x, this.y, 16, 16, 'white', [8, 15], [0, 0], 2)
              ),
              this.bullets.push(
                new N(this.x, this.y, 16, 16, 'white', [8, 30], [0, 0], 2)
              ))
            : this.stats.power >= 3
            ? (this.bullets.push(
                new N(this.x, this.y, 16, 16, 'white', [8, 0], [0, 0], 2)
              ),
              this.bullets.push(
                new N(this.x, this.y, 16, 16, 'white', [8, 30], [0, 0], 2)
              ))
            : this.stats.power >= 2
            ? (this.bullets.push(
                new G(this.x, this.y - 10, 16, 16, 'white', [8, 0], [0, 0])
              ),
              this.bullets.push(
                new G(this.x, this.y + 10, 16, 16, 'white', [8, 0], [0, 0])
              ))
            : this.stats.power >= 1 &&
              this.bullets.push(
                new G(this.x, this.y, 16, 16, 'blue', [8, 0], [0, 0])
              ),
          (this.cooldown.shootingCur = 0))
        : (this.cooldown.shootingCur += 1 * t);
    }
    spell(t) {
      this.cooldown.shootingCur >= this.cooldown.shootingMax
        ? (this.bullets.push(
            new G(this.x, this.y, 16, 16, 'red', [8, 0], [0, 0])
          ),
          (this.cooldown.shootingCur = 0))
        : (this.cooldown.shootingCur += 1 * t);
    }
    draw(t) {
      this.movement.right && this.lean > -4
        ? (this.lean = V(this.lean, this.lean - this.leanSpeed, 0.5))
        : this.movement.left && this.lean < 3
        ? (this.lean = V(this.lean, this.lean + this.leanSpeed, 0.5))
        : this.lean > 0
        ? (this.lean = V(this.lean, this.lean - this.leanSpeed, 0.5))
        : this.lean < 0 &&
          (this.lean = V(this.lean, this.lean + this.leanSpeed, 0.5)),
        t.save(),
        t.translate(this.x - 60 + 50, this.y - 80 + 66.5),
        t.rotate((this.lean * Math.PI) / 180),
        this.sprite.complete &&
          t.drawImage(
            this.sprite,
            this.invulnerable && this.invulnerableTimer > 3 ? 410 : 0,
            524 * this.animation.curFrame,
            408,
            524,
            -50,
            -66.5,
            100,
            133
          ),
        this.invulnerableTimer > 6
          ? (this.invulnerableTimer = 0)
          : this.invulnerableTimer++,
        t.restore(),
        t.beginPath(),
        (t.fillStyle = this.color),
        t.arc(this.x, this.y, this.width, 0, 2 * Math.PI),
        t.fill();
    }
    animate() {
      this.animation.frameCurTimer >= this.animation.frameDuration
        ? ((this.animation.frameCurTimer = 0), this.animation.curFrame++)
        : (this.animation.frameCurTimer += this.animation.frameSpeed),
        this.animation.curFrame === this.animation.frames &&
          (this.animation.curFrame = 0);
    }
    logic(t, e) {
      this.spelling && this.spell(e),
        this.shooting && this.shoot(e),
        this.move(e),
        this.animate(),
        this.draw(t);
    }
    hit() {
      (this.color = 'white'),
        (this.invulnerable = !0),
        setTimeout(() => {
          (this.color = 'aqua'), (this.invulnerable = !1);
        }, 2500),
        this.stats.life--,
        console.log(1);
    }
  }
  class J extends Y {
    outOfRange = !1;
    bullets;
    player;
    hp = 0;
    type = 0;
    dead = !1;
    shooting = !1;
    target;
    pattern;
    cooldown = {
      shootingCur: 0,
      shootingMax: 8,
      burstCur: 0,
      burstMax: 10,
      burstTimeCur: 0,
      BurstTimeMax: 100,
    };
    bulletType;
    speed = 0;
    arrived = !1;
    behaviourLogic;
    oldX = 0;
    oldY = 0;
    reverse = !1;
    sprite = new Image();
    animation = {
      curFrame: 0,
      frames: 5,
      frameSpeed: 1,
      frameCurTimer: 0,
      frameDuration: 5,
    };
    constructor(t, e, s, i, n, o, a, r, h, l, p = !1) {
      super(t, e, s, i, n),
        (this.bullets = o),
        (this.player = a),
        (this.sprite.src = './images/neko_sprite.png'),
        (this.behaviourLogic = h),
        (this.bulletType = r),
        this.updateBulletType(),
        (this.hp = l),
        (this.oldX = this.x),
        (this.oldY = this.y),
        (this.reverse = p);
    }
    updateBulletType() {
      const { cooldown: t, pattern: e } =
        this.bulletType ||
        this.behaviourLogic?.bulletTypes[
          this.behaviourLogic?.behaviour[this.behaviourLogic?.state]?.bulletType
        ];
      (this.cooldown = t),
        (this.pattern = e),
        (this.target = [this.player.x, this.player.y]),
        this.behaviourLogic?.behaviour[this.behaviourLogic?.state]
          ?.shootAfterPathing ||
          (this.cooldown.burstTimeCur = this.cooldown.BurstTimeMax);
    }
    logic(t, e) {
      const s = this.behaviourLogic?.behaviour[this.behaviourLogic?.state];
      if (s) {
        const t = s.path.x || 0,
          i = s.path.y || 0;
        (this.x = s.easing.x(
          Math.min(this.behaviourLogic.stateDurationCur, s.duration),
          this.oldX,
          t,
          s.duration
        )),
          (this.y = s.easing.y(
            Math.min(this.behaviourLogic.stateDurationCur, s.duration),
            this.oldY,
            i,
            s.duration
          )),
          this.behaviourLogic.stateDurationCur < s.duration &&
            (this.behaviourLogic.stateDurationCur += 0.01 * e),
          !s.shootAfterPathing &&
            this.behaviourLogic.stateDurationCur >= s.shootAfter &&
            this.shootingLogic(e),
          this.behaviourLogic.stateDurationCur > s.duration &&
            (this.arrived ||
              ((this.arrived = !0),
              (this.speed = 0),
              (this.cooldown.burstTimeCur = this.cooldown.BurstTimeMax)),
            s.shootAfterPathing
              ? this.behaviourLogic.stateDurationCur - s.duration >=
                s.shootAfter
                ? this.shootingLogic(e)
                : (this.behaviourLogic.stateDurationCur += 0.01 * e)
              : this.updateState());
      } else this.shootingLogic(e);
      this.animate(), this.draw(t);
    }
    animate() {
      this.animation.frameCurTimer >= this.animation.frameDuration
        ? ((this.animation.frameCurTimer = 0), this.animation.curFrame++)
        : (this.animation.frameCurTimer += this.animation.frameSpeed),
        this.animation.curFrame === this.animation.frames &&
          (this.animation.curFrame = 0);
    }
    draw(t) {
      t.beginPath(),
        (t.fillStyle = this.color),
        t.rect(this.x, this.y, this.width, this.height),
        t.fill(),
        this.sprite.complete &&
          t.drawImage(
            this.sprite,
            0,
            245 * this.animation.curFrame,
            430,
            245,
            this.x,
            this.y,
            this.width,
            this.height
          ),
        !this.outOfRange &&
          (this.x < -200 || this.x > 1200 || this.y < -200 || this.y > 600) &&
          (this.outOfRange = !0);
    }
    hit(t) {
      (this.hp -= t || 1), this.hp <= 0 && (this.dead = !0);
    }
    shootingLogic(t) {
      this.shooting
        ? this.shoot(t)
        : this.cooldown.burstTimeCur >= this.cooldown.BurstTimeMax
        ? ((this.cooldown.burstTimeCur = 0),
          (this.shooting = !0),
          (this.target = [this.player.x, this.player.y]))
        : (this.cooldown.burstTimeCur += 1 * t);
    }
    shoot(t) {
      if (this.cooldown.shootingCur >= this.cooldown.shootingMax) {
        if (
          (this.pattern({
            x: this.reverse ? this.x + this.width : this.x,
            y: this.y + this.height / 2 + 4,
            size: 8,
            cooldown: this.cooldown,
            bulletArr: this.bullets,
            player: this.player,
            target: this.target,
          }),
          (this.cooldown.shootingCur = 0),
          (this.cooldown.burstCur += 1 * t),
          this.cooldown.burstCur >= this.cooldown.burstMax * t)
        ) {
          (this.cooldown.burstCur = 0), (this.shooting = !1);
          const t = this.behaviourLogic?.behaviour[this.behaviourLogic?.state];
          t && t.shootAfterPathing && this.updateState();
        }
      } else this.cooldown.shootingCur += 1 * t;
    }
    updateState() {
      (this.behaviourLogic.state =
        (this.behaviourLogic.state + 1) % this.behaviourLogic.behaviour.length),
        (this.behaviourLogic.stateDurationCur = 0),
        (this.arrived = !1),
        this.updateBulletType(),
        (this.oldX = this.x),
        (this.oldY = this.y);
    }
  }
  const K = (t, e, s, i) => (s * t) / i + e,
    Q = (t, e, s, i) => -s * (t /= i) * (t - 2) + e,
    tt = (t, e, s, i) => (-s / 2) * (Math.cos((Math.PI * t) / i) - 1) + e;
  class et extends J {
    type = 1;
    maxHp = this.hp;
    hpPercent = 380;
    initialized = !1;
    initializeTimer = { cur: 0, max: 20, startX: this.x };
    logic(t, e) {
      this.initialized
        ? (super.logic(t, e), this.drawBossHp(t))
        : this.initializeTimer.cur >= this.initializeTimer.max
        ? ((this.initializeTimer.cur = 0), (this.initialized = !0))
        : this.initialized ||
          ((this.x = Q(
            Math.min(this.initializeTimer.cur, this.initializeTimer.max),
            this.initializeTimer.startX,
            -360,
            this.initializeTimer.max
          )),
          (this.initializeTimer.cur += 0.1 * e),
          super.draw(t));
    }
    drawBossHp(t) {
      t.beginPath(),
        (t.fillStyle = this.color),
        t.rect(530, 470, 380, 40),
        t.fill(),
        (this.hpPercent = V(this.hpPercent, (380 * this.hp) / this.maxHp, 0.1)),
        t.beginPath(),
        (t.fillStyle = 'rgba(200,0,0,0.7)'),
        t.rect(530, 470, this.hpPercent, 40),
        t.fill(),
        this.sprite.complete &&
          t.drawImage(this.sprite, 0, 0, 430, 245, 500, 455, 103, 58);
    }
    hit(t) {
      this.initialized && super.hit(t);
    }
  }
  const st = {
      cooldown: {
        shootingCur: 0,
        shootingMax: 5,
        burstCur: 0,
        burstMax: 12,
        burstTimeCur: 0,
        BurstTimeMax: 150,
      },
      pattern: ({ x: t, y: e, size: s, bulletArr: i, target: n }) => {
        const o = Math.atan2(e - n[1], t - n[0]),
          a = -8 * Math.cos(o),
          r = -8 * Math.sin(o);
        i.push(new G(t, e, s, s, 'green', [a, r], [0, 0]));
      },
    },
    it = {
      cooldown: {
        shootingCur: 0,
        shootingMax: 8,
        burstCur: 0,
        burstMax: 10,
        burstTimeCur: 0,
        BurstTimeMax: 150,
      },
      pattern: ({ x: t, y: e, size: s, bulletArr: i, target: n }) => {
        let o = Math.atan2(e - n[1], t - n[0]),
          a = Math.PI / 24;
        for (let n = 0; n < 3; n++) {
          let r = o + n * a,
            h = -6 * Math.cos(r),
            l = -6 * Math.sin(r);
          i.push(new G(t, e, s, s, 'green', [h, l], [0, 0]));
        }
        for (let n = 1; n <= 2; n++) {
          let r = o - n * a,
            h = -6 * Math.cos(r),
            l = -6 * Math.sin(r);
          i.push(new G(t, e, s, s, 'green', [h, l], [0, 0]));
        }
      },
    },
    nt = {
      cooldown: {
        shootingCur: 0,
        shootingMax: 10,
        burstCur: 0,
        burstMax: 1,
        burstTimeCur: 0,
        BurstTimeMax: 150,
      },
      pattern: ({ x: t, y: e, size: s, bulletArr: i, player: n }) => {
        i.push(new U(t, e, s, s, 'green', [-8, 0], [0, 0], n));
      },
    },
    ot = (t) => {
      if ('#' === t[0]) {
        return `${parseInt(t.substring(1, 3), 16)}, ${parseInt(
          t.substring(3, 5),
          16
        )}, ${parseInt(t.substring(5, 7), 16)}`;
      }
      return t;
    };
  class at extends G {
    lifeTime = 0;
    friction = 0;
    constructor(t, e, s, i, n, o, a, r) {
      super(t, e, s, i, n, o, a),
        (this.lifeTime = r),
        (this.friction = 0.96),
        (this.color = n);
    }
    move() {
      (this.velocity[0] *= this.friction),
        (this.x +=
          Math.cos(this.velocity[1]) * this.velocity[0] + this.acceleration[0]),
        (this.y +=
          Math.sin(this.velocity[1]) * this.velocity[0] + this.acceleration[1]),
        !this.outOfRange &&
          (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900) &&
          (this.outOfRange = !0);
    }
    draw(t) {
      0 !== this.lifeTime && (this.lifeTime -= 0.01),
        (this.width = V(this.width, 0, 0.005)),
        t.beginPath(),
        (t.fillStyle = `rgba(${ot(this.color)},${this.lifeTime})`),
        t.arc(this.x, this.y, this.width, 0, 2 * Math.PI),
        t.fill();
    }
  }
  class rt extends at {
    draw(t) {
      0 !== this.lifeTime && (this.lifeTime -= 0.01),
        (this.width = V(this.width, 0, 0.01)),
        t.beginPath(),
        (t.fillStyle = `rgba(${ot(this.color)},${this.lifeTime})`),
        t.arc(this.x, this.y, this.width, 0, 2 * Math.PI),
        t.fill();
    }
  }
  class ht extends at {
    lineWidth = 6;
    constructor(t, e, s, i, n, o, a, r) {
      super(t, e, s, i, n, o, a, r);
    }
    move() {
      (this.velocity[0] *= this.friction),
        (this.x +=
          Math.cos(this.velocity[1]) * this.velocity[0] + this.acceleration[0]),
        (this.y +=
          Math.sin(this.velocity[1]) * this.velocity[0] + this.acceleration[1]),
        !this.outOfRange &&
          (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900) &&
          (this.outOfRange = !0);
    }
    draw(t) {
      this.lineWidth > 0 &&
        ((this.lineWidth -= 0.1), this.lineWidth <= 0 && (this.lifeTime = 0)),
        0 !== this.lifeTime && (this.lifeTime -= 0.005),
        (this.width = V(this.width, 900, 0.01)),
        t.beginPath(),
        (t.strokeStyle = `rgba(${ot(this.color)},${this.lifeTime})`),
        (t.lineWidth = this.lineWidth),
        t.arc(this.x, this.y, this.width, 0, 2 * Math.PI),
        t.stroke();
    }
  }
  const lt = ({ x: t, y: e, size: s, amount: i, particleArr: n, speed: o }) => {
      for (let a = 1; a <= i; a++) {
        const i = Math.random() * (o || 7);
        let a = Math.random() * Math.PI * 2;
        n.push(
          new at(t, e, Math.random() * s + 5, s, '#ffffff', [i, a], [0.5, 0], 1)
        );
      }
    },
    pt = ({ x: t, y: e, size: s, amount: i, particleArr: n }) => {
      for (let s = 1; s <= i; s++) {
        const s = 3 * Math.random();
        let i = Math.random() * Math.PI * 2;
        n.push(
          new at(t, e, 15 * Math.random(), 15, '#ffffff', [s, i], [0.5, 0], 0.5)
        );
      }
      n.push(new ht(t, e, s, s, '#ffffff', [0, 0], [0.5, 0], 0.4));
    };
  class ut extends at {
    color = 'lime';
    type = 0;
    constructor(t, e, s, i, n, o, a, r, h) {
      super(t, e, s, i, n, o, a, r),
        (this.type = h),
        2 === this.type && (this.color = 'teal');
    }
    move() {
      (this.velocity[0] *= this.friction),
        (this.x +=
          Math.cos(this.velocity[1]) * this.velocity[0] + this.acceleration[0]),
        (this.y +=
          Math.sin(this.velocity[1]) * this.velocity[0] + this.acceleration[1]),
        !this.outOfRange &&
          (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900) &&
          (this.outOfRange = !0);
    }
    draw(t) {
      t.beginPath(),
        (t.fillStyle = this.color),
        t.rect(this.x, this.y, this.width, this.height),
        t.fill();
    }
  }
  class ct extends ut {
    player;
    constructor(t, e, s, i, n, o, a, r, h, l) {
      super(t, e, s, i, n, [0, 0], [o, a], r, h),
        (this.player = l),
        (this.color = 'lightgreen');
    }
    move() {
      const t = Math.atan2(this.y - this.player.y, this.x - this.player.x);
      (this.velocity[0] = Math.cos(t) * this.acceleration[0]),
        (this.velocity[1] = Math.sin(t) * this.acceleration[0]),
        (this.x += this.velocity[0]),
        (this.y += this.velocity[1]),
        (this.acceleration[0] += this.acceleration[1]),
        !this.outOfRange &&
          (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900) &&
          (this.outOfRange = !0);
    }
  }
  const yt = ({ x: t, y: e, size: s, amount: i, itemArr: n }) => {
      for (let o = 0; o < i; o++) {
        const i = 60 * Math.random() - 30,
          a = 40 * Math.random() - 20;
        n.push(
          new ut(
            t + i,
            e + a + 20 * o - 10,
            s,
            s,
            '#ffffff',
            [15, 0],
            [-5, 0],
            1,
            0
          )
        );
      }
    },
    dt = ({ x: t, y: e, size: s, amount: i, itemArr: n, player: o }) => {
      for (let a = 0; a < i; a++) {
        const i = 60 * Math.random() - 30,
          r = 40 * Math.random() - 20;
        n.push(
          new ct(t + i, e + r + 20 * a - 10, s, s, '#ffffff', -5, -0.1, 1, 1, o)
        );
      }
    },
    mt = ({ x: t, y: e, size: s, amount: i, itemArr: n }) => {
      for (let o = 0; o < i; o++) {
        const i = 60 * Math.random() - 30,
          a = 40 * Math.random() - 20;
        n.push(
          new ut(
            t + i,
            e + a + 20 * o - 10,
            s,
            s,
            '#ffffff',
            [15, 0],
            [-5, 0],
            1,
            2
          )
        );
      }
    },
    ft = () => ({
      state: 0,
      stateDurationCur: 0,
      bulletTypes: [st],
      behaviour: [
        {
          duration: 3,
          path: { x: -300 },
          bulletType: 0,
          shootAfter: 1,
          shootAfterPathing: !1,
          easing: { x: K, y: K },
        },
        {
          duration: 3,
          path: { x: -300 },
          bulletType: 0,
          shootAfter: 1,
          shootAfterPathing: !1,
          easing: { x: K, y: K },
        },
        {
          duration: 3,
          path: { x: -300 },
          bulletType: 0,
          shootAfter: 1,
          shootAfterPathing: !1,
          easing: { x: K, y: K },
        },
      ],
    }),
    gt = () => ({
      state: 0,
      stateDurationCur: 0,
      bulletTypes: [st, it],
      behaviour: [
        {
          duration: 1.4,
          path: { x: -300, y: 50 },
          bulletType: 1,
          shootAfter: 0,
          shootAfterPathing: !0,
          easing: { x: Q, y: Q },
        },
        {
          duration: 1.4,
          path: { x: 300, y: 50 },
          bulletType: 0,
          shootAfter: 4,
          shootAfterPathing: !1,
          easing: { x: Q, y: Q },
        },
        {
          duration: 1,
          path: { x: 900 },
          bulletType: 0,
          shootAfter: 4,
          shootAfterPathing: !1,
          easing: { x: Q, y: Q },
        },
      ],
    }),
    xt = () => ({
      state: 0,
      stateDurationCur: 0,
      bulletTypes: [st],
      behaviour: [
        {
          duration: 5,
          path: { x: 500 },
          bulletType: 0,
          shootAfter: 4,
          shootAfterPathing: !1,
          easing: { x: K, y: K },
        },
        {
          duration: 5,
          path: { x: 500 },
          bulletType: 0,
          shootAfter: 6,
          shootAfterPathing: !1,
          easing: { x: K, y: K },
        },
        {
          duration: 3,
          path: { x: 300 },
          bulletType: 0,
          shootAfter: 1,
          shootAfterPathing: !1,
          easing: { x: K, y: K },
        },
      ],
    }),
    wt = () => ({
      state: 0,
      stateDurationCur: 0,
      bulletTypes: [st],
      behaviour: [
        {
          duration: 1,
          path: { x: -150, y: 70 },
          bulletType: 0,
          shootAfter: 4,
          shootAfterPathing: !1,
          easing: { x: K, y: tt },
        },
        {
          duration: 1,
          path: { x: -150, y: -70 },
          bulletType: 0,
          shootAfter: 4,
          shootAfterPathing: !1,
          easing: { x: K, y: tt },
        },
        {
          duration: 1,
          path: { x: -150, y: 70 },
          bulletType: 0,
          shootAfter: 0,
          shootAfterPathing: !1,
          easing: { x: K, y: tt },
        },
        {
          duration: 1,
          path: { x: -150, y: -70 },
          bulletType: 0,
          shootAfter: 4,
          shootAfterPathing: !1,
          easing: { x: K, y: tt },
        },
      ],
    }),
    vt = () => ({
      state: 0,
      stateDurationCur: 0,
      bulletTypes: [st],
      behaviour: [
        {
          duration: 6,
          path: { x: -1e3, y: 600 },
          bulletType: 0,
          shootAfter: 1,
          shootAfterPathing: !1,
          easing: { x: K, y: tt },
        },
      ],
    }),
    bt = () => ({
      state: 0,
      stateDurationCur: 0,
      bulletTypes: [st],
      behaviour: [
        {
          duration: 8,
          path: { x: -1500, y: -500 },
          bulletType: 0,
          shootAfter: 1,
          shootAfterPathing: !1,
          easing: { x: K, y: tt },
        },
      ],
    }),
    Tt = () => ({
      state: 0,
      stateDurationCur: 0,
      bulletTypes: [st],
      behaviour: [
        {
          duration: 1.4,
          path: { x: -250 },
          bulletType: 0,
          shootAfter: 0.5,
          shootAfterPathing: !0,
          easing: { x: Q, y: Q },
        },
        {
          duration: 2,
          path: { x: 250 },
          bulletType: 0,
          shootAfter: 4,
          shootAfterPathing: !1,
          easing: { x: Q, y: Q },
        },
        {
          duration: 1,
          path: { x: 900 },
          bulletType: 0,
          shootAfter: 4,
          shootAfterPathing: !1,
          easing: { x: Q, y: Q },
        },
      ],
    }),
    St = () => ({
      state: 0,
      stateDurationCur: 0,
      bulletTypes: [st],
      behaviour: [
        {
          duration: 1,
          path: { x: -600 },
          bulletType: 0,
          shootAfter: 2,
          shootAfterPathing: !1,
          easing: { x: K, y: K },
        },
        {
          duration: 1,
          path: { x: -600 },
          bulletType: 0,
          shootAfter: 2,
          shootAfterPathing: !1,
          easing: { x: K, y: K },
        },
      ],
    }),
    At = () => ({
      enemies: [
        {
          x: 950,
          y: 250,
          width: 120,
          height: 70,
          color: 'rgba(0,0,0,0.5)',
          behaviour: ft,
          hp: 8,
        },
      ],
      spawner: [
        { enemyIndex: 0, timeToSpawn: 2e3, pos: { y: 250 } },
        { enemyIndex: 0, timeToSpawn: 0, pos: { y: 150 } },
        { enemyIndex: 0, timeToSpawn: 2e3, pos: { y: 300 } },
        { enemyIndex: 0, timeToSpawn: 2e3, pos: { y: 350 } },
        { enemyIndex: 0, timeToSpawn: 0, pos: { y: 70 } },
        { enemyIndex: 0, timeToSpawn: 2e3, pos: { y: 250 } },
      ],
      waveDuration: 11e3,
    }),
    Mt = () => ({
      enemies: [
        {
          x: 950,
          y: 250,
          width: 120,
          height: 70,
          color: 'rgba(0,0,0,0.5)',
          behaviour: gt,
          hp: 8,
        },
      ],
      spawner: [
        { enemyIndex: 0, timeToSpawn: 2e3, pos: { y: 250 } },
        { enemyIndex: 0, timeToSpawn: 2e3, pos: { y: 150 } },
        { enemyIndex: 0, timeToSpawn: 2e3, pos: { y: 300 } },
        { enemyIndex: 0, timeToSpawn: 2e3, pos: { y: 70 } },
        { enemyIndex: 0, timeToSpawn: 2e3, pos: { y: 350 } },
        { enemyIndex: 0, timeToSpawn: 2e3, pos: { y: 100 } },
      ],
      waveDuration: 14e3,
    }),
    $t = () => ({
      enemies: [
        {
          x: 950,
          y: 250,
          width: 120,
          height: 70,
          color: 'rgba(0,0,0,0.5)',
          behaviour: bt,
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
      waveDuration: 17e3,
    });
  var It = [
    [
      {
        enemies: [
          {
            x: 950,
            y: 250,
            width: 120,
            height: 70,
            color: 'rgba(0,0,0,0.5)',
            behaviour: ft,
            hp: 8,
          },
        ],
        spawner: [
          { enemyIndex: 0, timeToSpawn: 1300, pos: { y: 225 } },
          { enemyIndex: 0, timeToSpawn: 0, pos: { y: 100 } },
          { enemyIndex: 0, timeToSpawn: 0, pos: { y: 350 } },
        ],
        waveDuration: 16e3,
      },
      $t(),
      At(),
      Mt(),
      {
        enemies: [
          {
            x: 950,
            y: 250,
            width: 120,
            height: 70,
            color: 'rgba(0,0,0,0.5)',
            behaviour: St,
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
        waveDuration: 16e3,
      },
      {
        enemies: [
          {
            x: -150,
            y: 250,
            width: 120,
            height: 70,
            color: 'rgba(0,0,0,0.5)',
            behaviour: xt,
            hp: 8,
            reverse: !0,
          },
        ],
        spawner: [
          { enemyIndex: 0, timeToSpawn: 2e3, pos: { y: 400 } },
          { enemyIndex: 0, timeToSpawn: 2100, pos: { y: 100 } },
          { enemyIndex: 0, timeToSpawn: 2e3, pos: { y: 200 } },
          { enemyIndex: 0, timeToSpawn: 2200, pos: { y: 70 } },
          { enemyIndex: 0, timeToSpawn: 2500, pos: { y: 350 } },
        ],
        waveDuration: 22e3,
      },
      {
        enemies: [
          {
            x: 950,
            y: 250,
            width: 120,
            height: 70,
            color: 'rgba(0,0,0,0.5)',
            behaviour: Tt,
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
        waveDuration: 16e3,
      },
      $t(),
      Mt(),
      At(),
      {
        enemies: [
          {
            x: 950,
            y: 250,
            width: 120,
            height: 70,
            color: 'rgba(0,0,0,0.5)',
            behaviour: wt,
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
        waveDuration: 13e3,
      },
      {
        enemies: [
          {
            x: 950,
            y: 250,
            width: 120,
            height: 70,
            color: 'rgba(0,0,0,0.5)',
            behaviour: vt,
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
        waveDuration: 13e3,
      },
      {
        enemies: [
          {
            x: 950,
            y: 200,
            width: 400,
            height: 227,
            color: 'rgba(0,0,0,0.2)',
            behaviour: void 0,
            bulletType: nt,
            hp: 100,
          },
        ],
        spawner: [{ enemyIndex: 0, timeToSpawn: 0, pos: {} }],
        boss: !0,
      },
    ],
  ];
  class Ct {
    state;
    player;
    bullets;
    enemies;
    particles;
    items;
    wave = -1;
    stage = 0;
    spawnTimer = 0;
    spawnCount = 0;
    enemyWavePattern;
    score = 0;
    showWarning = !1;
    isBossStage = !1;
    dt = 1;
    constructor() {
      (this.state = 0),
        (this.player = new Z(100, 100, 8, 8, 'aqua')),
        (this.bullets = []),
        (this.particles = []),
        (this.items = []),
        new et(
          600,
          200,
          400,
          227,
          'rgba(0,0,0,0.2)',
          this.bullets,
          this.player,
          nt,
          void 0,
          100
        ),
        (this.enemies = []),
        (this.enemyWavePattern = It[this.stage]),
        0 === this.enemies.length && setTimeout(() => this.addEnemy(), 2e3);
    }
    draw(t) {
      for (let e = this.bullets.length - 1; e >= 0; e--) {
        const s = this.bullets[e];
        s.move(this.dt),
          s.draw(t),
          s.outOfRange
            ? this.bullets.splice(e, 1)
            : s.collisionC(this.player) &&
              (this.player.invulnerable ||
                (this.bullets.splice(e, 1), this.player.hit()));
      }
      for (let e = this.player.bullets.length - 1; e >= 0; e--) {
        const s = this.player.bullets[e];
        s.move(this.dt),
          s.draw(t),
          s.outOfRange && this.player.bullets.splice(e, 1);
      }
      for (let e = this.particles.length - 1; e >= 0; e--) {
        const s = this.particles[e];
        s.move(),
          s.draw(t),
          (s.outOfRange || s.lifeTime <= 0) && this.particles.splice(e, 1);
      }
      for (let e = this.items.length - 1; e >= 0; e--) {
        const s = this.items[e];
        s.move(),
          s.draw(t),
          s.outOfRange && this.items.splice(e, 1),
          this.player.collisionSprite(s) &&
            (this.items.splice(e, 1),
            0 === s.type
              ? (console.log('get item: point'), (this.score += 150))
              : 1 === s.type
              ? (console.log('get item: smallpoint'), (this.score += 50))
              : 2 === s.type
              ? (console.log('get item: powerup'),
                (this.player.stats.power += 0.125))
              : 3 === s.type && console.log('get item: life'));
      }
      for (let e = this.enemies.length - 1; e >= 0; e--) {
        const s = this.enemies[e];
        if ((s.logic(t, this.dt), s.dead))
          (this.score += 100),
            lt({
              x: s.x + s.width / 2,
              y: s.y + s.height / 2,
              size: 10,
              amount: Math.max(s.width / 4, 30),
              particleArr: this.particles,
              speed: Math.min(s.width / 40, 7),
            }),
            1 === s.type &&
              ((this.score += 2900),
              (this.isBossStage = !1),
              setTimeout(() => this.addEnemy(), 0),
              console.log('add spawn life here'),
              pt({
                x: s.x + s.width / 2,
                y: s.y + s.height / 2,
                size: 30,
                amount: 30,
                particleArr: this.particles,
              }),
              dt({
                x: s.x + s.width / 2,
                y: s.y - 100,
                size: 20,
                amount: 20,
                itemArr: this.items,
                player: this.player,
              })),
            0 === Math.floor(8 * Math.random())
              ? mt({
                  x: s.x + s.width / 2,
                  y: s.y + s.height / 2,
                  size: 40,
                  amount: 1,
                  itemArr: this.items,
                })
              : yt({
                  x: s.x + s.width / 2,
                  y: s.y + s.height / 2,
                  size: 40,
                  amount: 2,
                  itemArr: this.items,
                }),
            this.enemies.splice(e, 1);
        else if (s.outOfRange) this.enemies.splice(e, 1);
        else {
          s.collision(this.player) &&
            !this.player.invulnerable &&
            this.player.hit();
          for (let t = this.player.bullets.length - 1; t >= 0; t--) {
            const e = this.player.bullets[t];
            s.collision(e) &&
              (this.player.bullets.splice(t, 1), s.hit(e.damage));
          }
        }
      }
      this.player.logic(t, this.dt),
        (({ x: t, y: e, size: s, amount: i, particleArr: n }) => {
          for (let o = 1; o <= i; o++) {
            const i = 5 * Math.random();
            n.push(
              new rt(
                t,
                e,
                Math.random() * s + 8,
                s,
                '#ffffff',
                [i, 0],
                [-1, 1],
                0.4
              )
            );
          }
        })({
          x: this.player.x - 30,
          y: this.player.y + 20,
          size: 4,
          amount: 1,
          particleArr: this.particles,
        });
    }
    addEnemy() {
      this.wave++;
      let t = 0;
      const e = this.enemyWavePattern[this.wave],
        s = e?.boss ?? !1;
      if (!e)
        return (
          (this.wave = -1),
          this.stage++,
          It[this.stage] || this.stage--,
          (this.enemyWavePattern = It[this.stage]),
          void setTimeout(() => this.addEnemy(), 5e3)
        );
      if (s) this.addBoss(e);
      else {
        for (let s = 0; s < e.spawner.length; s++) {
          const i = e.spawner[s].pos,
            n = e.spawner[s].enemyIndex,
            o = e.spawner[s].timeToSpawn,
            a = e.enemies[n],
            r = new J(
              i.x || a.x,
              i.y || a.y,
              a.width,
              a.height,
              a.color,
              this.bullets,
              this.player,
              a.bulletType,
              a.behaviour ? a.behaviour() : void 0,
              a.hp,
              a.reverse || !1
            );
          setTimeout(() => {
            this.enemies.push(r);
          }, t),
            (t += o);
        }
        setTimeout(() => this.addEnemy(), e.waveDuration);
      }
    }
    addBoss(t) {
      (this.showWarning = !0),
        (this.isBossStage = !0),
        setTimeout(() => {
          this.showWarning = !1;
          const e = t.spawner[0].pos,
            s = t.spawner[0].enemyIndex,
            i = t.enemies[s],
            n = new et(
              e.x || i.x,
              e.y || i.y,
              i.width,
              i.height,
              i.color,
              this.bullets,
              this.player,
              i.bulletType,
              i.behaviour ? i.behaviour() : void 0,
              i.hp
            );
          this.enemies.push(n);
        }, 6100);
    }
  }
  function Lt(e) {
    let s, i, n, o, a, p, c;
    return {
      c() {
        (s = u('svg')),
          (i = u('path')),
          (n = u('path')),
          (o = u('defs')),
          (a = u('linearGradient')),
          (p = u('stop')),
          (c = u('stop')),
          d(
            i,
            'd',
            'M3.43662 260.03L0 314.571L183 315L171.401 287.944L173.979 228.25L162.38 200.335L164.958 168.985L143.908 148.801L135.317 120.457V59.9035L128.014 38.4307L114.697 32.4183L95.3662 11.8045L90.6408 -5.37376L65.2958 -16.9691L60.5704 -32H52.838L46.3944 -26.4171L23.1972 27.2649L19.7606 57.3267L31.3592 86.1003V115.733L19.7606 141.929L17.1831 232.545L3.43662 260.03Z'
          ),
          d(i, 'fill', e[5]),
          d(
            n,
            'd',
            'M3.43662 364.97L0 310.429L183 310L171.401 337.056L173.979 396.75L162.38 424.665L164.958 456.015L143.908 476.199L135.317 504.543V565.097L128.014 586.569L114.697 592.582L95.3662 613.196L90.6408 630.374L65.2958 641.969L60.5704 657H52.838L46.3944 651.417L23.1972 597.735L19.7606 567.673L31.3592 538.9V509.267L19.7606 483.071L17.1831 392.455L3.43662 364.97Z'
          ),
          d(n, 'fill', 'url(#paint0_linear)'),
          d(p, 'stop-color', '#8EA0C0'),
          d(p, 'stop-opacity', '0'),
          d(c, 'offset', '1'),
          d(c, 'stop-color', e[6]),
          d(a, 'id', 'paint0_linear'),
          d(a, 'x1', '91'),
          d(a, 'y1', '512'),
          d(a, 'x2', '91.5'),
          d(a, 'y2', '310'),
          d(a, 'gradientUnits', 'userSpaceOnUse'),
          d(s, 'class', 'rock svelte-um0m3u'),
          f(
            s,
            'transform',
            'translate(' +
              (e[1] + e[0].x) +
              'px, ' +
              (e[2] + 1.17 * e[0].y - 50 * e[4]) +
              'px)'
          ),
          f(s, 'width', e[3] + 'px'),
          d(s, 'width', '183'),
          d(s, 'height', '657'),
          d(s, 'viewBox', '0 0 183 657'),
          d(s, 'fill', 'none'),
          d(s, 'xmlns', 'http://www.w3.org/2000/svg');
      },
      m(t, e) {
        h(t, s, e), r(s, i), r(s, n), r(s, o), r(o, a), r(a, p), r(a, c);
      },
      p(t, [e]) {
        32 & e && d(i, 'fill', t[5]),
          64 & e && d(c, 'stop-color', t[6]),
          23 & e &&
            f(
              s,
              'transform',
              'translate(' +
                (t[1] + t[0].x) +
                'px, ' +
                (t[2] + 1.17 * t[0].y - 50 * t[4]) +
                'px)'
            ),
          8 & e && f(s, 'width', t[3] + 'px');
      },
      i: t,
      o: t,
      d(t) {
        t && l(s);
      },
    };
  }
  function kt(t, e, s) {
    let { scroll: i } = e,
      { x: n } = e,
      { y: o } = e,
      { width: a } = e,
      { speed: r } = e,
      h = '#9CAFCF',
      l = '#85A3D8';
    return (
      140 === a
        ? ((h = '#8EA0C0'), (l = '#7C94BF'))
        : 160 === a && ((h = '#708CAF'), (l = '#6785AB')),
      (t.$$set = (t) => {
        'scroll' in t && s(0, (i = t.scroll)),
          'x' in t && s(1, (n = t.x)),
          'y' in t && s(2, (o = t.y)),
          'width' in t && s(3, (a = t.width)),
          'speed' in t && s(4, (r = t.speed));
      }),
      [i, n, o, a, r, h, l]
    );
  }
  class Pt extends q {
    constructor(t) {
      super(),
        W(this, t, kt, Lt, a, { scroll: 0, x: 1, y: 2, width: 3, speed: 4 });
    }
  }
  function Dt(e) {
    let s;
    return {
      c() {
        (s = p('div')),
          (s.innerHTML =
            '<div class="warningSign svelte-182f9ha"><div class="svelte-182f9ha"></div></div> \n\t<div class="warningSign bottom svelte-182f9ha"><div class="svelte-182f9ha"></div></div>'),
          d(s, 'class', 'warningSignWrapper');
      },
      m(t, i) {
        h(t, s, i), e[1](s);
      },
      p: t,
      i: t,
      o: t,
      d(t) {
        t && l(s), e[1](null);
      },
    };
  }
  function zt(t, e, s) {
    let i;
    return (
      w(() => {
        i &&
          (setTimeout(() => {
            i.classList.add('show');
          }, 0),
          setTimeout(() => {
            i.classList.remove('show'), i.classList.add('hidden');
          }, 5e3));
      }),
      [
        i,
        function (t) {
          b[t ? 'unshift' : 'push'](() => {
            (i = t), s(0, i);
          });
        },
      ]
    );
  }
  class Ot extends q {
    constructor(t) {
      super(), W(this, t, zt, Dt, a, {});
    }
  }
  function Rt(t, e, s) {
    const i = t.slice();
    return (i[15] = e[s]), i;
  }
  function _t(t) {
    let s, i;
    const n = [t[8](t[15], t[5])];
    let o = {};
    for (let t = 0; t < n.length; t += 1) o = e(o, n[t]);
    return (
      (s = new Pt({ props: o })),
      {
        c() {
          E(s.$$.fragment);
        },
        m(t, e) {
          B(s, t, e), (i = !0);
        },
        p(t, e) {
          const i =
            416 & e
              ? (function (t, e) {
                  const s = {},
                    i = {},
                    n = { $$scope: 1 };
                  let o = t.length;
                  for (; o--; ) {
                    const a = t[o],
                      r = e[o];
                    if (r) {
                      for (const t in a) t in r || (i[t] = 1);
                      for (const t in r) n[t] || ((s[t] = r[t]), (n[t] = 1));
                      t[o] = r;
                    } else for (const t in a) n[t] = 1;
                  }
                  for (const t in i) t in s || (s[t] = void 0);
                  return s;
                })(n, [
                  ((o = t[8](t[15], t[5])),
                  'object' == typeof o && null !== o ? o : {}),
                ])
              : {};
          var o;
          s.$set(i);
        },
        i(t) {
          i || (R(s.$$.fragment, t), (i = !0));
        },
        o(t) {
          _(s.$$.fragment, t), (i = !1);
        },
        d(t) {
          F(s, t);
        },
      }
    );
  }
  function Et(t) {
    let e, s;
    return (
      (e = new Ot({})),
      {
        c() {
          E(e.$$.fragment);
        },
        m(t, i) {
          B(e, t, i), (s = !0);
        },
        i(t) {
          s || (R(e.$$.fragment, t), (s = !0));
        },
        o(t) {
          _(e.$$.fragment, t), (s = !1);
        },
        d(t) {
          F(e, t);
        },
      }
    );
  }
  function Bt(t) {
    let e,
      s,
      i,
      n,
      o,
      a,
      u,
      g,
      x,
      w,
      v,
      b,
      T,
      S,
      A,
      M,
      $,
      I,
      C,
      L,
      k,
      P,
      D,
      E,
      B,
      F,
      X,
      W,
      q,
      H,
      j,
      Y,
      G,
      N,
      U,
      V,
      Z,
      J,
      K,
      Q,
      tt,
      et,
      st,
      it,
      nt,
      ot,
      at,
      rt,
      ht,
      lt,
      pt,
      ut,
      ct,
      yt,
      dt = String(Math.floor(t[4].score)).padStart(9, '0') + '',
      mt = t[7],
      ft = [];
    for (let e = 0; e < mt.length; e += 1) ft[e] = _t(Rt(t, mt, e));
    const gt = (t) =>
      _(ft[t], 1, 1, () => {
        ft[t] = null;
      });
    let xt = t[4].showWarning && Et();
    return {
      c() {
        (e = p('div')),
          (s = p('div')),
          (i = p('img')),
          (o = y()),
          (a = p('img')),
          (g = y()),
          (x = p('img')),
          (v = y());
        for (let t = 0; t < ft.length; t += 1) ft[t].c();
        (b = y()),
          (T = p('div')),
          (S = p('div')),
          (A = p('div')),
          (M = p('p')),
          (M.textContent = 'score'),
          ($ = y()),
          (I = p('p')),
          (C = c(dt)),
          (L = y()),
          (k = p('div')),
          (P = p('span')),
          (E = y()),
          (B = p('span')),
          (X = y()),
          (W = p('span')),
          (H = y()),
          (j = p('div')),
          (Y = p('div')),
          (G = p('span')),
          (N = y()),
          (U = p('span')),
          (V = y()),
          (Z = p('span')),
          (J = y()),
          (K = p('div')),
          (Q = p('span')),
          (tt = y()),
          (et = p('span')),
          (st = y()),
          (it = p('span')),
          (nt = y()),
          (ot = p('span')),
          (at = y()),
          (rt = p('canvas')),
          (ht = y()),
          xt && xt.c(),
          (lt = y()),
          (pt = p('p')),
          (ut = c(t[6])),
          (ct = c('fps')),
          d(i, 'class', 'sky svelte-12ys7p2'),
          i.src !== (n = './images/sky.png') && d(i, 'src', './images/sky.png'),
          d(i, 'alt', 'sky0'),
          d(a, 'class', 'sky svelte-12ys7p2'),
          a.src !== (u = './images/sky.png') && d(a, 'src', './images/sky.png'),
          d(a, 'alt', 'sky1'),
          d(x, 'class', 'bg svelte-12ys7p2'),
          x.src !== (w = './images/bg.png') && d(x, 'src', './images/bg.png'),
          d(x, 'alt', 'background'),
          d(s, 'class', 'viewport svelte-12ys7p2'),
          d(I, 'class', 'scorec svelte-12ys7p2'),
          d(A, 'class', 'score svelte-12ys7p2'),
          d(
            P,
            'class',
            (D =
              'heart ' +
              (t[4].player.stats.life <= 0 ? 'hidden' : '') +
              ' svelte-12ys7p2')
          ),
          d(
            B,
            'class',
            (F =
              'heart ' +
              (t[4].player.stats.life <= 1 ? 'hidden' : '') +
              ' svelte-12ys7p2')
          ),
          d(
            W,
            'class',
            (q =
              'heart ' +
              (t[4].player.stats.life <= 2 ? 'hidden' : '') +
              ' svelte-12ys7p2')
          ),
          d(k, 'class', 'life svelte-12ys7p2'),
          d(S, 'class', 'svelte-12ys7p2'),
          d(G, 'class', 'star svelte-12ys7p2'),
          f(
            G,
            'background-position-x',
            (t[4].player.stats.spell < 1
              ? (30 * (1 - t[4].player.stats.spell)) | 0
              : 0) + 'px'
          ),
          f(
            G,
            'transform',
            'translateX(-' +
              (t[4].player.stats.spell < 1
                ? (30 * (1 - t[4].player.stats.spell)) | 0
                : 0) +
              'px)'
          ),
          d(U, 'class', 'star svelte-12ys7p2'),
          f(
            U,
            'background-position-x',
            (t[4].player.stats.spell < 2
              ? (30 * (2 - t[4].player.stats.spell)) | 0
              : 0) + 'px'
          ),
          f(
            U,
            'transform',
            'translateX(-' +
              (t[4].player.stats.spell < 2
                ? (30 * (2 - t[4].player.stats.spell)) | 0
                : 0) +
              'px)'
          ),
          d(Z, 'class', 'star svelte-12ys7p2'),
          f(
            Z,
            'background-position-x',
            (t[4].player.stats.spell < 3
              ? (30 * (3 - t[4].player.stats.spell)) | 0
              : 0) + 'px'
          ),
          f(
            Z,
            'transform',
            'translateX(-' +
              (t[4].player.stats.spell < 3
                ? (30 * (3 - t[4].player.stats.spell)) | 0
                : 0) +
              'px)'
          ),
          d(Y, 'class', 'mana svelte-12ys7p2'),
          d(Q, 'class', 'sword svelte-12ys7p2'),
          d(et, 'class', 'sword svelte-12ys7p2'),
          f(
            et,
            'background-position-x',
            (t[4].player.stats.power < 2
              ? (30 * (2 - t[4].player.stats.power)) | 0
              : 0) + 'px'
          ),
          f(
            et,
            'transform',
            'translateX(-' +
              (t[4].player.stats.power < 2
                ? (30 * (2 - t[4].player.stats.power)) | 0
                : 0) +
              'px)'
          ),
          d(it, 'class', 'sword svelte-12ys7p2'),
          f(
            it,
            'background-position-x',
            (t[4].player.stats.power < 3
              ? (30 * (3 - t[4].player.stats.power)) | 0
              : 0) + 'px'
          ),
          f(
            it,
            'transform',
            'translateX(-' +
              (t[4].player.stats.power < 3
                ? (30 * (3 - t[4].player.stats.power)) | 0
                : 0) +
              'px)'
          ),
          d(ot, 'class', 'sword svelte-12ys7p2'),
          f(
            ot,
            'background-position-x',
            (t[4].player.stats.power < 4
              ? (30 * (4 - t[4].player.stats.power)) | 0
              : 0) + 'px'
          ),
          f(
            ot,
            'transform',
            'translateX(-' +
              (t[4].player.stats.power < 4
                ? (30 * (4 - t[4].player.stats.power)) | 0
                : 0) +
              'px)'
          ),
          d(K, 'class', 'power svelte-12ys7p2'),
          d(j, 'class', 'svelte-12ys7p2'),
          d(T, 'class', 'gui svelte-12ys7p2'),
          d(rt, 'width', 924),
          d(rt, 'height', 520),
          d(rt, 'class', 'svelte-12ys7p2'),
          d(pt, 'class', 'fps svelte-12ys7p2'),
          d(e, 'class', 'game svelte-12ys7p2');
      },
      m(n, l) {
        h(n, e, l),
          r(e, s),
          r(s, i),
          t[9](i),
          r(s, o),
          r(s, a),
          t[10](a),
          r(s, g),
          r(s, x),
          t[11](x),
          r(s, v);
        for (let t = 0; t < ft.length; t += 1) ft[t].m(s, null);
        r(e, b),
          r(e, T),
          r(T, S),
          r(S, A),
          r(A, M),
          r(A, $),
          r(A, I),
          r(I, C),
          r(S, L),
          r(S, k),
          r(k, P),
          r(k, E),
          r(k, B),
          r(k, X),
          r(k, W),
          r(T, H),
          r(T, j),
          r(j, Y),
          r(Y, G),
          r(Y, N),
          r(Y, U),
          r(Y, V),
          r(Y, Z),
          r(j, J),
          r(j, K),
          r(K, Q),
          r(K, tt),
          r(K, et),
          r(K, st),
          r(K, it),
          r(K, nt),
          r(K, ot),
          r(e, at),
          r(e, rt),
          t[12](rt),
          r(e, ht),
          xt && xt.m(e, null),
          r(e, lt),
          r(e, pt),
          r(pt, ut),
          r(pt, ct),
          (yt = !0);
      },
      p(t, [i]) {
        if (416 & i) {
          let e;
          for (mt = t[7], e = 0; e < mt.length; e += 1) {
            const n = Rt(t, mt, e);
            ft[e]
              ? (ft[e].p(n, i), R(ft[e], 1))
              : ((ft[e] = _t(n)), ft[e].c(), R(ft[e], 1), ft[e].m(s, null));
          }
          for (z(), e = mt.length; e < ft.length; e += 1) gt(e);
          O();
        }
        (!yt || 16 & i) &&
          dt !== (dt = String(Math.floor(t[4].score)).padStart(9, '0') + '') &&
          m(C, dt),
          (!yt ||
            (16 & i &&
              D !==
                (D =
                  'heart ' +
                  (t[4].player.stats.life <= 0 ? 'hidden' : '') +
                  ' svelte-12ys7p2'))) &&
            d(P, 'class', D),
          (!yt ||
            (16 & i &&
              F !==
                (F =
                  'heart ' +
                  (t[4].player.stats.life <= 1 ? 'hidden' : '') +
                  ' svelte-12ys7p2'))) &&
            d(B, 'class', F),
          (!yt ||
            (16 & i &&
              q !==
                (q =
                  'heart ' +
                  (t[4].player.stats.life <= 2 ? 'hidden' : '') +
                  ' svelte-12ys7p2'))) &&
            d(W, 'class', q),
          (!yt || 16 & i) &&
            f(
              G,
              'background-position-x',
              (t[4].player.stats.spell < 1
                ? (30 * (1 - t[4].player.stats.spell)) | 0
                : 0) + 'px'
            ),
          (!yt || 16 & i) &&
            f(
              G,
              'transform',
              'translateX(-' +
                (t[4].player.stats.spell < 1
                  ? (30 * (1 - t[4].player.stats.spell)) | 0
                  : 0) +
                'px)'
            ),
          (!yt || 16 & i) &&
            f(
              U,
              'background-position-x',
              (t[4].player.stats.spell < 2
                ? (30 * (2 - t[4].player.stats.spell)) | 0
                : 0) + 'px'
            ),
          (!yt || 16 & i) &&
            f(
              U,
              'transform',
              'translateX(-' +
                (t[4].player.stats.spell < 2
                  ? (30 * (2 - t[4].player.stats.spell)) | 0
                  : 0) +
                'px)'
            ),
          (!yt || 16 & i) &&
            f(
              Z,
              'background-position-x',
              (t[4].player.stats.spell < 3
                ? (30 * (3 - t[4].player.stats.spell)) | 0
                : 0) + 'px'
            ),
          (!yt || 16 & i) &&
            f(
              Z,
              'transform',
              'translateX(-' +
                (t[4].player.stats.spell < 3
                  ? (30 * (3 - t[4].player.stats.spell)) | 0
                  : 0) +
                'px)'
            ),
          (!yt || 16 & i) &&
            f(
              et,
              'background-position-x',
              (t[4].player.stats.power < 2
                ? (30 * (2 - t[4].player.stats.power)) | 0
                : 0) + 'px'
            ),
          (!yt || 16 & i) &&
            f(
              et,
              'transform',
              'translateX(-' +
                (t[4].player.stats.power < 2
                  ? (30 * (2 - t[4].player.stats.power)) | 0
                  : 0) +
                'px)'
            ),
          (!yt || 16 & i) &&
            f(
              it,
              'background-position-x',
              (t[4].player.stats.power < 3
                ? (30 * (3 - t[4].player.stats.power)) | 0
                : 0) + 'px'
            ),
          (!yt || 16 & i) &&
            f(
              it,
              'transform',
              'translateX(-' +
                (t[4].player.stats.power < 3
                  ? (30 * (3 - t[4].player.stats.power)) | 0
                  : 0) +
                'px)'
            ),
          (!yt || 16 & i) &&
            f(
              ot,
              'background-position-x',
              (t[4].player.stats.power < 4
                ? (30 * (4 - t[4].player.stats.power)) | 0
                : 0) + 'px'
            ),
          (!yt || 16 & i) &&
            f(
              ot,
              'transform',
              'translateX(-' +
                (t[4].player.stats.power < 4
                  ? (30 * (4 - t[4].player.stats.power)) | 0
                  : 0) +
                'px)'
            ),
          t[4].showWarning
            ? xt
              ? 16 & i && R(xt, 1)
              : ((xt = Et()), xt.c(), R(xt, 1), xt.m(e, lt))
            : xt &&
              (z(),
              _(xt, 1, 1, () => {
                xt = null;
              }),
              O()),
          (!yt || 64 & i) && m(ut, t[6]);
      },
      i(t) {
        if (!yt) {
          for (let t = 0; t < mt.length; t += 1) R(ft[t]);
          R(xt), (yt = !0);
        }
      },
      o(t) {
        ft = ft.filter(Boolean);
        for (let t = 0; t < ft.length; t += 1) _(ft[t]);
        _(xt), (yt = !1);
      },
      d(s) {
        s && l(e),
          t[9](null),
          t[10](null),
          t[11](null),
          (function (t, e) {
            for (let s = 0; s < t.length; s += 1) t[s] && t[s].d(e);
          })(ft, s),
          t[12](null),
          xt && xt.d();
      },
    };
  }
  function Ft(t, e, s) {
    let i, n, o, a;
    const r = [
        { x: 100, y: -150, width: 100, speed: 0.1 },
        { x: 920, y: -150, width: 100, speed: 0.1 },
        { x: 200, y: -125, width: 140, speed: 0.2 },
        { x: 930, y: -125, width: 140, speed: 0.2 },
        { x: 300, y: -100, width: 160, speed: 0.3 },
        { x: 900, y: -100, width: 160, speed: 0.3 },
      ],
      h = new Ct(),
      l = h.player,
      p = { x: 0, y: 0 },
      u = [0, -1140];
    let c;
    (window.game = h),
      (window.scroll = p),
      w(() => {
        const t = i.getContext('2d');
        let e, y, d;
        const m = (f) => {
          if (
            ((e = requestAnimationFrame(m)),
            (y = 0.001 * (f - d)),
            (d = f),
            s(6, (c = Math.round(1 / y))),
            s(4, (h.dt = 60 * y), h),
            t)
          ) {
            t.clearRect(0, 0, i.width, i.height),
              s(4, (h.score += 0.2 * (h.dt || 1)), h),
              h.draw(t),
              s(5, (p.x += ((-l.x - p.x + 200) / 150) * (h.dt || 1)), p),
              s(5, (p.y += ((l.y - p.y - 320) / 100) * (h.dt || 1)), p),
              p.x > -5
                ? s(5, (p.x = -5), p)
                : p.x < -200 && s(5, (p.x = -200), p),
              p.y < -100
                ? s(5, (p.y = -100), p)
                : p.y > 0 && s(5, (p.y = 0), p),
              s(1, (n.style.transform = `translate(${p.x}px, ${p.y}px)`), n);
            for (let t = r.length - 1; t >= 0; t--) {
              const e = r[t];
              (e.x -= e.speed),
                e.x < -250 && (e.x = Math.random() * e.width + 1100);
            }
            s(
              2,
              (o.style.transform = `translate(${p.x - u[0]}px, ${p.y}px)`),
              o
            ),
              s(
                3,
                (a.style.transform = `translate(${p.x - u[1]}px, ${p.y}px)`),
                a
              ),
              (u[0] += 0.2),
              (u[1] += 0.2),
              u[0] > 1140 && (u[0] = 0),
              u[1] > 0 && (u[1] = -1140);
          }
        };
        return (
          requestAnimationFrame(m),
          () => {
            cancelAnimationFrame(e);
          }
        );
      }),
      (document.onkeydown = (t) => {
        'ArrowRight' === t.key
          ? (l.movement.right = !0)
          : 'ArrowUp' === t.key
          ? (l.movement.up = !0)
          : 'ArrowLeft' === t.key
          ? (l.movement.left = !0)
          : 'ArrowDown' === t.key
          ? (l.movement.down = !0)
          : 'z' === t.key
          ? (l.shooting = !0)
          : 'x' === t.key
          ? (l.spelling = !0)
          : 'Shift' === t.key && (l.focusing = !0);
      }),
      (document.onkeyup = (t) => {
        'ArrowRight' === t.key
          ? (l.movement.right = !1)
          : 'ArrowUp' === t.key
          ? (l.movement.up = !1)
          : 'ArrowLeft' === t.key
          ? (l.movement.left = !1)
          : 'ArrowDown' === t.key
          ? (l.movement.down = !1)
          : 'z' === t.key
          ? (l.shooting = !1)
          : 'x' === t.key
          ? (l.spelling = !1)
          : 'Shift' === t.key
          ? (l.focusing = !1)
          : 'c' === t.key &&
            pt({
              x: 450,
              y: 300,
              size: 30,
              amount: 30,
              particleArr: h.particles,
            }),
          t.preventDefault();
      });
    return [
      i,
      n,
      o,
      a,
      h,
      p,
      c,
      r,
      (t, e) => Object.assign(Object.assign({}, t), { scroll: e }),
      function (t) {
        b[t ? 'unshift' : 'push'](() => {
          (o = t), s(2, o);
        });
      },
      function (t) {
        b[t ? 'unshift' : 'push'](() => {
          (a = t), s(3, a);
        });
      },
      function (t) {
        b[t ? 'unshift' : 'push'](() => {
          (n = t), s(1, n);
        });
      },
      function (t) {
        b[t ? 'unshift' : 'push'](() => {
          (i = t), s(0, i);
        });
      },
    ];
  }
  class Xt extends q {
    constructor(t) {
      super(), W(this, t, Ft, Bt, a, {});
    }
  }
  function Wt(e) {
    let s, i, n, o, a, u, c, m, f, g, x, w, v;
    return {
      c() {
        (s = p('div')),
          (i = p('div')),
          (n = p('div')),
          (o = p('button')),
          (o.textContent = 'START GAME'),
          (a = y()),
          (u = p('button')),
          (u.textContent = 'ENDLESS'),
          (c = y()),
          (m = p('button')),
          (m.textContent = 'SCORE'),
          (f = y()),
          (g = p('p')),
          (g.textContent = 'Ver 1.00'),
          (x = y()),
          (w = p('img')),
          d(o, 'class', 'select selected svelte-13056xr'),
          d(o, 'id', 'startGame'),
          d(u, 'class', 'select svelte-13056xr'),
          d(u, 'id', 'endless'),
          d(m, 'class', 'select svelte-13056xr'),
          d(m, 'id', 'score'),
          d(n, 'class', 'svelte-13056xr'),
          d(g, 'class', 'ver svelte-13056xr'),
          w.src !== (v = './images/menu_cover.png') &&
            d(w, 'src', './images/menu_cover.png'),
          d(w, 'alt', 'splash'),
          d(w, 'class', 'svelte-13056xr'),
          d(i, 'class', 'svelte-13056xr'),
          d(s, 'class', 'menu svelte-13056xr');
      },
      m(t, l) {
        h(t, s, l),
          r(s, i),
          r(i, n),
          r(n, o),
          e[4](o),
          r(n, a),
          r(n, u),
          e[5](u),
          r(n, c),
          r(n, m),
          e[6](m),
          r(i, f),
          r(i, g),
          r(i, x),
          r(i, w);
      },
      p: t,
      i: t,
      o: t,
      d(t) {
        t && l(s), e[4](null), e[5](null), e[6](null);
      },
    };
  }
  function qt(t, e, s) {
    let i,
      n,
      o,
      a,
      { started: r = !1 } = e,
      h = -1;
    const l = (t) => {
        t.forEach((t) => t.classList.remove('selected'));
      },
      p = (t) => {
        (h = 0 === h && -1 === t ? a.length - 1 : (h + t) % a.length),
          l(a),
          a[h].classList.add('selected');
      };
    return (
      w(() => {
        (a = [i, n, o]),
          l(a),
          a.forEach((t) => {
            t.addEventListener('click', () => {
              l(a),
                t.classList.add('selected'),
                'startGame' === t.id
                  ? (console.log('startGame'),
                    setTimeout(() => j.set(!0), 1e3),
                    (h = 0))
                  : 'endless' === t.id
                  ? (console.log('endless'), (h = 1))
                  : 'score' === t.id && (console.log('score'), (h = 2)),
                a.forEach((t) => (t.disabled = !0));
            });
          }),
          p(1);
      }),
      (document.onkeyup = (t) => {
        var e;
        !r &&
          a &&
          ('ArrowUp' === t.key
            ? p(-1)
            : 'ArrowDown' === t.key
            ? p(1)
            : ('Enter' !== t.key && 'z' !== t.key) ||
              null === (e = a[h]) ||
              void 0 === e ||
              e.click()),
          t.preventDefault();
      }),
      (t.$$set = (t) => {
        'started' in t && s(3, (r = t.started));
      }),
      [
        i,
        n,
        o,
        r,
        function (t) {
          b[t ? 'unshift' : 'push'](() => {
            (i = t), s(0, i);
          });
        },
        function (t) {
          b[t ? 'unshift' : 'push'](() => {
            (n = t), s(1, n);
          });
        },
        function (t) {
          b[t ? 'unshift' : 'push'](() => {
            (o = t), s(2, o);
          });
        },
      ]
    );
  }
  class Ht extends q {
    constructor(t) {
      super(), W(this, t, qt, Wt, a, { started: 3 });
    }
  }
  function jt(t) {
    let e, s;
    return (
      (e = new Ht({ props: { started: t[0] } })),
      {
        c() {
          E(e.$$.fragment);
        },
        m(t, i) {
          B(e, t, i), (s = !0);
        },
        p(t, s) {
          const i = {};
          1 & s && (i.started = t[0]), e.$set(i);
        },
        i(t) {
          s || (R(e.$$.fragment, t), (s = !0));
        },
        o(t) {
          _(e.$$.fragment, t), (s = !1);
        },
        d(t) {
          F(e, t);
        },
      }
    );
  }
  function Yt(e) {
    let s, i;
    return (
      (s = new Xt({})),
      {
        c() {
          E(s.$$.fragment);
        },
        m(t, e) {
          B(s, t, e), (i = !0);
        },
        p: t,
        i(t) {
          i || (R(s.$$.fragment, t), (i = !0));
        },
        o(t) {
          _(s.$$.fragment, t), (i = !1);
        },
        d(t) {
          F(s, t);
        },
      }
    );
  }
  function Gt(t) {
    let e, s, i, n;
    const o = [Yt, jt],
      a = [];
    function r(t, e) {
      return t[0] ? 0 : 1;
    }
    return (
      (s = r(t)),
      (i = a[s] = o[s](t)),
      {
        c() {
          (e = p('div')), i.c(), d(e, 'class', 'wrapper');
        },
        m(t, i) {
          h(t, e, i), a[s].m(e, null), (n = !0);
        },
        p(t, [n]) {
          let h = s;
          (s = r(t)),
            s === h
              ? a[s].p(t, n)
              : (z(),
                _(a[h], 1, 1, () => {
                  a[h] = null;
                }),
                O(),
                (i = a[s]),
                i ? i.p(t, n) : ((i = a[s] = o[s](t)), i.c()),
                R(i, 1),
                i.m(e, null));
        },
        i(t) {
          n || (R(i), (n = !0));
        },
        o(t) {
          _(i), (n = !1);
        },
        d(t) {
          t && l(e), a[s].d();
        },
      }
    );
  }
  function Nt(t, e, s) {
    let i = !1;
    return (
      j.subscribe((t) => {
        s(0, (i = t));
      }),
      w(() => {
        console.log('yoyo');
      }),
      [i]
    );
  }
  return new (class extends q {
    constructor(t) {
      super(), W(this, t, Nt, Gt, a, {});
    }
  })({ target: document.body });
})();
//# sourceMappingURL=bundle.js.map