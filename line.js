export const line = p => {

    let colors;
    let type;
    let weight = 1;
    let waveform = 0.0009;

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);

        colors = [
            p.color(255, 0, 0),
            p.color(0, 255, 0),
            p.color(0, 0, 255)
        ];

        type = 0;
    }

    p.draw = function() {
        p.blendMode(p.BLEND);

        if (type == 0) {
            p.background(255);
            p.blendMode(p.EXCLUSION);
        } else {
            p.background(0);
            p.blendMode(p.SCREEN);
        }
        p.noFill();
        p.strokeWeight(weight);
        for (var i = 0; i < 3; i++) {
            p.stroke(colors[i]);
            p.beginShape();
            for (var w = -20; w < p.width + 20; w += 5) {
                var h = p.height / 2;
                h += 800 * p.sin(w * waveform + p.frameCount * 0.03 + i * p.TWO_PI / 3) * p.pow(p.abs(p.sin(w * 0.001 + p.frameCount * 0.02)), 5);
                p.curveVertex(w, h);
            }
            p.endShape();
        }

    }

    p.mousePressed =  function() {
        if (type == 0) {
            type = 1;
        } else {
            type = 0;
        }
        weight = Math.random() * (40 - 1) + 1;
    }

    p.keyPressed = function() {
        if (p.keyCode === p.UP_ARROW) {
            waveform += 0.001;
        } else if (p.keyCode === p.DOWN_ARROW) {
            waveform -= 0.001;
        }
    }    

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

}


