export function testObstacleCollision() {
  const ball = document.getElementById("ball");

  const ballRect = ball.getBoundingClientRect();
  const obstacles = document.getElementsByClassName("obstacle");
  for (let i = 0; i < obstacles.length; i++) {
    const obstacleRect = obstacles[i].getBoundingClientRect();
    if (
      ballRect.left < obstacleRect.right &&
      ballRect.right > obstacleRect.left &&
      ballRect.top < obstacleRect.bottom &&
      obstacleRect.bottom > obstacleRect.top
    ) {
      console.log("Collision");
    }
  }
}
