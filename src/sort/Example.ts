import { Comparable, Comparables, CompareTo } from "../interface";
import * as assert from "assert";

export default abstract class Example {
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
        this.show(sortedList);
        assert.ok(this.isSorted(sortedList));
    }
    protected static larg<T extends Comparable>(v: T, w: typeof v): boolean {
        return this.compareWith(v, w) === 1;
    }
    protected static less<T extends Comparable>(v: T, w: typeof v): boolean {
        return this.compareWith(v, w) === -1;
    }
    protected static equal<T extends Comparable>(v: T, w: typeof v): boolean {
        return this.compareWith(v, w) === 0;
    }
    private static compareWith<T extends Comparable>(v: T, w: typeof v): number {
        if (typeof v === "number" || typeof v === "string" || typeof v === "boolean") {
            return v < w ? -1 : v === w ? 0 : 1;
        } else {
            return (<CompareTo>v).compareTo(<CompareTo>w);
        }
    }
    protected static exch(list: Comparables, i: number, j: number) {
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    protected static show(list: Comparables) {
        console.log(this.name, list);
    }
}
