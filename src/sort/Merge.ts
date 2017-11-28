import { Comparables } from "../interface";
import Example from "./index";
/**
 * @description
 * 自顶到下的归并排序
 * 自上而下，在合并前才会对子数组进行排序
 */
export default class Merge extends Example {
    private static aux: Comparables;
    public static sortSelf(list: Comparables, lo: number, hi: number): void;
    public static sortSelf(list: Comparables): void;
    public static sortSelf(list: Comparables, lo?: number, hi?: number) {
        if (typeof lo === "number") {
            if (hi <= lo) return;
            let mid = lo + parseInt(String((hi - lo) / 2));
            this.sortSelf(list, lo, mid);
            this.sortSelf(list, mid + 1, hi);
            this.merge(list, lo, mid, hi);
        } else if (lo === undefined) {
            this.aux = [];
            this.sortSelf(list, 0, list.length - 1);
        }
    }
    private static merge(list: Comparables, lo: number, mid: number, hi: number) {
        let i = lo,
            j = mid + 1;
        for (let k = lo; k <= hi; k++) {
            this.aux[k] = list[k];
        }
        for (let k = lo; k <= hi; k++) {
            if (i > mid) list[k] = this.aux[j++];
            else if (j > hi) list[k] = this.aux[i++];
            else if (this.less(this.aux[j], this.aux[i])) list[k] = this.aux[j++];
            else list[k] = this.aux[i++];
        }
    }
}
