function randRange(min, max) {
    return Math.random() * (max - min) + min;
}

class Ball {
    constructor() {
        this.trails = []

        // radius in meters
        this.radius = randRange(0.5, 1);

        // meters per second
        this.vx = randRange(-10, 10);
        this.vy = randRange(-10, 10);

        // this.vx = 0;
        // this.vy = 0;

        // position in meters
        this.x = randRange(0, x_size);
        this.y = randRange(0, y_size);

        // Randomly determine colour (HSL)
        this.hue = randRange(0, 360);
        this.saturation = 100;
        this.lightness = 50;
        this.colour = `hsl(${this.hue},${this.saturation}%,${this.lightness}%)`;
    }

    draw() {
        // if (this.trails.length > 5) {
        //     this.trails.shift();
        // }
        // this.trails.push({
        //     "x": this.x,
        //     "y": this.y
        // })

        c.beginPath();
        
        c.fillStyle = this.colour;
        c.globalAlpha = 1;

        let px = (this.x / x_size) * canvas.width;
        let py = (this.y / y_size) * canvas.height;

        let pr = (pixels_per_meter * this.radius);

        c.arc(px, py, pr, 0, Math.PI * 2, false);

        c.fill();

        // let i = 5;
        // for (let trail of this.trails) {
        //     c.beginPath();
        
        //     c.fillStyle = this.colour;
    
        //     px = (trail.x / x_size) * canvas.width;
        //     py = (trail.y / y_size) * canvas.height;
    
        //     pr = (pixels_per_meter * this.radius) * Math.pow(0.75, i);
        //     c.globalAlpha = Math.pow(0.75, i);
        //     i--;
    
        //     c.arc(px, py, pr, 0, Math.PI * 2, false);
    
        //     c.fill();
        // }
    }

    update() {
        this.vy += (g * timestep * timescale);

        this.x += this.vx * timestep * timescale;
        this.y += this.vy * timestep * timescale;

        // simulate friction
        if ((this.y + this.radius) + 0.05 > y_size) {
            this.vx *= 0.99;
        }

        if ((this.x - this.radius) < 0) {
            this.x = this.radius;
            this.vx = Math.abs(this.vx);
            this.vx *= dampening;
        } else if ((this.x + this.radius) > x_size) {
            this.vx = Math.abs(this.vx) * -1;
            this.x = x_size - this.radius;
            this.vx *= dampening;
        }

        if ((this.y - this.radius) < 0) {
            this.y = this.radius;
            this.vy = Math.abs(this.vy);
            this.vy *= dampening;
        } else if ((this.y + this.radius) > y_size) {
            this.y = y_size - this.radius;
            this.vy = Math.abs(this.vy) * -1;
            this.vy *= dampening;
        }
    }
}

// gets the canvas element
var canvas = document.querySelector("#canvas");

// canvas context
// used to draw on the canvas
var c = canvas.getContext("2d");

// track time
var timescale = 2;

// time step in seconds
var timestep = 1 / 60;

var pixels_per_meter = 25;

var dampening = 0.95;

var g = 9.81;

var x_size = window.innerWidth / pixels_per_meter;
var y_size = window.innerHeight / pixels_per_meter;

var balls = [];

for (let i = 0; i < 100; i++) {
    balls.push(new Ball());
}

// main loop, run every time step
window.setInterval(() => {
    // update balls
    for (var b of balls) {
        b.update();
    }

    time += timestep;

}, 1000 * timestep);

function animate() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    x_size = window.innerWidth / pixels_per_meter;
    y_size = window.innerHeight / pixels_per_meter;

    // clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    // draw balls
    for (var b of balls) {
        b.draw();
    }

    // call animate in a loop for each frame
    requestAnimationFrame(animate);
}

animate();