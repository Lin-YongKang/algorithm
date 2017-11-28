import { Comparables } from "../interface";
import * as assert from "assert";
import Comparer from "../interface/Comparer";
export default abstract class Example extends Comparer {
    public static sortSelf(list: Comparables): void {
        throw new Error("sortSelf need overrid");
    }
    public static sort(list: Comparables): typeof list {
        let l = (<any[]>list).concat([]);
        this.sortSelf(l);
        return l;
    }
    public static isSorted(list: Comparables): boolean {
        for (let i = 1; i < list.length; i++) {
            if (this.less(list[i], list[i - 1])) return false;
        }
        return true;
    }
    public static test(list: any[]) {
        let sortedList = this.sort(list);
        console.log(sortedList);
        assert.ok(this.isSorted(sortedList));
    }
}
