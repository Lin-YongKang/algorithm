import { AdjacencyList } from "src/utils/BasicSet";
import PGraph from "./PGraph";
import StdIn from "src/utils/StdIn";
export default class Graph<Item = number> extends PGraph<Item> {
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
        return this.adjList.size() / 2;
    }
    public addEdge(v: number, w: Item): void {
        this.adjList.add(v, w);
        this.adjList.add(<any>w, <any>v);
    }
    public adj(v: number) {
        return this.adjList.adj(v);
    }
}
