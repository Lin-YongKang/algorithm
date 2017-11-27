export default class Node<K, V>{
    constructor(key: K, value: V, next: Node<K, V>) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
    public key: K;
    public value: V;
    public next: Node<K, V>;
}