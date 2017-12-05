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
