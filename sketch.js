/* AYE AYE RECORDS - RADAR_ENGINE_JS v3.0 [STABLE] */
let pulses = [];
let gridScl = 50;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
}

function draw() {
    background(5, 50); 
    let amp = window.audioAmp || 0;
    stroke(232, 255, 0, 30);
    for(let x = 0; x < width; x += gridScl) line(x, 0, x, height);
    for(let y = 0; y < height; y += gridScl) line(0, y, width, y);
    if (amp > 50 && frameCount % 10 === 0) { pulses.push(new Pulse(random(width), random(height), amp/2)); }
    if (mouseIsPressed) pulses.push(new Pulse(mouseX, mouseY, 20));
    for (let i = pulses.length - 1; i >= 0; i--) { pulses[i].update(); pulses[i].show(); if (pulses[i].dead()) pulses.splice(i, 1); }
}

class Pulse {
    constructor(x, y, startR) { this.x = x; this.y = y; this.r = startR; this.a = 255; }
    update() { this.r += 5; this.a -= 4; }
    show() { noFill(); stroke(232, 255, 0, this.a); ellipse(this.x, this.y, this.r); }
    dead() { return this.a <= 0; }
}
function windowResized() { resizeCanvas(windowWidth, windowHeight); }
