import Comparable from "../utils/Comparable";
import * as assert from "assert";

export type Param = Comparable[] | number[];
export default abstract class Example {
    public static sortSelf(list: Param): void {
        throw new Error("sortSelf need overrid");
    }
    public static sort(list: Param): typeof list {
        let l = (<Array<any>>list).concat([]);
        this.sortSelf(l);
        return l;
    }
    public static isSorted(list: Param): boolean {
        for (let i = 1; i < list.length; i++) {
            if (this.less(<any>list[i], <any>list[i - 1])) return false;
        }
        return true;
    }
    public static test(list: any[]) {
        let sortedList = this.sort(list);
        assert.ok(this.isSorted(sortedList));
        this.show(sortedList);
    }
    protected static larg(v: Comparable, w: typeof v): boolean;
    protected static larg(v: number, w: typeof v): boolean;
    protected static larg(v, w) {
        return this.compareWith(v, w) === 1;
    }
    protected static less(v: Comparable, w: typeof v): boolean;
    protected static less(v: number, w: typeof v): boolean;
    protected static less(v, w) {
        return this.compareWith(v, w) === -1;
    }
    protected static equal(v: Comparable, w: typeof v): boolean;
    protected static equal(v: number, w: typeof v): boolean;
    protected static equal(v, w) {
        return this.compareWith(v, w) === 0;
    }
    protected static compareWith(v: Comparable | number, w: typeof v) {
        if (typeof v === "number") {
            return v < w ? -1 : v === w ? 0 : 1;
        } else {
            return v.compareTo(<Comparable>w);
        }
    }
    protected static exch(list: Param, i: number, j: number) {
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    protected static show(list: Param) {
        console.log(this.name, list);
    }
}
