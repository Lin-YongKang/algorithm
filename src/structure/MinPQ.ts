import { Comparable } from "../interface";
import PQ from "./PQ";

export default class MinPQ<T extends Comparable> extends PQ<T> {
    constructor(list?: T[]) {
        super(list);
    }
    protected sink(k: number): void {
        while (2 * k <= this.N) {
            let j = 2 * k;
            if (j < this.N && this.less(j + 1, j)) j++;
            if (this.less(k, j)) break;
            this.exch(k, j);
            k = j;
        }
    }
    protected swim(k: number): void {
        while (k > 1 && !this.less(Math.floor(k / 2), k)) {
            this.exch(Math.floor(k / 2), k);
            k = Math.floor(k / 2);
        }
    }
    public static test(list: any[]) {
        console.log(list);
        let minPQ = new MinPQ(list);
        while (!minPQ.isEmpty()) {
            console.log(minPQ.delTop());
        }
    }
}
