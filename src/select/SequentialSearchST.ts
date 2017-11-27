import ST from "./ST";
import Node from '../structure/Node';

export default class SequentialSearchST<K, V> extends ST<K, V>{
    private first: Node<K, V>;
    public get(key: K): V {
        for (let node of this) {
            if (key === node.key) return node.value;
        }
        return null;
    }
    public put(key: K, value: V): void {
        for (let node of this) {
            if (key === node.key) {
                node.value = value;
                return;
            }
        }
        this.first = new Node<K, V>(key, value, this.first);
    }
    public size(): number {
        return (<Array<K>>this.keys()).length;
    }
    public keys(): Iterable<K> {
        let keys = [];
        for (let node of this) {
            keys.push(node.key);
        }
        return keys;
    }
    [Symbol.iterator]() {
        let node = this.first;
        return {
            next() {
                if (node != null) {
                    let n = node;
                    node = node.next
                    return { done: false, value: n };
                }
                return { done: true, value: undefined };
            }
        }
    }
}