export function lerp(start, end, amt){
  return (1 - amt) * start + amt * end
}

export function normalize(current, min, max) {
  return (current - min) / (max - min)
}

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}