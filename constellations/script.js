// Canvas
class Star {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        this.speed = Math.random() + .5;
        this.direction = Math.random() * Math.PI * 2;

        this.size = Math.random() + 2

        // color
        this.colour = '#ffffff';
    }

    draw() {
        c.beginPath();

        c.fillStyle = this.colour;
        c.globalAlpha = 1;

        c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);

        c.fill();
    }

    update() {
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
        this.x %= window.innerWidth;
        this.y %= window.innerHeight;

        if (this.x < 0) {
            this.x += window.innerWidth;
        }
        if (this.y < 0) {
            this.y += window.innerHeight;
        }
    }
}

// gets the canvas element
var canvas = document.querySelector("#canvas");

// canvas context
// used to draw on the canvas
var c = canvas.getContext("2d");

let initialHue = Math.random() * 360;

const stars = [];
const size = 100;

window.addEventListener('DOMContentLoaded', (event) => {
    for (let i = 0; i < size; i++) {
        stars.push(new Star());
    }
    console.table([window.innerWidth, window.innerHeight])
});

// Update circle X times per second (1000ms / X)
window.setInterval(() => {
    for (star of stars) {
        star.update();
    }
    animate();
}, 1000 / 60);

function animate() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // call animate in a loop for each frame
    // requestAnimationFrame(animate);

    // clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (star of stars) {
        star.draw();
    }
}
