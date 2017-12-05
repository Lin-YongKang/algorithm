import { Comparables } from "src/interface";
import Sorter from "./Sorter";

export default class Shell extends Sorter {
    public static sortSelf(list: Comparables): void {
        let len = list.length;
        let h = 1;
        while (h < len / 3) h = 3 * h + 1;
        while (h >= 1) {
            for (let i = h; i < len; i++) {
                for (let j = i; j >= h && this.less(list[j], list[j - h]); j -= h) {
                    this.exch(list, j, j - h);
                }
            }
            h = parseInt(String(h / 3));
        }
    }
}
