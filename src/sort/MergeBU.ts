import Example, { Types } from "./index";
/**
 * @description
 * 自底向上的归并排序
 * 对全部最小分解的数组进行排序，然后两两归并
 */
export default class MergeBU extends Example {
    private static aux: Types.Param;

    public static sortSelf(list: Types.Param): void {
        let len = list.length;
        this.aux = [];
        for (let sz = 1; sz < len; sz = sz + sz) {
            for (let lo = 0; lo < len - sz; lo += sz + sz) {
                this.merge(list, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, len - 1));
            }
        }
    }
    private static merge(list: Types.Param, lo: number, mid: number, hi: number) {
        let i = lo,
            j = mid + 1;
        for (let k = lo; k <= hi; k++) {
            this.aux[k] = list[k];
        }
        for (let k = lo; k <= hi; k++) {
            if (i > mid) list[k] = this.aux[j++];
            else if (j > hi) list[k] = this.aux[i++];
            else if (this.less(<any>this.aux[j], <any>this.aux[i])) list[k] = this.aux[j++];
            else list[k] = this.aux[i++];
        }
    }
}
