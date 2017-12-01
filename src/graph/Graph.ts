import { Bag } from "../interface/BasicSet";
/**
 * 邻接表数据结构
 * [0] --> Bag
 * [1] --> Bag
 * [2] --> Bag
 * [3] --> Bag
 * [4] --> Bag
 */
export abstract class PGraph {
    protected readonly _V: number;
    protected _E: number;
    protected _adj: Bag<number>[];
    constructor(rs: number | string[]) {
        if (typeof rs === "number") {
            this._V = rs;
            _createInstance.call(this, this._V);
        } else {
            this._V = parseInt(rs[0]);
            _createInstance.call(this, this._V);
            let E = parseInt(rs[1]);
            for (let i = 0; i < E; i++) {
                let [v, w] = rs[i + 2].split(" ");
                this.addEdge(parseInt(v.trim()), parseInt(w.trim()));
            }
        }
        function _createInstance(this: PGraph, rs: number) {
            this._E = 0;
            this._adj = new Array(rs);
            for (let v = 0; v < rs; v++) {
                this._adj[v] = new Bag();
            }
        }
    }
    public static test(lines: string[]) {
        interface That extends PGraph {}
        let That = <any>this;
        let target: That = new That(lines);
        console.log(target.toString());
    }
    abstract addEdge(v: number, w: number): void;
    public V(): number {
        return this._V;
    }
    public E(): number {
        return this._E;
    }

    public adj(v: number): Iterable<number> {
        return this._adj[v];
    }
    public toString(): string {
        let s = `${this.V()} vertices.${this.E()} edges\n`;
        for (let v = 0; v < this.V(); v++) {
            let vw = "";
            for (let w of this.adj(v)) {
                vw += `(${v}:${w}),`;
            }
            s += vw + "\n";
        }
        return s;
    }
    public static degree(G: PGraph, v: number) {
        let degree = 0;
        for (let w of G.adj(v)) {
            w;
            degree++;
        }
        return degree;
    }
    public static maxDegree(G: PGraph) {
        let max = 0;
        let VLen = G.V();
        for (let i = 0; i < VLen; i++) {
            if (this.degree(G, i) > max) max = this.degree(G, i);
        }
        return max;
    }
    public static avgDegree(G: PGraph) {
        return 2 * G.E() / G.V();
    }
    public static numberOfSelfLoops(G: PGraph) {
        let count = 0;
        let VLen = G.V();
        for (let i = 0; i < VLen; i++) {
            for (let w of G.adj(i)) if (i === w) count++;
        }
        return Math.ceil(count / 2);
    }
}

export class Graph extends PGraph {
    constructor(rs: number | string[]) {
        super(rs);
    }
    public addEdge(v: number, w: number): void {
        this._adj[v].add(w);
        this._adj[w].add(v);
        this._E++;
    }
}

export class Digraph extends PGraph {
    constructor(rs: number | string[]) {
        super(rs);
    }
    public addEdge(v: number, w: number): void {
        this._adj[v].add(w);
        this._E++;
    }
    public reverse(): Digraph {
        let r = new Digraph(this._V);
        for (let v = 0; v < this._V; v++) {
            for (let w of this.adj(v)) {
                r.addEdge(w, v);
            }
        }
        return r;
    }
}
