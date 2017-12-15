import { Comparable } from "src/interface";
import Comparer from "src/interface/Comparer";

export class MinPQ<Key extends Comparable> extends Comparer {
    private pq: Key[];
    private N: number = 0;
    constructor() {
        super();
        this.pq = new Array();
    }
    // 上浮
    private swim(n: number): void {
        while (n > 1) {
            let i = Math.floor(n / 2);
            if (MaxPQ.larg(this.pq[n], this.pq[i])) break;
            MaxPQ.exch(<any>this.pq, i, n);
            n = i;
        }
    }
    // 下沉
    private sink(n: number): void {
        while (2 * n <= this.N) {
            let j = 2 * n;
            if (j < this.N && MaxPQ.larg(this.pq[j], this.pq[j + 1])) j++; //取数组中索引j和j+1中较小值的索引
            if (MaxPQ.less(this.pq[n], this.pq[j])) break; //如果比两个子节点还小那就有序化了
            MaxPQ.exch(<any>this.pq, j, n); //否则与较小值交换；
            n = j;
        }
    }
    public insert(key: Key): void {
        this.pq[++this.N] = key; //在数组最后插入新值
        this.swim(this.N);
    }
    public min(): Key {
        return this.pq[1];
    }
    public delMin(): Key {
        let min = this.min();
        MaxPQ.exch(<any>this.pq, 1, this.N--); //交换第一个值和最后一个值
        this.pq[this.N + 1] = null;
        this.sink(1);
        return min;
    }
    public isEmpty(): boolean {
        return this.size() === 0;
    }
    public size(): number {
        return this.N;
    }
}

export class MaxPQ<Key extends Comparable> extends Comparer {
    private pq: Key[];
    private N: number = 0;
    constructor() {
        super();
        this.pq = new Array();
    }
    private swim(n: number): void {
        while (n > 1) {
            let i = Math.floor(n / 2);
            if (MaxPQ.less(this.pq[n], this.pq[i])) break;
            MaxPQ.exch(<any>this.pq, i, n);
            n = i;
        }
    }
    private sink(n: number): void {
        while (2 * n <= this.N) {
            let j = 2 * n;
            if (j < this.N && MaxPQ.less(this.pq[j], this.pq[j + 1])) j++; //取数组中索引j和j+1中较大值的索引
            if (MaxPQ.larg(this.pq[n], this.pq[j])) break; //如果比两个子节点还大那就有序化了
            MaxPQ.exch(<any>this.pq, j, n); //否则与较大值交换；
            n = j;
        }
    }
    public insert(key: Key): void {
        this.pq[++this.N] = key; //在数组最后插入新值
        this.swim(this.N);
    }
    public max(): Key {
        return this.pq[1];
    }
    public delMax(): Key {
        let max = this.max();
        MaxPQ.exch(<any>this.pq, 1, this.N--); //交换第一个值和最后一个值
        this.pq[this.N + 1] = null;
        this.sink(1);
        return max;
    }
    public isEmpty(): boolean {
        return this.size() === 0;
    }
    public size(): number {
        return this.N;
    }
}

export class IndexMaxPQ<Item> extends Comparer {
    private maxPQ: MaxPQ<number>;
    private list: Item[];
    constructor() {
        super();
        this.list = new Array();
        this.maxPQ = new MaxPQ();
    }
    public insert(k: number, item: Item): void {
        this.list[k] = item;
        this.maxPQ.insert(k);
    }
    public change(k: number, item: Item): void {
        this.list[k] = item;
    }
    public contains(k: number): boolean {
        return this.list[k] !== undefined;
    }
    public max(): Item {
        return this.list[this.maxIndex()];
    }
    public maxIndex(): number {
        return this.maxPQ.max();
    }
    public delMax(): Item {
        let max = this.max();
        this.list[this.maxPQ.delMax()] = undefined;
        return max;
    }
    public isEmpty(): boolean {
        return this.maxPQ.isEmpty();
    }
    public size(): number {
        return this.maxPQ.size();
    }
}

class Node<T> {
    public item: T;
    public next: Node<T>;
    constructor() {
        this.item = null;
        this.next = null;
    }
}

export class Bag<Item> implements Iterable<Item> {
    private first: Node<Item>;
    private length: number;
    constructor() {
        this.first = null;
        this.length = 0;
    }
    public add(item: Item): void {
        let node = new Node<Item>();
        node.item = item;
        node.next = this.first;
        this.first = node;
        this.length++;
    }
    public isEmpty(): boolean {
        return this.size() === 0;
    }
    public size(): number {
        return this.length;
    }
    [Symbol.iterator]() {
        let node = this.first;
        return {
            next() {
                if (node != null) {
                    let n = node;
                    node = node.next;
                    return { done: false, value: n.item };
                }
                return { done: true, value: undefined };
            }
        };
    }
}

export class Stack<Item> implements Iterable<Item> {
    private first: Node<Item>;
    private length: number;
    constructor() {
        this.first = null;
        this.length = 0;
    }
    public push(item: Item): void {
        let node = new Node<Item>();
        node.item = item;
        node.next = this.first;
        this.first = node;
        this.length++;
    }
    public pop(): Item {
        let first = this.first;
        this.first = first.next;
        this.length--;
        return first.item;
    }
    public isEmpty(): boolean {
        return this.size() === 0;
    }
    public size(): number {
        return this.length;
    }
    [Symbol.iterator]() {
        let node = this.first;
        return {
            next() {
                if (node != null) {
                    let n = node;
                    node = node.next;
                    return { done: false, value: n.item };
                }
                return { done: true, value: undefined };
            }
        };
    }
}

export class Queue<Item> implements Iterable<Item> {
    private first: Node<Item>;
    private last: Node<Item>;
    private length: number;
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }
    public enqueue(item: Item): void {
        let oldLast = this.last;
        this.last = new Node<Item>();
        this.last.item = item;
        this.last.next = null;
        if (this.isEmpty()) this.first = this.last;
        else oldLast.next = this.last;
        this.length++;
    }
    public dequeue(): Item {
        let first = this.first;
        this.first = first.next;
        if (this.isEmpty()) this.last = null;
        this.length--;
        return first.item;
    }
    public isEmpty(): boolean {
        return this.size() === 0;
    }
    public size(): number {
        return this.length;
    }
    [Symbol.iterator]() {
        let node = this.first;
        return {
            next() {
                if (node != null) {
                    let n = node;
                    node = node.next;
                    return { done: false, value: n.item };
                }
                return { done: true, value: undefined };
            }
        };
    }
}

export class AdjacencyList<Item> implements Iterable<Item> {
    private list: Bag<Item>[];
    private N: number = 0;
    public length: number = 0;
    constructor(len: number) {
        this.list = Array.from({ length: len }, () => new Bag<Item>());
        this.length = len;
    }
    public add(n: number, item: Item): void {
        this.N++;
        this.list[n].add(item);
    }
    public adj(n: number): Bag<Item> {
        return this.list[n];
    }
    /**
     * 返回邻接表存储的所有元素数量
     */
    public size(): number;
    /**
     *
     * @param n 返回索引n中的元素数量
     */
    public size(n: number): number;
    public size(n?: number) {
        return n === undefined ? this.N : this.list[n].size();
    }
    public isEmpty(): boolean {
        return this.size() === 0;
    }
    [Symbol.iterator]() {
        let items: Item[] = [];
        this.list.forEach(bag => {
            for (let item of bag) {
                items.push(item);
            }
        });
        let n = 0,
            len = items.length;
        return {
            next() {
                if (n < len) return { done: false, value: items[n++] };
                return { done: true, value: undefined };
            }
        };
    }
}
