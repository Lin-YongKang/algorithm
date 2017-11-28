import { Comparable, Comparables, CompareTo } from "../interface";
export default abstract class Comparer {
    protected static larg<T extends Comparable>(v: T, w: typeof v): boolean {
        return this.compareWith(v, w) === 1;
    }
    protected static less<T extends Comparable>(v: T, w: typeof v): boolean {
        return this.compareWith(v, w) === -1;
    }
    protected static equal<T extends Comparable>(v: T, w: typeof v): boolean {
        return this.compareWith(v, w) === 0;
    }
    protected static compareWith<T extends Comparable>(v: T, w: typeof v): number {
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
}
