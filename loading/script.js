// Canvas
class Circle {
    constructor(pos, hue) {
        this.position = pos
        this.distance = 50

        // color
        this.hue = (hue + (pos * 5)) % 360;
        console.log(this.hue)
        this.saturation = 100;
        this.lightness = 60;
        this.colour = `hsl(${this.hue},${this.saturation}%,${this.lightness}%)`;
    }

    draw() {
        c.beginPath();

        c.fillStyle = this.colour;
        c.globalAlpha = 1;

        c.arc(center.x + this.x, center.y + this.y, 10, 0, Math.PI * 2, false);

        c.fill();
    }

    update() {
        this.position += this.speed
        this.x = Math.cos(this.position) * this.distance
        this.y = Math.sin(this.position) * this.distance
    }

    get speed() {
        let maxSpeed = .22;
        let minSpeed = .05;
        let cosSpeed = (Math.sin(this.position) + 1) / 2;
        return cosSpeed * (maxSpeed - minSpeed) + minSpeed;
    }
}

// gets the canvas element
var canvas = document.querySelector("#canvas");

// canvas context
// used to draw on the canvas
var c = canvas.getContext("2d");

let initialHue = Math.random() * 360;

const circles = [
    new Circle(0, initialHue),
    new Circle(Math.PI / 3 * 2, initialHue),
    new Circle(Math.PI / 3 * 4, initialHue)
]

// Update circle X times per second (1000ms / X)
window.setInterval(() => {
    for (circle of circles) {
        circle.update();
    }
    animate();
}, 1000 / 60);

let center = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

function animate() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    center.x = canvas.width / 2;
    center.y = canvas.height / 2;

    // call animate in a loop for each frame
    // requestAnimationFrame(animate);

    // clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (circle of circles) {
        circle.draw();
    }
}
