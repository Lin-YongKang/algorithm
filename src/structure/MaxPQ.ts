import Comparable from "../utils/Comparable";
import PQ from "./PQ";
export default class MaxPQ<T extends Comparable<T>> extends PQ<T>{
    constructor(list?) {
        super(list);
    }
    protected sink(k: number): void {
        while (2 * k <= this.N) {
            let j = 2 * k;
            if (j < this.N && this.less(j, j + 1)) j++;
            if (!this.less(k, j)) break;
            this.exch(k, j);
            k = j;
        }
    }
    protected swim(k: number): void {
        while (k > 1 && this.less(Math.floor(k / 2), k)) {
            this.exch(Math.floor(k / 2), k);
            k = Math.floor(k / 2);
        }
    }
    public static test(list) {
        console.log(list);
        let maxPQ = new MaxPQ(list);
        while(!maxPQ.isEmpty()){
            console.log(maxPQ.delTop());
        }
    }
}