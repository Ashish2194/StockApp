export function randomInt(min, max) {
  return parseInt(Math.random() * (max - min + 1), 10) + min;
}
