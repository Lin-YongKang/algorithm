import { Digraph, Graph, PGraph } from "./Graph";
abstract class Search {
    protected _marked: boolean[];
    // 记录连通点的数量
    protected _count: number;
    constructor(graph: PGraph, s: number) {
        this._marked = new Array(graph.V());
        this._count = 0;
    }
    public marked(w: number): boolean {
        return !!this._marked[w];
    }
    public count(): number {
        return this._count;
    }
    public static test(graph: PGraph, s: number): void {
        interface That extends Search {}
        let That = <any>this;
        let df: That = new That(graph, s);
        let strs = "";
        for (let v = 0; v < graph.V(); v++) {
            if (df.marked(v)) {
                strs += v + " ";
            }
        }
        console.log(strs);

        if (df.count() !== graph.V()) {
            console.log("Graph is not connected", df.count());
        } else {
            console.log("Graph is connected", df.count());
        }
    }
}
// 深度搜索算法
export class DepthFirst extends Search {
    constructor(graph: Graph, s: number) {
        super(graph, s);
        this.dfs(graph, s);
    }
    private dfs(G: Graph, v: number): void {
        // 当访问一个定点是
        //将它标记为已访问；
        this._marked[v] = true;
        this._count++;
        // 递归地访问它的所有没有被标记的邻居顶点
        for (let w of G.adj(v)) if (!this.marked(w)) this.dfs(G, w);
    }
}
// 广度搜索算法
export class BreadthFirst extends Search {
    constructor(graph: Graph, s: number) {
        super(graph, s);
        this.bfs(graph, s);
    }
    private bfs(graph: Graph, v: number): void {
        // 当访问一个定点是
        //将它标记为已访问；
        let queue = new Array();
        queue.push(v);
        this._marked[v] = true;
        while (queue.length !== 0) {
            let m = queue.shift();
            this._count++;
            for (let w of graph.adj(m)) {
                if (!this.marked(w)) {
                    queue.push(w);
                    this._marked[w] = true;
                }
            }
        }
    }
}

export class DirectedDepthFirst extends Search {
    constructor(digraph: Digraph, s: number | Iterable<number>) {
        super(digraph, 0);
        if (typeof s == "number") s = [s];
        for (let v of s) {
            if (!this._marked[v]) this.dfs(digraph, v);
        }
    }
    private dfs(digraph: Digraph, v: number) {
        this._marked[v] = true;
        for (let w of digraph.adj(v)) {
            if (!this._marked[w]) this.dfs(digraph, w);
        }
    }
    public static test(digraph: Digraph, sources: number | Iterable<number>): void {
        if (typeof sources === "number") sources = [sources];
        let reachable = new DirectedDepthFirst(digraph, sources);
        let str = "";
        for (let v = 0, len = digraph.V(); v < len; v++) {
            if (reachable.marked(v)) str += `${v} `;
        }
        console.log(str);
    }
}
