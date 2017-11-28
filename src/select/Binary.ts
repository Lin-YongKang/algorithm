import { OrderedTableExample } from "./index";
import { Comparable } from "../interface";

export default class Binary<K extends Comparable, V> extends OrderedTableExample<K, V> {
    private ks: K[];
    private vs: V[];
    private get len() {
        return this.ks.length;
    }
    constructor() {
        super();
        this.ks = [];
        this.vs = [];
    }
    public get(key: K): V {
        if (this.isEmpty()) return null;
        let i = this.rank(key);
        if (i < this.len && Binary.equal(this.ks[i], key)) return this.vs[i];
        else return null;
    }
    public put(key: K, value: V): void {
        let i = this.rank(key);
        if (i < this.len && Binary.equal(this.ks[i], key)) {
            // 找到key就更新值
            this.vs[i] = value;
        } else {
            // 找不到就将i后的元素后移一位；
            for (let j = this.len; j > i; j--) {
                this.ks[j] = this.ks[j - 1];
                this.vs[j] = this.vs[j - 1];
            }
            this.ks[i] = key;
            this.vs[i] = value;
        }
    }
    public rank(key: K): number {
        let lo = 0, hi = this.len - 1;
        while (lo <= hi) {
            let mid = lo + Math.floor((hi - lo) / 2);
            let cmp = Binary.compareWith(key, this.ks[mid]);
            if (cmp < 0) hi = mid - 1;
            else if (cmp > 0) lo = mid + 1;
            else return mid;
        }
        return lo;
    }
    public delete(key: K) {
        let i = this.rank(key);
        if (i < this.len && Binary.equal(this.ks[i], key)) {
            // 找不到就将i后的元素后移一位；
            while (i < this.len - 1) {
                this.ks[i] = this.ks[i + 1];
                this.vs[i] = this.vs[i + 1];
                i++;
            }
            this.ks.pop();
            this.vs.pop();
        }
    }
    public min(): K {
        return this.ks[0];
    }
    public max(): K {
        return this.ks[this.len - 1];
    }
    public select(k: number): K {
        return this.ks[k];
    }
    public ceil(key: K): K {
        let i = this.rank(key);
        return this.ks[i];
    }
    public floor(key: K): K {
        let i = this.rank(key);
        let cmp = Binary.compareWith(key, this.ks[i]);
        if (i === 0 && cmp < 0) return null;
        else if (i > 0 && cmp < 0) return this.ks[i - 1];
        else if (cmp === 0) return key;
    }

    public keys(lo?: K, hi?: K): Iterable<K> {
        if (lo === undefined) return super.keys();
        let list: K[] = [];
        for (let i = this.rank(lo), max = this.rank(hi); i < max; i++) {
            list.push(this.ks[i]);
        }
        if (this.contains(hi)) list.push(this.ks[this.rank(hi)]);
        return list;
    }
    public size(lo?: K, hi?: K): number {
        if (lo !== undefined) {
            return super.size(lo, hi);
        } else {
            return this.len;
        }
    }
}