import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
Obstacle.propTypes = {
  obstaclePosition: PropTypes.object.isRequired,
};

function App() {
  useEffect(() => {
    document.addEventListener("keydown", moveBall);
    return () => {
      document.removeEventListener("keydown", moveBall);
    };
  }, []); /*Listens to any button press as 'keydown', return value is for cleaning up*/

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  }); /*Initial position to the top left corner, needs to be
  in useState instead of useEffect because I want to control how the ball's position changes not trigger
  accidentally*/
  const numberOfObstacles = 100;
  const moveBall = (e) => {
    switch (e.key) {
      case "ArrowUp":
        setPosition((prev) => {
          return { x: prev.x, y: prev.y - 1 };
        }); /*Takes along the whole previous state if being used as function, must overwrite everything otherwise
        some properties that are not specified in the new state will be gone, also possible: (prev)=> {...prev, y: prev.y - 1}*/
        break;
      case "ArrowDown":
        setPosition((prev) => {
          return { x: prev.x, y: prev.y + 1 };
        });
        break;
      case "ArrowLeft":
        setPosition((prev) => {
          return { ...prev, x: prev.x - 1 };
        });
        break;
      case "ArrowRight":
        setPosition((prev) => {
          return { x: prev.x + 1, y: prev.y };
        });
        break;
    }
  };

  useEffect(() => {
    const ball = document.getElementById("ball");
    const ballPosition = ball.getBoundingClientRect();
    const obstacles = document.getElementsByClassName("obstacle");
    detectEdgeCollision(ballPosition);
    for (let i = 0; i < obstacles.length; i++) {
      const obstaclePosition = obstacles[i].getBoundingClientRect();
      if (
        ballPosition.x < obstaclePosition.x + obstaclePosition.width &&
        ballPosition.x + ballPosition.width > obstaclePosition.x &&
        ballPosition.y < obstaclePosition.y + obstaclePosition.height &&
        ballPosition.y + ballPosition.height > obstaclePosition.y
      ) {
        alert("Game Over");
        setPosition({ x: 0, y: 0 });
      }
    }
  }, [position]);

  function detectEdgeCollision() {
    const ball = document.getElementById("ball");
    const ballPosition = ball.getBoundingClientRect();
    if (ballPosition.x < 0) {
      setPosition((prev) => {
        return { x: prev.x + 1, y: prev.y };
      });
    }
    if (ballPosition.x + ballPosition.width > window.innerWidth) {
      setPosition((prev) => {
        return { x: prev.x - 1, y: prev.y };
      });
    }
    if (ballPosition.y < 0) {
      setPosition((prev) => {
        return { x: prev.x, y: prev.y + 1 };
      });
    }
    if (ballPosition.y + ballPosition.height > window.innerHeight) {
      setPosition((prev) => {
        return { x: prev.x, y: prev.y - 1 };
      });
    }
  }
  return (
    <Map numberOfObstacles={numberOfObstacles}>
      <Ball position={position} />
    </Map>
  );
}

export function Map({ children, numberOfObstacles }) {
  const [obstaclePositions, setObstaclePositions] = useState([]);

  Map.propTypes = {
    children: PropTypes.node.isRequired,
    numberOfObstacles: PropTypes.number.isRequired,
  };

  useEffect(() => {
    const positions = Array(numberOfObstacles)
      .fill()
      .map(() => ({
        left: Math.floor(Math.random() * 100) + "vw",
        top: Math.floor(Math.random() * 100) + "vh",
      }));
    setObstaclePositions(positions);
  }, [numberOfObstacles]);

  return (
    <div>
      {obstaclePositions.map((pos, i) => (
        <Obstacle obstaclePosition={pos} key={i} />
      ))}
      {children}
    </div>
  );
}

function Ball({ position }) {
  return (
    <div
      id="ball"
      style={{
        left: position.x + "vw",
        top: position.y + "vh",
      }}
    >
      (*)
    </div>
  );
}

Ball.propTypes = {
  position: PropTypes.object.isRequired,
};

function Obstacle({ obstaclePosition }) {
  return (
    <div
      className="obstacle"
      data-testid="obstacle"
      style={obstaclePosition}
    ></div>
  );
}

export default App;
