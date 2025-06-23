export function testEdgeCollision(ball, map) {
  const ballRect = ball.getBoundingClientRect();
  const mapRect = map.getBoundingClientRect();
  if (
    ballRect.left < mapRect.left ||
    ballRect.right > mapRect.right ||
    ballRect.top < mapRect.top ||
    ballRect.bottom > mapRect.bottom
  ) {
    console.log("Collision");
  }
}
