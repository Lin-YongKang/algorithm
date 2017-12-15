import EdgeWeightedGraph from "src/graph/structure/EdgeWeightedGraph";
import { Queue, MinPQ } from "utils/BasicSet";
import { Edge } from "src/graph/structure/EdgeWeightedGraph";
export class LazyPrimMST {
    private marked: boolean[];
    private mst: Queue<Edge>;
    private pq: MinPQ<Edge>;
    constructor(G: EdgeWeightedGraph) {
        this.pq = new MinPQ();
        this.marked = new Array(G.V());
        this.mst = new Queue();

        this.visit(G, 0);
        while (!this.pq.isEmpty()) {
            let e = this.pq.delMin();

            let v = e.either(),
                w = e.other(v);
            if (this.marked[v] && this.marked[w]) continue;
            this.mst.enqueue(e);
            if (!this.marked[v]) this.visit(G, v);
            if (!this.marked[w]) this.visit(G, w);
        }
    }
    private visit(G: EdgeWeightedGraph, v: number): void {
        this.marked[v] = true;
        for (let e of G.adj(v)) {
            if (!this.marked[e.other(v)]) this.pq.insert(e);
        }
    }
    public edges(): Iterable<Edge> {
        return this.mst;
    }
    public weight() : number{
        let es = this.edges();
        let w = 0;
        for()
    }
}
