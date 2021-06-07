import Animal from './animal';

class Bullet extends Animal {
  velocity = 10;
  outOfRange = false;
  move() {
    this.x += this.velocity;
    if (!this.outOfRange && (this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 900))
      this.outOfRange = true;
  }
}
export default Bullet;
