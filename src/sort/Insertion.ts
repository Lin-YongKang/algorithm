import { Comparables } from "src/interface";
import Sorter from "./Sorter";
export default class Insertion extends Sorter {
    public static sortSelf(list: Comparables): void {
        let len = list.length;
        for (let i = 1; i < len; i++) {
            for (let j = i; j > 0 && this.less(list[j], list[j - 1]); j--) {
                this.exch(list, j, j - 1);
            }
        }
    }
}
