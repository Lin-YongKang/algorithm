
class Node<T>{
    public item: T;
    public next: Node<T>;
    constructor() {
        this.item = null;
        this.next = null;
    }
}

export default class Bag<Item> implements Iterable<Item>{
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
                    node = node.next
                    return { done: false, value: n.item };
                }
                return { done: true, value: undefined };
            }
        }
    }
}