export const easeInQuad = (t: number) => t * t;
export const easeOutQuad = (t: number) => t * (2 - t);
export const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
export const easeInCubic = (t: number) => t * t * t;
export const easeOutCubic = (t: number) => --t * t * t + 1;
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
export const easeInQuart = (t: number) => t * t * t * t;
export const easeOutQuart = (t: number) => 1 - --t * t * t * t;
export const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
export const easeInQuint = (t: number) => t * t * t * t * t;
export const easeOutQuint = (t: number) => 1 + --t * t * t * t * t;
export const easeInOutQuint = (t: number) =>
  t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
export const easeInCirc = (t: number) => -(Math.sqrt(1 - t * t) - 1);
export const easeOutCirc = (t: number) => Math.sqrt(1 - Math.pow(t - 1, 2));
export const easeInOutCirc = (t: number) => {
  if ((t /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
};
