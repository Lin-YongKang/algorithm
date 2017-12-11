import Sequential from "./Sequential";
import { DisorderedTableSelecter } from "src/select";

export default class SeparateChainingHash<Key, Value> extends DisorderedTableSelecter<Key, Value> {
    private N: number = 0;
    private M: number = 0;
    private st: Sequential<Key, Value>[] = null;
    constructor();
    constructor(M: number);
    constructor(M?: number) {
        super();
        if (M === undefined) M = 997;
        this.M = M;
        this.st = Array.from({ length: M }, () => new Sequential());
    }
    private hash(key: Key): number {
        return 1;
    }
    public get(key: Key): Value {
        return this.st[this.hash(key)].get(key);
    }
    public put(key: Key, val: Value): void {
        this.N++;
        this.st[this.hash(key)].put(key, val);
    }
    public delete(key: Key): void {
        this.N--;
        this.st[this.hash(key)].delete(key);
    }
    public size(): number {
        return this.N;
    }
    public contains(key: Key): boolean {
        return this.st[this.hash(key)].contains(key);
    }
    public keys(): Iterable<Key> {
        let keys: Key[] = [];
        this.st.forEach(sequential => {
            for (let node of sequential) {
                keys.push(node.key);
            }
        });
        return keys;
    }
}
