import Comparable from "../interface/Comparable";

export default abstract class PQ<T extends Comparable> {
    protected pq: T[];
    protected N: number = 0;
    constructor(list: T[]);
    constructor();
    constructor(list?: T[]) {
        this.pq = [];
        if (list !== undefined) {
            list.forEach(element => {
                this.insert(element);
            });
        }
    }
    protected abstract sink(k: number): void;
    protected abstract swim(k: number): void;
    public insert(v: T) {
        this.pq[++this.N] = v;
        this.swim(this.N);
    }
    public top(): T {
        return this.pq[1];
    }
    public delTop(): T {
        let top: T = this.pq[1];
        this.exch(1, this.N--);
        this.pq.pop();
        this.sink(1);
        return top;
    }
    public isEmpty(): boolean {
        return this.N === 0;
    }
    public size(): number {
        return this.N;
    }
    protected less(i: number, j: number): boolean {
        if (typeof this.pq[i] === "number") {
            return this.pq[i] < this.pq[j];
        } else {
            return this.pq[i].compareTo(this.pq[j]) < 0;
        }
    }
    protected exch(i: number, j: number): void {
        let temp = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = temp;
    }
}
