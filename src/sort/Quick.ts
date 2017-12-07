import { Comparables } from "src/interface";
import Sorter from "./Sorter";
/**
 * @description
 * 快速排序
 */
export default class Quick extends Sorter {
    public static sortSelf(list: Comparables, lo: number, hi: number): void;
    public static sortSelf(list: Comparables): void;
    public static sortSelf(list: any, lo?: number, hi?: number) {
        if (typeof lo === "number") {
            if (hi <= lo) return;
            let j = this.partition(list, lo, hi);
            this.sortSelf(list, lo, j - 1);
            this.sortSelf(list, j + 1, hi);
        } else if (lo === undefined) {
            this.sortSelf(list, 0, list.length - 1);
        }
    }
    public static partition(list: Comparables, lo: number, hi: number) {
        let i = lo,
            j = hi + 1;
        let v = list[lo];
        while (true) {
            while (this.less(list[++i], v)) if (i == hi) break;
            while (this.less(v, list[--j])) if (j == lo) break;
            if (i >= j) break;
            this.exch(list, i, j);
        }
        this.exch(list, lo, j);
        return j;
    }
}
