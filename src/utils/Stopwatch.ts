export default class Stopwatch {
    private start: number;
    constructor() {
        this.start = new Date().getTime();
    }
    public elapsedTime() {
        return (new Date().getTime() - this.start) / 1000;
    }
}