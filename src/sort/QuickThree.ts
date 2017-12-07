import { Comparables } from "src/interface";
import Sorter from "./Sorter";
/**
 * @description
 * 三向快速排序
 */
// 8, 9, 4, 5, 1, 6, 2, 3, 7
export default class QuickThree extends Sorter {
    public static sortSelf(list: Comparables, lo: number, hi: number): void;
    public static sortSelf(list: Comparables): void;
    public static sortSelf(list: any, lo?: number, hi?: number) {
        if (typeof lo === "number") {
            if (hi <= lo) return;
            let { p, q } = this.partition(list, lo, hi);
            this.sortSelf(list, lo, p);
            this.sortSelf(list, q, hi);
        } else if (lo === undefined) {
            this.sortSelf(list, 0, list.length - 1);
        }
    }
    public static partition(list: Comparables, lo: number, hi: number) {
        let p = lo + 1,
            q = hi,
            v = list[lo],
            i = lo,
            j = hi + 1;
        while (true) {
            while (true) {
                let temp = this.compareWith(v, list[++i]);
                if (temp < 0 || i === hi) break;
                if (temp === 0) this.exch(list, p++, i);
            }
            while (true) {
                let temp = this.compareWith(v, list[--j]);
                if (temp > 0 || j < i) break;
                if (temp === 0) this.exch(list, q--, j);
            }
            if (i >= j) break;
            this.exch(list, i, j);
        }
        while (p-- > lo) {
            this.exch(list, j--, p);
        }
        while (q++ < hi) {
            this.exch(list, i++, q);
        }
        return {
            p: j,
            q: i
        };
    }
}
