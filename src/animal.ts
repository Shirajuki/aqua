export default class Animal {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw(ctx: any) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
  collision(other: Animal) {
    return !(
      this.y + this.height < other.y ||
      this.y > other.y + other.height ||
      this.x + this.width < other.x ||
      this.x > other.x + other.width
    );
  }
  collisionC(other: Animal) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.width / 2 + other.width;
  }
}
