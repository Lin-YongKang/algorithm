import { Comparables } from "src/interface";
import Sorter from "./Sorter";
/**
 * @description
 * 自底向上的归并排序
 * 对全部最小分解的数组进行排序，然后两两归并
 */
export default class MergeBU extends Sorter {
    private static aux: Comparables;

    public static sortSelf(list: Comparables): void {
        let len = list.length;
        this.aux = [];
        // sz 是子数组的大小
        for (let sz = 1; sz < len; sz = sz + sz) {
            // lo子数组的索引
            for (let lo = 0; lo < len - sz; lo += sz + sz) {
                this.merge(list, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, len - 1));
            }
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
