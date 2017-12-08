import { OrderedTableSelecter } from "./index";
import { Comparable } from "src/interface";

enum COLOR {
    RED,
    BLACK
}

class Node<Key, Value> {
    public key: Key;
    public val: Value;
    public N: number;
    public color: COLOR;
    public right: Node<Key, Value> = null;
    public left: Node<Key, Value> = null;
    constructor(key: Key, val: Value, N: number, color: COLOR) {
        this.key = key;
        this.val = val;
        this.N = N;
        this.color = color;
    }
}
export default class RedBlackBST<Key extends Comparable, Value> extends OrderedTableSelecter<Key, Value> {
    private root: Node<Key, Value> = null;
    private _balance(h: Node<Key, Value>): Node<Key, Value> {
        if (this.isRed(h.right)) h = this.rotateLeft(h);
        // 红黑树在二叉树上新增的操作，保持叶节点的黑高度一致
        if (this.isRed(h.right) && !this.isRed(h.left)) h = this.rotateLeft(h);
        if (this.isRed(h.left) && this.isRed(h.left.left)) h = this.rotateRight(h);
        if (this.isRed(h.left) && this.isRed(h.right)) this.flipColors(h);

        h.N = this.size(h.left) + this.size(h.right) + 1;
        return h;
    }
    private moveRedLeft(h: Node<Key, Value>): Node<Key, Value> {
        this.flipColors(h);
        if (this.isRed(h.right.left)) {
            h.right = this.rotateRight(h.right);
            h = this.rotateLeft(h);
        }
        return h;
    }
    private moveRedRight(h: Node<Key, Value>): Node<Key, Value> {
        this.flipColors(h);
        if (!this.isRed(h.left.left)) {
            h = this.rotateRight(h);
        }
        return h;
    }
    public deleteMin(): void {
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
            this.root.color = COLOR.RED;
        }
        this.root = this._deleteMin(this.root);
        if (!this.isEmpty()) this.root.color = COLOR.BLACK;
    }
    private _deleteMin(h: Node<Key, Value>): typeof h {
        if (h.left === null) {
            return null;
        }
        if (!this.isRed(h.left) && !this.isRed(h.left.left)) {
            h = this.moveRedLeft(h);
        }
        h.left = this._deleteMin(h.left);
        return this._balance(h);
    }

    public deleteMax(): void {
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
            this.root.color = COLOR.RED;
        }
        this.root = this._deleteMax(this.root);
        if (!this.isEmpty()) this.root.color = COLOR.BLACK;
    }
    private _deleteMax(h: Node<Key, Value>): typeof h {
        if (this.isRed(h.left)) h = this.rotateRight(h);
        if (h.right === null) return null;
        if (!this.isRed(h.right) && !this.isRed(h.right.left)) h = this.moveRedRight(h);
        h.right = this._deleteMin(h.right);
        return this._balance(h);
    }

    public delete(key: Key): void {
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) this.root.color = COLOR.RED;
        this.root = this._delete(this.root, key);
        if (!this.isEmpty()) this.root.color = COLOR.BLACK;
    }
    private _delete(h: Node<Key, Value>, key: Key): typeof h {
        if (RedBlackBST.compareWith(key, h.key) < 0) {
            if (!this.isRed(h.left) && !this.isRed(h.left.left)) h = this.moveRedLeft(h);
            h.left = this._delete(h.left, key);
        } else {
            if (this.isRed(h.left)) h = this.rotateRight(h);
            if (RedBlackBST.equal(key, h.key) && h.right === null) return null;
            if (!this.isRed(h.right) && !this.isRed(h.right.left)) h = this.moveRedRight(h);
            if (RedBlackBST.equal(key, h.key)) {
                h.val = this._get(h.right, this._min(h.right).key);
                h.key = this._min(h.right).key;
                h.right = this._deleteMin(h.right);
            } else {
                h.right = this._delete(h.right, key);
            }
        }
        return this._balance(h);
    }

    public get(key: Key): Value {
        return this._get(this.root, key);
    }
    private _get(node: Node<Key, Value>, key: Key): Value {
        if (node === null) return null;
        let cmp = RedBlackBST.compareWith(key, node.key);
        if (cmp < 0) return this._get(node.left, key);
        else if (cmp > 0) return this._get(node.right, key);
        else return node.val;
    }
    public put(key: Key, value: Value) {
        this.root = this._put(this.root, key, value);
        this.root.color = COLOR.BLACK;
    }
    private _put(h: Node<Key, Value>, key: Key, value: Value) {
        if (h === null) return new Node(key, value, 1, COLOR.RED);
        let cmp = RedBlackBST.compareWith(key, h.key);
        if (cmp < 0) h.left = this._put(h.left, key, value);
        else if (cmp > 0) h.right = this._put(h.right, key, value);
        else h.val = value;

        // 红黑树在二叉树上新增的操作，保持叶节点的黑高度一致
        if (this.isRed(h.right) && !this.isRed(h.left)) h = this.rotateLeft(h);
        if (this.isRed(h.left) && this.isRed(h.left.left)) h = this.rotateRight(h);
        if (this.isRed(h.left) && this.isRed(h.right)) this.flipColors(h);

        h.N = this.size(h.left) + this.size(h.right) + 1;
        return h;
    }
    public min(): Key {
        return this._min(this.root).key;
    }
    private _min(node: Node<Key, Value>): typeof node {
        if (node.left === null) return node;
        else return this._min(node.left);
    }

    public max(): Key {
        return this._max(this.root).key;
    }
    private _max(node: Node<Key, Value>): typeof node {
        if (node.right === null) return node;
        else return this._max(node.right);
    }

    public floor(key: Key): Key {
        let node = this._floor(this.root, key);
        if (node === null) return null;
        return node.key;
    }
    private _floor(node: Node<Key, Value>, key: Key): typeof node {
        if (node === null) return null;
        let cmp = RedBlackBST.compareWith(key, node.key);
        if (cmp === 0) return node;
        if (cmp < 0) return this._floor(node.left, key);
        let t = this._floor(node.right, key);
        if (t !== null) return t;
        else return node;
    }

    public ceil(key: Key): Key {
        let node = this._ceil(this.root, key);
        if (node === null) return null;
        return node.key;
    }
    private _ceil(node: Node<Key, Value>, key: Key): typeof node {
        if (node === null) return null;
        let cmp = RedBlackBST.compareWith(key, node.key);
        if (cmp === 0) return node;
        if (cmp > 0) return this._ceil(node.right, key);
        let t = this._ceil(node.left, key);
        if (t !== null) return t;
        else return node;
    }

    public select(k: number): Key {
        return this._select(this.root, k).key;
    }
    private _select(node: Node<Key, Value>, k: number): typeof node {
        if (node === null) return null;
        let t = this._size(node.left);
        if (t > k) return this._select(node.left, k);
        else if (t < k) return this._select(node.right, k - t - 1);
        else return node;
    }

    public rank(key: Key): number {
        return this._rank(this.root, key);
    }
    private _rank(node: Node<Key, Value>, key: Key): number {
        if (node === null) return 0;
        let cmp = RedBlackBST.compareWith(key, node.key);
        if (cmp < 0) return this._rank(node.left, key);
        else if (cmp > 0) return 1 + this._size(node.left) + this._rank(node.right, key);
        else return this._size(node.left);
    }
    private isRed(x: Node<Key, Value>): boolean {
        if (x === null) return false;
        return x.color === COLOR.RED;
    }
    // h为2-3节点的根节点
    private rotateLeft(h: Node<Key, Value>): Node<Key, Value> {
        let x = h.right;
        h.right = x.left;
        x.left = h;
        x.color = h.color;
        h.color = COLOR.RED;
        x.N = h.N;
        h.N = 1 + this.size(h.left) + this.size(h.right);
        return x;
    }

    private rotateRight(h: Node<Key, Value>): Node<Key, Value> {
        let x = h.left;
        h.left = x.right;
        x.right = h;
        x.color = h.color;
        h.color = COLOR.RED;
        x.N = h.N;
        h.N = 1 + this.size(h.left) + this.size(h.right);
        return x;
    }

    private flipColors(h: Node<Key, Value>): void {
        h.color = COLOR.RED;
        h.left.color = h.right.color = COLOR.BLACK;
    }
    public size(lo?: Key | Node<Key, Value>, hi?: Key): number {
        if (lo === undefined) {
            return this._size(this.root);
        } else if (lo instanceof Node) {
            return this._size(lo);
        } else if (lo === null) {
            return this._size(null);
        } else {
            return super.size(lo, hi);
        }
    }
    private _size(node: Node<Key, Value>): number {
        if (node === null) return 0;
        else return node.N;
    }
    public keys(lo?: Key, hi?: Key): Iterable<Key> {
        if (lo === undefined) return super.keys();
        let queue: Key[] = [];
        this._keys(this.root, queue, lo, hi);
        return queue;
    }
    private _keys(node: Node<Key, Value>, queue: Key[], lo: Key, hi: Key): void {
        if (node === null) return;
        let cmplo = RedBlackBST.compareWith(lo, node.key);
        let cmphi = RedBlackBST.compareWith(hi, node.key);
        if (cmplo < 0) this._keys(node.left, queue, lo, hi);
        if (cmplo <= 0 && cmphi >= 0) queue.push(node.key);
        if (cmphi > 0) this._keys(node.right, queue, lo, hi);
    }
}
