import { AdjacencyList } from "src/utils/BasicSet";
import PGraph from "./PGraph";
import StdIn from "src/utils/StdIn";
export default class Digraph<Item = number> extends PGraph<Item> {
    private adjList: AdjacencyList<Item>;
    constructor(v: number | StdIn) {
        super();
        if (typeof v === "number") {
            this.adjList = new AdjacencyList(v);
        } else if (v instanceof StdIn) {
            this.adjList = new AdjacencyList(v.readInt());
            v.readInt();
            while (!v.isEmpty()) {
                this.addEdge(v.readInt(), <any>v.readInt());
            }
        }
    }
    public V(): number {
        return this.adjList.length;
    }
    public E(): number {
        return this.adjList.size();
    }
    public addEdge(v: number, w: Item): void {
        this.adjList.add(v, w);
    }
    public adj(v: number) {
        return this.adjList.adj(v);
    }
    public reverse(): Digraph {
        let r = new Digraph(this.V());
        for (let v = 0, len = this.V(); v < len; v++) {
            for (let w of this.adj(v)) {
                r.addEdge(<any>w, v);
            }
        }
        return r;
    }
}
