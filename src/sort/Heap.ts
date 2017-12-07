import { Comparables } from "src/interface";
import Sorter from "./Sorter";
export default class Heap extends Sorter {
    public static sortSelf(list: Comparables): void {
        let len = list.length;
        for (let k = Math.floor(len / 2); k >= 0; k--) {
            this.sink(list, k, len - 1);
        }
        len--;
        while (len > 0) {
            this.exch(list, 0, len--);
            this.sink(list, 0, len);
        }
    }
    private static sink(list: Comparables, lo: number, hi: number) {
        while (2 * lo + 1 <= hi) {
            let j = 2 * lo + 1;
            if (j < hi && this.less(list[j], list[j + 1])) j++; //取数组中索引j和j+1中较大值的索引
            if (this.larg(list[lo], list[j])) break; //如果比两个子节点还大那就有序化了
            this.exch(list, j, lo); //否则与较大值交换；
            lo = j;
        }
    }
}
