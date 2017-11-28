export default class Stopwatch {
    private start: number;
    private outTime: number;
    constructor() {
        this.start = this.outTime = new Date().getTime();
    }
    public elapsedTime() {
        this.outTime = new Date().getTime();
        return (this.outTime - this.start) / 1000;
    }
    public intervalTime() {
        let before = this.outTime;
        this.outTime = new Date().getTime();
        return (this.outTime - before) / 1000;
    }
    public static test() {
        let stopwatch = new Stopwatch();
        setTimeout(stopwatch.elapsedTime, 1000);
    }
}
