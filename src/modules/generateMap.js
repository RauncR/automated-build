export function generateMap(map, numberOfObstacles) {
  const mapWidth = map.offsetWidth;
  const mapHeight = map.offsetHeight;
  for (let i = 0; i < numberOfObstacles; i++) {
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = Math.floor(Math.random() * mapWidth - 20) + "px";
    obstacle.style.top = Math.floor(Math.random() * mapHeight - 20) + "px";
    map.appendChild(obstacle);
    console.log(
      `Adding obstacle at ${obstacle.style.left}, ${obstacle.style.top}`
    );
  }
}
