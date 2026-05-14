let circles = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    noFill();
    strokeWeight(1);
}

function draw() {
    background(5, 40); // Scia di movimento

    // Ogni volta che il mouse si muove, emette un "impulso" radar
    if (mouseIsPressed || frameCount % 20 === 0) {
        circles.push(new RadarPulse(mouseX, mouseY));
    }

    for (let i = circles.length - 1; i >= 0; i--) {
        circles[i].update();
        circles[i].display();
        if (circles[i].isDead()) {
            circles.splice(i, 1);
        }
    }

    // Griglia statica di background
    drawGrid();
}

class RadarPulse {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.r = 0; this.alpha = 255;
    }
    update() { this.r += 4; this.alpha -= 2; }
    display() {
        stroke(232, 255, 0, this.alpha);
        ellipse(this.x, this.y, this.r);
    }
    isDead() { return this.alpha <= 0; }
}

function drawGrid() {
    stroke(232, 255, 0, 20);
    for (let i = 0; i < width; i += 50) line(i, 0, i, height);
    for (let j = 0; j < height; j += 50) line(0, j, width, j);
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); }
