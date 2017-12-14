import { CompareTo } from "src/interface";
import PGraph from "./PGraph";
import { AdjacencyList } from "src/utils/BasicSet";
import StdIn from "src/utils/StdIn";
export class Edge implements CompareTo {
    private readonly _v: number;
    private readonly _w: number;
    private readonly _weight: number;
    constructor(v: number, w: number, weight: number) {
        this._v = v;
        this._w = w;
        this._weight = weight;
    }
    public weight(): number {
        return this._weight;
    }
    public either(): number {
        return this._v;
    }
    public other(v: number): number {
        if (v === this._v) return this._w;
        else if (v === this._w) return this._v;
        else throw new Error("Inconsistent edge");
    }
    public compareTo(that: Edge): number {
        if (this.weight() < that.weight()) return -1;
        else if (this.weight() > that.weight()) return 1;
        return 0;
    }
    public toString(): string {
        return `${this._v}-${this._w} ${this._weight}`;
    }
}

export default class EdgeWeightedGraph extends PGraph<Edge> {
    private adjList: AdjacencyList<Edge>;
    constructor(v: number | StdIn) {
        super();
        if (typeof v === "number") {
            this.adjList = new AdjacencyList(v);
        } else if (v instanceof StdIn) {
            this.adjList = new AdjacencyList(v.readInt());
            v.readInt();
            while (!v.isEmpty()) {
                this.addEdge(v.readInt(), <any>v.readInt(), v.readNumber());
            }
        }
    }
    public V(): number {
        return this.adjList.length;
    }
    public E(): number {
        return this.adjList.size() / 2;
    }
    public addEdge(v: number, w: number, weight: number): void;
    public addEdge(v: number, w: Edge): void;
    public addEdge(e: Edge): void;
    public addEdge(v: number | Edge, w?: number | Edge, weight?: number): void {
        let e: Edge;
        if (typeof v === "number" && typeof w === "number") e = new Edge(v, w, weight);
        else if (typeof v === "number" && w instanceof Edge && v === w.either()) e = w;
        else if (v instanceof Edge) e = v;
        let n = e.either(),
            m = e.other(n);
        this.adjList.add(n, e);
        this.adjList.add(m, e);
    }

    // 返回加权无向图的所有边
    public adj(v: number) {
        return this.adjList.adj(v);
    }
    public toString(): string {
        let s = `${this.V()} vertices.${this.E()} edges\n`;
        for (let v = 0; v < this.V(); v++) {
            let vw = "";
            for (let w of this.adj(v)) {
                vw += `(${v}:${w.other(v)} , ${w.weight()}),`;
            }
            s += vw + "\n";
        }
        return s;
    }
}
