import Example, { Types } from "./index";
/**
 * @description
 * 自顶到下的归并排序
 * 自上而下，在合并前才会对子数组进行排序
 */
export default class Quick extends Example {
    public static sortSelf(list: Types.Param, lo: number, hi: number): void;
    public static sortSelf(list: Types.Param): void;
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
    public static partition(list: Types.Param, lo: number, hi: number) {
        let i = lo,
            j = hi + 1;
        let v = <any>list[lo];
        while (true) {
            while (this.less(<any>list[++i], v)) if (i == hi) break;
            while (this.less(v, <any>list[--j])) if (j == lo) break;
            if (i >= j) break;
            this.exch(list, i, j);
        }
        this.exch(list, lo, j);
        return j;
    }
}
