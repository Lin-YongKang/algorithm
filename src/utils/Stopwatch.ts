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
        console.log(stopwatch.elapsedTime());
        setTimeout(() => {
            console.log(stopwatch.intervalTime());
            setTimeout(() => {
                console.log(stopwatch.elapsedTime());
                console.log(stopwatch.intervalTime());
            }, 2000);
        }, 1000);
    }
}
