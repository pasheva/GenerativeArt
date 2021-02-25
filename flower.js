export const flower = p => {

  let step;
  let numFlower = 300; // number of blobs
  let radius = 10; // diameter of the circle
  let inter = 0.2; // difference between the sizes of two blobs
  let maxNoise = 8;
  let hue = 0.0;
  let colorRate = 0.0002;

  let t;
  let size;
  let noisiness;
  let alpha;
  let angleStep;
  let r;
  let x;
  let y;
  let rotateValue = 0.5
  let strokeThickness = 0.01

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    // Hue Saturation Brightness
    p.colorMode(p.HSB, 1);
    p.noFill();
    step = 1.2;
  }

  p.draw = function() {
    // Set the background.

    p.strokeWeight(strokeThickness);
    p.background(hue, 0.01, 1);

    // Center it. 
    p.translate(p.width / 2, p.height / 2);
    p.angleMode(p.DEGREES);


    t = p.frameCount * 2;


    for (let i = numFlower; i > 0; i--) {
      p.rotate(rotateValue);
      size = radius + i * inter;
      alpha = (i / numFlower * 2);
      noisiness = maxNoise * (alpha / 2);


      hue += colorRate;
      if (hue < 0) colorRate = Math.abs(colorRate);
      if (hue > 1) colorRate = -Math.abs(colorRate);

      p.fill(hue, 1 - alpha, alpha, 1 - alpha);
      blob(size, 0, 0, t + i * step, noisiness, 12);

    }
  }

  function blob(size, xCenter, yCenter, t, noisiness, nPoints) {
    p.beginShape();
    angleStep = 180 / nPoints;
    for (let theta = 0; theta <= 360 + 3 * angleStep; theta += angleStep) {
      r = (size + ((p.cos((theta + t) * nPoints) + 1) / 2 + (p.sin((theta + t) * nPoints) + 1) / 2) * noisiness) * 10;
      x = xCenter + r * p.cos(theta + t);
      y = yCenter + r * p.sin(theta + t);
      p.curveVertex(x, y);
    }
    p.endShape();
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.mouseMoved = function(event) {
    console.log(p.mouseX, p.mouseY)
    rotateValue += (p.movedX / 1000);
    strokeThickness += (p.movedY / 5000);
  }

}
