class Utils {
    static randomIntFromRange(min: number, max: number) : number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static pick_random_thing<T>(array: Array<T>) : T{
        return array[Math.floor(Math.random() * array.length)]
    }

    static rotate(velocity: { x: number; y: number; }, angle: number) {
        return {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };
    }
}

export default Utils;