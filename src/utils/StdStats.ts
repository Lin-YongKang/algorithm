export default class StdStats {
    public static max(list: number[]): typeof list[0] {
        return list.reduce((prev, next) => prev > next ? prev : next)
    }
    public static min(list: number[]): typeof list[0] {
        return list.reduce((prev, next) => prev > next ? prev : next)
    }
    public static mean(list: number[]): typeof list[0] {
        return this.sum(list) / list.length;
    }
    public static var(list: number[]): typeof list[0] {
        let avg = this.mean(list);
        let sum = 0;
        return list.reduce((prev,next)=>prev += Math.pow((avg - next),2),sum) / list.length;
    }
    public static stddev(list : number[]):typeof list[0]{
        return Math.sqrt(this.var(list))
    }
    public static sum(list:number[]):typeof list[0]{
        return list.reduce((prev, next) => prev + next);
    }
}