import Node from "src/interface/Node";
import { OrderedTableSelecter } from "./index";
import { Comparable } from "src/interface";

class BNode<K, V> extends Node<K, V> {
    public left: BNode<K, V>;
    public right: BNode<K, V>;
    public len: number;
    constructor(key: K, value: V, len: number) {
        super(key, value, null);
        this.len = len;
        this.left = null;
        this.right = null;
    }
}

export default class BST<K extends Comparable, V> extends OrderedTableSelecter<K, V> {
    private root: BNode<K, V>;
    constructor() {
        super();
        this.root = null;
    }
    public get(key: K): V {
        return this._get(this.root, key);
    }
    private _get(node: BNode<K, V>, key: K): V {
        if (node === null) return null;
        let cmp = BST.compareWith(key, node.key);
        if (cmp < 0) return this._get(node.left, key);
        else if (cmp > 0) return this._get(node.right, key);
        else return node.value;
    }

    public put(key: K, value: V): void {
        this.root = this._put(this.root, key, value);
    }
    private _put(node: BNode<K, V>, key: K, value: V): typeof node {
        if (node === null) return new BNode(key, value, 1);
        let cmp = BST.compareWith(key, node.key);
        if (cmp < 0) node.left = this._put(node.left, key, value);
        else if (cmp > 0) node.right = this._put(node.right, key, value);
        else node.value = value;
        node.len = this._size(node.left) + this._size(node.right) + 1;
        return node;
    }

    public size(lo?: K, hi?: K): number {
        if (lo === undefined) {
            return this._size(this.root);
        } else {
            return super.size(lo, hi);
        }
    }
    private _size(node: BNode<K, V>): number {
        if (node === null) return 0;
        else return node.len;
    }

    public min(): K {
        return this._min(this.root).key;
    }
    private _min(node: BNode<K, V>): typeof node {
        if (node.left === null) return node;
        else return this._min(node.left);
    }

    public max(): K {
        return this._max(this.root).key;
    }
    private _max(node: BNode<K, V>): typeof node {
        if (node.right === null) return node;
        else return this._max(node.right);
    }

    public floor(key: K): K {
        let node = this._floor(this.root, key);
        if (node === null) return null;
        return node.key;
    }
    private _floor(node: BNode<K, V>, key: K): typeof node {
        if (node === null) return null;
        let cmp = BST.compareWith(key, node.key);
        if (cmp === 0) return node;
        if (cmp < 0) return this._floor(node.left, key);
        let t = this._floor(node.right, key);
        if (t !== null) return t;
        else return node;
    }

    public ceil(key: K): K {
        let node = this._ceil(this.root, key);
        if (node === null) return null;
        return node.key;
    }
    private _ceil(node: BNode<K, V>, key: K): typeof node {
        if (node === null) return null;
        let cmp = BST.compareWith(key, node.key);
        if (cmp === 0) return node;
        if (cmp > 0) return this._ceil(node.right, key);
        let t = this._ceil(node.left, key);
        if (t !== null) return t;
        else return node;
    }

    public select(k: number): K {
        return this._select(this.root, k).key;
    }
    private _select(node: BNode<K, V>, k: number): typeof node {
        if (node === null) return null;
        let t = this._size(node.left);
        if (t > k) return this._select(node.left, k);
        else if (t < k) return this._select(node.right, k - t - 1);
        else return node;
    }

    public rank(key: K): number {
        return this._rank(this.root, key);
    }
    private _rank(node: BNode<K, V>, key: K): number {
        if (node === null) return 0;
        let cmp = BST.compareWith(key, node.key);
        if (cmp < 0) return this._rank(node.left, key);
        else if (cmp > 0) return 1 + this._size(node.left) + this._rank(node.right, key);
        else return this._size(node.left);
    }

    public deleteMin(): void {
        this.root = this._deleteMin(this.root);
    }
    private _deleteMin(node: BNode<K, V>): typeof node {
        if (node.left === null) return node.right;
        node.left = this._deleteMin(node.left);
        node.len = this._size(node.left) + this._size(node.right) + 1;
        return node;
    }

    public deleteMax(): void {
        this.root = this._deleteMax(this.root);
    }
    private _deleteMax(node: BNode<K, V>): typeof node {
        if (node.right === null) return node.left;
        node.right = this._deleteMax(node.right);
        node.len = this._size(node.left) + this._size(node.right) + 1;
        return node;
    }

    public delete(key: K): void {
        this.root = this._delete(this.root, key);
    }
    private _delete(node: BNode<K, V>, key: K): typeof node {
        if (node === null) return null;
        let cmp = BST.compareWith(key, node.key);
        if (cmp < 0) node.left = this._delete(node.left, key);
        else if (cmp > 0) node.right = this._delete(node.right, key);
        else {
            if (node.right === null) return node.left;
            if (node.left === null) return node.right;
            let t = node;
            node = this._min(t.right);
            node.right = this._deleteMin(t.right);
            node.right = t.left;
        }
        node.len = this._size(node.left) + this._size(node.right) + 1;
        return node;
    }

    public keys(lo?: K, hi?: K): Iterable<K> {
        if (lo === undefined) return super.keys();
        let queue: K[] = [];
        this._keys(this.root, queue, lo, hi);
        return queue;
    }
    private _keys(node: BNode<K, V>, queue: K[], lo: K, hi: K): void {
        if (node === null) return;
        let cmplo = BST.compareWith(lo, node.key);
        let cmphi = BST.compareWith(hi, node.key);
        if (cmplo < 0) this._keys(node.left, queue, lo, hi);
        if (cmplo <= 0 && cmphi >= 0) queue.push(node.key);
        if (cmphi > 0) this._keys(node.right, queue, lo, hi);
    }
}
