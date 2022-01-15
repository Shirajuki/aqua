export const lerp = (a: number, b: number, n: number): number =>
  (1 - n) * a + n * b;

export const getRGBColor = (color: string) => {
  if (color[0] === '#') {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }
  return color;
};
