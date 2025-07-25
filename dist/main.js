const ball = document.getElementById("ball");
const map = document.getElementById("map");
(() => {
  "use strict";
  function t() {
    const t = ball.getBoundingClientRect(),
      o = document.getElementsByClassName("obstacle");
    for (let e = 0; e < o.length; e++) {
      const n = o[e].getBoundingClientRect();
      t.left < n.right &&
        t.right > n.left &&
        t.top < n.bottom &&
        n.bottom > n.top &&
        console.log("Collision");
    }
  }
  const o = document.getElementById("ball"),
    e = document.getElementById("map");
  let n = { x: 0, y: 0 };
  document.addEventListener("keydown", (e) =>
    (function (o, e, n) {
      "ArrowLeft" === o.code
        ? (n.x -= 10)
        : "ArrowRight" === o.code
        ? (n.x += 10)
        : "ArrowUp" === o.code
        ? (n.y -= 10)
        : "ArrowDown" === o.code && (n.y += 10),
        (e.style.left = n.x + "px"),
        (e.style.top = n.y + "px"),
        (function (t, o) {
          const e = t.getBoundingClientRect(),
            n = o.getBoundingClientRect();
          (e.left < n.left ||
            e.right > n.right ||
            e.top < n.top ||
            e.bottom > n.bottom) &&
            console.log("Collision");
        })(e, map),
        t();
    })(e, o, n)
  ),
    console.log("Generating map..."),
    (window.onload = () => {
      !(function (t) {
        const o = t.offsetWidth,
          e = t.offsetHeight;
        for (let n = 0; n < 100; n++) {
          const n = document.createElement("div");
          n.classList.add("obstacle"),
            (n.style.left = Math.floor(Math.random() * o - 20) + "px"),
            (n.style.top = Math.floor(Math.random() * e - 20) + "px"),
            t.appendChild(n),
            console.log(`Adding obstacle at ${n.style.left}, ${n.style.top}`);
        }
      })(e);
    });
})();
