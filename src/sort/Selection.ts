import { Comparables } from "../interface";
import Example from "./index";
export default class Selection extends Example {
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
