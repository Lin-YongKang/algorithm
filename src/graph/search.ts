import Graph from "./Graph";
interface Search {
    marked(v: number): boolean;
    count(): number;
}
interface SearchClass {
    new (G: Graph, s: number): Search;
    test(lines: string[], s: number): void;
}

// 深度搜索算法
export let DepthFirst: SearchClass = class {
    private _marked: boolean[];
    // 记录连通点的数量
    private _count: number;
    constructor(G: Graph, s: number) {
        this._marked = new Array(G.V());
        this._count = 0;
        this.dfs(G, s);
    }
    private dfs(G: Graph, v: number): void {
        // 当访问一个定点是
        //将它标记为已访问；
        this._marked[v] = true;
        this._count++;
        // 递归地访问它的所有没有被标记的邻居顶点
        for (let w of G.adj(v)) if (!this.marked(w)) this.dfs(G, w);
    }
    public marked(w: number): boolean {
        return !!this._marked[w];
    }
    public count(): number {
        return this._count;
    }

    public static test(lines: string[], s: number): void {
        let graph = new Graph(lines);
        let df = new this(graph, s);
        let strs = "";
        for (let v = 0; v < graph.V(); v++) {
            if (df.marked(v)) {
                strs += v + " ";
            }
        }
        console.log(strs);

        if (df.count() !== graph.V()) {
            console.log("Graph is not connected");
        } else {
            console.log("Graph is connected");
        }
    }
};
