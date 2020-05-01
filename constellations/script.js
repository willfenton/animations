// Canvas
function decimalToHex(number) {
    if (number < 0) {
        number = 0xffffffff + number + 1;
    }

    let hex = number.toString(16).toUpperCase();

    if (hex.length === 1) {
        hex = `0${hex}`;
    }

    return hex;
}

class Star {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        this.speed = Math.random() * .4 + .2;
        this.direction = Math.random() * Math.PI * 2;

        this.size = Math.random() + 2

        // color
        this.colour = '#ffffff';
    }

    draw() {
        c.beginPath();

        c.fillStyle = this.colour;
        c.globalAlpha = 1;
        c.strokeStyle = this.colour

        c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);

        c.fill();
    }

    update() {
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
        this.x %= (window.innerWidth + threshold);
        this.y %= (window.innerHeight + threshold);

        if ((this.x + threshold) < 0) {
            this.x += (window.innerWidth + threshold);
        }
        if ((this.y + threshold) < 0) {
            this.y += (window.innerHeight + threshold);
        }
    }

    drawLine(otherStars) {
        for (let other of otherStars) {
            if (other !== this && this.distance(other) < threshold) {
                c.beginPath();
                let opacity = Math.round((threshold - this.distance(other)) / threshold * 256);
                c.strokeStyle = `${this.colour}${decimalToHex(opacity)}`;
                c.moveTo(this.x, this.y);
                c.lineTo(other.x, other.y);
                c.stroke();
            }
        }
    }

    distance(other) {
        // euclidian distance function
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
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

const threshold = 100;

window.addEventListener('DOMContentLoaded', (event) => {
    for (let i = 0; i < size; i++) {
        stars.push(new Star());
    }
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
        star.drawLine(stars);
        star.draw();
    }
}
