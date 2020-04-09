window.mobilecheck = function () {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function randRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Canvas
class Line {
    constructor() {
        this.velocity = 4;

        // Angle vector
        if (randomAngle) {
            this.ax = randRange(0, 1);
            this.ay = randRange(0, 1);
        }
        else {
            this.ax = ax;
            this.ay = ay;
            
            //if (Math.random() > 0.5) {
            //    this.ax = ax;
            //    this.ay = ay;
            //}
            //else {
            //    this.ax = ay;
            //    this.ay = ax;
            //}
        }

        // Normalize
        let norm = ((this.ax ** 2) + (this.ay ** 2)) ** 0.5;
        this.ax /= norm;
        this.ay /= norm;

        // Determine starting position and direction
        if (Math.random() > 0.5) {
            // Randomly determine whether the line goes left to right or right to left
            if (Math.random() > 0.5) {
                // Left
                this.x = 0;
                this.dx = 1;
            }
            else {
                // Right
                this.x = canvas.width;
                this.dx = -1;
            }

            // Randomly determine whether the line will move up or down
            this.dy = (Math.random() > 0.5) ? -1 : 1;

            let verticalClearance = canvas.width * (this.ay / this.ax);

            // Randomly determine line starting position
            if (this.dy > 0) {
                this.y = randRange(0 - verticalClearance, canvas.height);
            }
            else {
                this.y = randRange(0, canvas.height + verticalClearance);
            }
        }
        else {
            // Randomly determine whether the line goes top to bottom or bottom to top
            if (Math.random() > 0.5) {
                // Top
                this.y = 0;
                this.dy = 1;
            }
            else {
                // Bottom
                this.y = canvas.height;
                this.dy = -1;
            }

            // Randomly determine whether the line will move left or right
            this.dx = (Math.random() > 0.5) ? -1 : 1;

            let horizontalClearance = canvas.height * (this.ax / this.ay);

            // Randomly determine line starting position
            if (this.dx > 0) {
                this.x = randRange(0 - horizontalClearance, canvas.width);
            }
            else {
                this.x = randRange(0, canvas.width + horizontalClearance);
            }
        }

        // Randomly determine line length
        this.length = randRange(300, 1100);
        // this.length = Math.round((Math.random() * 8) + 3) * 100;

        this.thickness = 8;

        // Randomly determine colour (HSL)
        this.hue = randRange(0, 360);
        this.saturation = 100;
        this.lightness = 50;
        // this.saturation = Math.floor(randRange(75, 100));
        // this.lightness = Math.floor(randRange(35, 65));

        this.colour = `hsl(${this.hue},${this.saturation}%,${this.lightness}%)`;
    }

    draw() {
        c.lineWidth = this.thickness;
        c.strokeStyle = this.colour;
        c.fillStyle = this.colour;

        c.beginPath();
        c.moveTo(this.x - (this.dx * this.ax * this.length), this.y - (this.dy * this.ay * this.length));
        c.lineTo(this.x, this.y);
        c.stroke();
    }

    update() {
        this.x += (this.dx * this.ax * this.velocity);
        this.y += (this.dy * this.ay * this.velocity);

        // Bounce off walls
        // if (this.x < 0 || this.x > canvas.width) {
        //     this.dx *= -1;
        // }
        // if (this.y < 0 || this.y > canvas.height) {
        //     this.dy *= -1;
        // }
    }

    outOfView() {
        let start_x = this.x - (this.dx * this.ax * this.length);
        let end_x = this.x;

        let start_y = this.y - (this.dy * this.ay * this.length);
        let end_y = this.y;

        if (start_x < 0 && end_x < 0) {
            return true;
        }
        if (start_x > canvas.width && end_x > canvas.width) {
            return true;
        }
        if (start_y < 0 && end_y < 0) {
            return true;
        }
        if (start_y > canvas.height && end_y > canvas.height) {
            return true;
        }
        return false;
    }
}

// gets the canvas element
var canvas = document.querySelector("#canvas");

// canvas context
// used to draw on the canvas
var c = canvas.getContext("2d");

var randomAngle = false;
console.log("Try setting randomAngle = true ;)");

var ax = randRange(0.5, 1);
var ay = randRange(0.5, 1);

var linesPerSecond;
if (window.mobilecheck()) {
    linesPerSecond = 15;
}
else {
    linesPerSecond = 30;
}

var objects = [];

// Update lines X times per second (1000ms / X)
window.setInterval(() => {
    // remove objects out of view
    objects = objects.filter(o => !o.outOfView())

    // update objects
    for (var o of objects) {
        o.update();
    }

    animate();
}, 1000 / 60);

// Add new lines X times per second (1000ms / X)
window.setInterval(() => {
    objects.push(new Line())
}, 1000 / linesPerSecond);

function animate() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // call animate in a loop for each frame
    // requestAnimationFrame(animate);

    // clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height);

    // draw objects
    for (var o of objects) {
        o.draw();
    }
}
