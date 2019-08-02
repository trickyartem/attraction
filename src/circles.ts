import { canvas } from "./canvas";
import { shapes } from "./main_func";
import Utils from "./utils";

class Circle {
    public  mass    : number;

    constructor(private x: number, private y: number, private radius: number, private color: string, private vel: { x: number, y: number }) {
        this.mass     = 1;
    }

    draw() {
        canvas.c.beginPath();
        canvas.c.strokeStyle = this.color;
        canvas.c.arc(this.x, this.y, this.radius * 2, 0, 360, false);
        canvas.c.stroke();                                                                                   
        canvas.c.closePath();
        canvas.c.beginPath();
        canvas.c.arc(this.x, this.y, this.radius, 0, 360, false);
        canvas.c.save();
        canvas.c.fillStyle = this.color;
        canvas.c.fill();
        canvas.c.restore();
        canvas.c.closePath();
    }

    update() {
        if (this.x + this.radius + this.vel.x > canvas.canvas.width  || this.x - this.radius <= 0) { this.vel.x *= -1 }
        if (this.y + this.radius + this.vel.y > canvas.canvas.height || this.y - this.radius <= 0) { this.vel.y *= -1 }
        this.x += this.vel.x;
        this.y += this.vel.y;

        for (let i = 0; i < shapes.length; i++) {
            if (this === shapes[i]) continue;

            if (this.getDist(shapes[i].x, shapes[i].y) - this.radius * 2 < 0) {
                this.resolveCollision(shapes[i]);
            }

            if (this.color === shapes[i].color) {
                if (this.getDist(shapes[i].x, shapes[i].y) < 100) {
                    canvas.c.beginPath();
                    canvas.c.strokeStyle = this.color;
                    canvas.c.moveTo(shapes[i].x, shapes[i].y);
                    canvas.c.lineTo(this.x, this.y);
                    canvas.c.stroke();
                    canvas.c.closePath();
                }
            }
        }

        this.draw();
    }

    resolveCollision(otherParticle: Circle) {
        const xVelocityDiff = this.vel.x - otherParticle.vel.x;
        const yVelocityDiff = this.vel.y - otherParticle.vel.y;

        const xDist = otherParticle.x - this.x;
        const yDist = otherParticle.y - this.y;

        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

            const angle = -Math.atan2(otherParticle.y - this.y, otherParticle.x - this.x);

            const m1 = this.mass;
            const m2 = otherParticle.mass;

            const u1 = Utils.rotate(this.vel, angle);
            const u2 = Utils.rotate(otherParticle.vel, angle);

            const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
            const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

            const vFinal1 = Utils.rotate(v1, -angle);
            const vFinal2 = Utils.rotate(v2, -angle);

            this.vel.x = vFinal1.x;
            this.vel.y = vFinal1.y;

            otherParticle.vel.x = vFinal2.x;
            otherParticle.vel.y = vFinal2.y;
        }
    }

    getDist(x1: number, y1: number) {
        let xDistance = this.x - x1;
        let yDistance = this.y - y1;

        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }
}

export default Circle