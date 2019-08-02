import { canvas } from "./canvas";
import Utils from "./utils";
import Circle from "./circles";

const colors = ['#581845', '#DAF7A6', '#FFC300', '#FF5733', '#C70039', '#900C3F'];

addEventListener('resize', () => {
    canvas.canvas.width = innerWidth;
    canvas.canvas.height = innerHeight;

    init()
});

export let shapes: Array<Circle> = [];

export function init() {
    shapes = [];

    for (let i = 0; i < 150; i++) {
        let radius = Math.random() * 20 + 4;
        let x = Math.random() * (canvas.canvas.width - radius) + radius;
        let y = Math.random() * (canvas.canvas.height - radius) + radius;
        let color = Utils.pick_random_thing(colors);
        let d = {
            x: Utils.randomIntFromRange(-1, 1),
            y: Utils.randomIntFromRange(-1, 1)
        };

        shapes.push(new Circle(x, y, radius, color, d));
    }
}

export function animate() {
    canvas.c.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);

    for (const circle of shapes) {
        circle.update();
    }

    requestAnimationFrame(animate);
}
