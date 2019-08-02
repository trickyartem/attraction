class Canvas {
    public readonly canvas = document.createElement('canvas');
    public readonly c = this.canvas.getContext('2d');

    constructor() {
        this.canvas.height = innerHeight;
        this.canvas.width = innerWidth;

        this.canvas.style.position = "fixed";
        this.canvas.style.top = "0px";
        this.canvas.style.left = "0px";

        document.body.appendChild(this.canvas);
    }
}

export const canvas = new Canvas();
