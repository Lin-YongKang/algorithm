import Bag from "../interface/Bag";
export default class Graph {
    private _V: number;
    private _E: number;
    private _adj: Bag<number>[];
    constructor(V: number);
    constructor(rs: string[]);
    constructor(rs: number | string[]) {
        if (typeof rs === "number") {
            _createInstance.call(this, rs);
        } else {
            _createInstance.call(this, parseInt(rs[0]));
            let E = parseInt(rs[1]);
            for (let i = 0; i < E; i++) {
                let [v, w] = rs[i + 2].split(" ");
                this.addEdge(parseInt(v.trim()), parseInt(w.trim()));
            }
        }
        function _createInstance(this: Graph, rs: number) {
            this._V = rs;
            this._E = 0;
            this._adj = new Array(rs);
            for (let v = 0; v < rs; v++) {
                this._adj[v] = new Bag();
            }
        }
    }
    public static test(lines: string[]) {
        console.log(new Graph(lines).toString());
    }
    public V(): number {
        return this._V;
    }
    public E(): number {
        return this._E;
    }
    public addEdge(v: number, w: number): void {
        this._adj[v].add(w);
        this._adj[w].add(v);
        this._E++;
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
    public static degree(G: Graph, v: number) {
        let degree = 0;
        for (let w of G.adj(v)) {
            w;
            degree++;
        }
        return degree;
    }
    public static maxDegree(G: Graph) {
        let max = 0;
        let VLen = G.V();
        for (let i = 0; i < VLen; i++) {
            if (this.degree(G, i) > max) max = this.degree(G, i);
        }
        return max;
    }
    public static avgDegree(G: Graph) {
        return 2 * G.E() / G.V();
    }
    public static numberOfSelfLoops(G: Graph) {
        let count = 0;
        let VLen = G.V();
        for (let i = 0; i < VLen; i++) {
            for (let w of G.adj(i)) if (i === w) count++;
        }
        return Math.ceil(count / 2);
    }
}
