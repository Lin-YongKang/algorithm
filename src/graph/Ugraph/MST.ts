import EdgeWeightedGraph from "src/graph/structure/EdgeWeightedGraph";
import { Queue, MinPQ, IndexMinPQ, Bag } from "utils/BasicSet";
import { Edge } from "src/graph/structure/EdgeWeightedGraph";
import UF from "./UF";
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

    public weight(): number {
        let es = this.edges();
        let weight: number = 0;
        for (let e of es) {
            weight += e.weight();
        }
        return weight;
    }
}

export class PrimMst {
    private edgeTo: Edge[];
    private distTo: number[];
    private marked: boolean[];
    private pq: IndexMinPQ<number>;
    constructor(G: EdgeWeightedGraph) {
        let al = { length: G.V() };
        this.edgeTo = Array.from(al);
        this.distTo = Array.from(al, () => 0);
        this.marked = Array.from(al, () => false);

        this.pq = new IndexMinPQ();

        this.distTo[0] = 0;
        this.pq.insert(0, 0);
        while (!this.pq.isEmpty()) {
            this.visit(G, this.pq.delMin());
        }
    }
    private visit(G: EdgeWeightedGraph, v: number): void {
        this.marked[v] = true;
        for (let e of G.adj(v)) {
            let w = e.other(v);
            if (this.marked[w]) continue;
            if (e.weight() < this.distTo[w]) {
                this.edgeTo[w] = e;
                this.distTo[w] = e.weight();
                if (this.pq.contains(w)) this.pq.change(w, this.distTo[w]);
                else this.pq.insert(w, this.distTo[w]);
            }
        }
    }
    public edges(): Iterable<Edge> {
        let mst = new Bag<Edge>();
        for (let v = 1; v < this.edgeTo.length; v++) {
            mst.add(this.edgeTo[v]);
        }
        return mst;
    }
    public weight(): number {
        let weight = 0;
        for (let e of this.edges()) {
            weight += e.weight();
        }
        return weight;
    }
}
