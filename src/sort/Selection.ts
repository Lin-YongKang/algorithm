import { Comparables } from "src/interface";
import Sorter from "./Sorter";
export default class Selection extends Sorter {
    public static sortSelf(list: Comparables): void {
        let len = list.length;
        for (let i = 0; i < len; i++) {
            let min = i;
            for (let j = i + 1; j < len; j++) {
                if (this.less(list[j], list[min])) min = j;
            }
            this.exch(list, min, i);
        }
    }
}
