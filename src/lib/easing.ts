// Some easing functions taken from Robert Penner
// https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
export const easeLinear = (
  t: number,
  b: number,
  c: number,
  d: number
): number => (c * t) / d + b;
export const easeInQuad = (
  t: number,
  b: number,
  c: number,
  d: number
): number => c * (t /= d) * t + b;
export const easeOutQuad = (
  t: number,
  b: number,
  c: number,
  d: number
): number => -c * (t /= d) * (t - 2) + b;
export const easeInOutQuad = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
};
export const easeInSine = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
};
export const easeOutSine = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b;
};
export const easeInOutSine = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
};
export const easeInExpo = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
};
export const easeOutExpo = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
};
export const easeInOutExpo = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  if (t == 0) return b;
  if (t == d) return b + c;
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
  return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
};
export const easeInCirc = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
};
export const easeOutCirc = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
};
export const easeInOutCirc = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
  return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
};
export const easeInCubic = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  return c * (t /= d) * t * t + b;
};
export const easeOutCubic = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  return c * ((t = t / d - 1) * t * t + 1) + b;
};
export const easeInOutCubic = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
  return (c / 2) * ((t -= 2) * t * t + 2) + b;
};
export const easeInQuart = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  return c * (t /= d) * t * t * t + b;
};
export const easeOutQuart = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};
export const easeInOutQuart = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
  return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
};
export const easeInQuint = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  return c * (t /= d) * t * t * t * t + b;
};
export const easeOutQuint = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
};
export const easeInOutQuint = (
  t: number,
  b: number,
  c: number,
  d: number
): number => {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
  return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
};
