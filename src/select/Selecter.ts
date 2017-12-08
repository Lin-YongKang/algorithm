import Comparer from "src/interface/Comparer";
import { Comparable } from "interface";

abstract class Selecter<K, V> extends Comparer {
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

export abstract class DisorderedTableSelecter<K, V> extends Selecter<K, V> {}

export abstract class OrderedTableSelecter<K extends Comparable, V> extends Selecter<K, V> {
    /**
     * 最小的key
     */
    abstract min(): K;
    /**
     * 最大的key
     */
    abstract max(): K;
    /**
     * 小于等于{@code key}的最大值
     * @param key
     */
    abstract floor(key: K): K;
    /**
     * 大于等于{@code key}的最小值
     * @param key
     */
    abstract ceil(key: K): K;
    /**
     * 小于{@code key}的数量
     * @param key
     *
     */
    abstract rank(key: K): number;
    /**
     * 排名为{@code k}的key
     */
    abstract select(k: number): K;
    /**
     * 删除最小的键
     */
    public deleteMin(): void {
        this.delete(this.min());
    }
    /**
     * 删除最大的键
     */
    public deleteMax(): void {
        this.delete(this.max());
    }
    public size(): number;
    public size<T extends K>(lo: T, hi: T): number;
    public size(lo?: K, hi?: K): number {
        if (lo !== undefined) {
            if (!OrderedTableSelecter.less(lo, hi)) {
                return 0;
            } else if (this.contains(hi)) {
                return this.rank(hi) - this.rank(lo) - 1;
            } else {
                return this.rank(hi) - this.rank(lo);
            }
        }
    }
    public keys(): Iterable<K>;
    public keys(lo: K, hi: K): Iterable<K>;
    public keys(lo?: K, hi?: K): Iterable<K> {
        if (lo === undefined) return this.keys(this.min(), this.max());
    }
}
