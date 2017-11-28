import * as readline from "readline";
import * as fs from "fs";
import Comparer from "../interface/Comparer";
import { Comparable } from "interface";
export abstract class DisorderedTableExample<K, V> extends Comparer {
    public static test() {
        interface That extends DisorderedTableExample<any, any> {}
        let That = <any>this;
        let target: That = new That();
        let rl = readline.createInterface(fs.createReadStream("../../data/leipzig300k.txt"));
        rl.on("line", line => {});
    }
    abstract put(key: K, value: V): void;
    abstract get(key: K): V;
    abstract size(): number;
    abstract keys(): Iterable<K>;
    public delete(key: K): void {
        this.put(key, null);
    }
    public contains(key: K): boolean {
        return this.get(key) !== null;
    }
    public isEmpty(): boolean {
        return this.size() === 0;
    }
}

export abstract class OrderedTableExample<K extends Comparable, V> extends DisorderedTableExample<K, V> {
    abstract min(): K;
    abstract max(): K;
    abstract floor(): K;
    abstract ceil(): K;
    abstract rank(key: K): number;
    abstract select(k: number): K;
    public deleteMin(): void {
        this.delete(this.min());
    }
    public deleteMax(): void {
        this.delete(this.max());
    }
    public size(): number;
    public size<T extends K>(lo: T, hi: T): number;
    public size(lo?: K, hi?: K): number {
        if (lo !== undefined) {
            if (!OrderedTableExample.less(lo, hi)) {
                return 0;
            } else if (this.contains(hi)) {
                return this.rank(hi) - this.rank(lo) - 1;
            } else {
                return this.rank(hi) - this.rank(lo);
            }
        } else if (lo === undefined) {
            return this.size(this.min(), this.max());
        }
    }
    abstract keys(): Iterable<K>;
    abstract keys(lo: K, hi: K): Iterable<K>;
}
