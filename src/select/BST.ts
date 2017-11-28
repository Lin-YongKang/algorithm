import ST from "./ST";
import Comparable from "../interface/Comparable";
class Node<K, V> {
    public key: K;
    public value: V;
    public left: this;
    public right: this;
    get count(): number {
        return this.left.count + this.right.count;
    }
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}
export default class BST<K extends Comparable, V> extends ST<K, V> {
    private root: Node<K, V>;
    public size(): number;
    public size(node: Node<K, V>): number;
    public size(node?: Node<K, V>) {
        if (node === undefined) {
            return this.size(this.root);
        } else {
            return node === null ? 0 : node.count;
        }
    }
    public get(key: K): V;
    public get(node: Node<K, V>, key: K): V;
    public get(node: Node<K, V> | K, key?: K) {
        if (key === undefined) key = <K>node;
        if (node === null) return null;
        if (node instanceof Node) {
            let cmp = (<K>key).compareTo(node.key);
            if (cmp < 0) return this.get(node.left, key);
            else if (cmp > 0) return this.get(node.right, key);
            else return node.value;
        } else {
            this.get(this.root, key);
        }
    }
    public put(key: K, value: V): Node<K, V>;
    public put(node: Node<K, V>, key: K, value: V): Node<K, V>;
    public put(node: Node<K, V> | K, key: K | V, value?: V) {
        if (value === undefined) {
            value = <V>key;
            key = <K>node;
        }

        if (node === null) return new Node(key, value);
        node = <Node<K, V>>node;
        let cmp = (<Comparable>key).compareTo(node.key);
        if (cmp < 0) node.left = this.put(node.left, <K>key, value);
        else if (cmp > 0) node.right = this.put(node.right, <K>key, value);
        else node.value = value;
        return node;
    }
    public keys(): Iterable<K>;
    public keys(lo: K, hi: K): Iterable<K>;
    public keys(node: Node<K, V>, quene: Array<K>, lo: K, hi: K): Iterable<K>;
    public keys(node?: Node<K, V> | K | undefined, quene?: Array<K> | K | undefined, lo?: K, hi?: K) {
        if (node === undefined) {
            return this.keys();
        }
        return [];
    }
}
