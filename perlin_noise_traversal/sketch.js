var noise_field_size = 100000000;

var noise_width, noise_height;
var noise_field_size_factor = 100;  // controls how big the view of the noise field is

var x_samples, y_samples;

var center, dest, heading;
var velocity;        // controls how quickly to move through the noise field
var heading_change = 0.01;  // controls how much the heading vector can change every frame

var border_size = 0;        // size of the borders in pixels
var point_spacing = 0;      // space between points in pixels
var max_point_size = 25;    // max width / height of the points in pixels

var background_color;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    background_color = color(0);

    // the size of the slice of the noise field is tied to the screen size
    noise_width = width / noise_field_size_factor;
    noise_height = height / noise_field_size_factor;

    velocity = noise_width * 0.001;

    // number of points that fit on the screen
    x_samples = Math.floor((width - (2 * border_size)) / (max_point_size + (2 * point_spacing)));
    y_samples = Math.floor((height - (2 * border_size)) / (max_point_size + (2 * point_spacing)));

    // where we are in the noise field
    let center_x = random(0, noise_field_size);
    let center_y = random(0, noise_field_size);
    let center_z = random(0, noise_field_size);
    center = createVector(center_x, center_y, center_z);

    // where we're going in the noise field
    let dest_x = random(center.x - (noise_field_size / 2), center.x + (noise_field_size / 2));
    let dest_y = random(center.y - (noise_field_size / 2), center.y + (noise_field_size / 2));
    let dest_z = random(center.z - (noise_field_size / 2), center.z + (noise_field_size / 2));
    dest = createVector(dest_x, dest_y, dest_z);

    // vector from center to dest
    heading = p5.Vector.sub(center, dest);

    // normalize heading to length 1
    heading.normalize();
}

// animation loop
function draw() {
    background(background_color);
    strokeWeight(0);

    // draw the current slice of the noise field
    for (let x = 0; x < x_samples; x++) {
        for (let y = 0; y < y_samples; y++) {
            // position of the point on the screen
            let px = map(x, 0, x_samples - 1, border_size + (max_point_size / 2), width - border_size - (max_point_size / 2));
            let py = map(y, 0, y_samples - 1, border_size + (max_point_size / 2), height - border_size - (max_point_size / 2));

            // position of the point in the noise field
            let noise_x = map(x, 0, x_samples - 1, center.x - (noise_width / 2), center.x + (noise_width / 2));
            let noise_y = map(y, 0, y_samples - 1, center.y - (noise_height / 2), center.y + (noise_height / 2));

            let noise_value = noise(noise_x, noise_y);

            // the noise value determines the color and size of the point
            let color = map(noise_value, 0, 1, 0, 255);
            let size = map(noise_value, 0, 1, 0, max_point_size);

            // draw the point
            fill(color);
            ellipse(px, py, size, size);
        }
    }

    // update position in the noise field
    center.x += heading.x * velocity;
    center.y += heading.y * velocity;
    center.z += heading.z * velocity;

    // update the heading randomly
    heading.x += random(-heading_change, heading_change);
    heading.y += random(-heading_change, heading_change);
    heading.z += random(-heading_change, heading_change);
    heading.normalize();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    // size of the noise field slice changes with the window size
    noise_width = width / noise_field_size_factor;
    noise_height = height / noise_field_size_factor;

    // number of points that fit on the screen
    x_samples = Math.floor((width - (2 * border_size)) / (max_point_size + (2 * point_spacing)));
    y_samples = Math.floor((height - (2 * border_size)) / (max_point_size + (2 * point_spacing)));
}