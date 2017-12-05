export default class Stopwatch {
    private start: number;
    private outTime: number;
    constructor() {
        this.start = this.outTime = new Date().getTime();
    }
    /**
     * @return 距离对象创建的时间（s）
     */
    public elapsedTime() {
        this.outTime = new Date().getTime();
        return (this.outTime - this.start) / 1000;
    }
    /**
     * @return 距离上一次操作对象的时间（s）
     */
    public intervalTime() {
        let before = this.outTime;
        this.outTime = new Date().getTime();
        return (this.outTime - before) / 1000;
    }
}
