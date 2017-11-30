import Graph from "./Graph";
interface Paths {
    hasPathTo(v: number): boolean;
    pathTo(v: number): Iterable<typeof v>;
}
interface PathsClass {
    new (G: Graph, s: number): Paths;
    test(lines: string[], s: number): void;
}
/**
 * 单点路径问题
 * 给定一副图和起点s，回答“从s到给定目的定点v是否存在一条路径，如果有，请输出路径”
 *
 */
export let DepthFirstPaths: PathsClass = class {
    private marked: boolean[];
    private edgeTo: number[];
    private readonly s: number;
    constructor(graph: Graph, s: number) {
        this.marked = new Array(graph.V());
        this.edgeTo = new Array(graph.V());
        this.s = s;
        this.dfs(graph, s);
    }
    private dfs(graph: Graph, s: number): void {
        this.marked[s] = true;
        for (let w of graph.adj(s)) {
            if (!this.marked[w]) {
                //深度搜索，当还没有到过w节点时，去到w节点，同时记录下w节点时从s深度搜索过来的；
                this.edgeTo[w] = s;
                this.dfs(graph, w);
            }
        }
    }
    public hasPathTo(v: number): boolean {
        return this.marked[v];
    }
    public pathTo(v: number): Iterable<typeof v> {
        //v节点与根节点是否连通
        if (!this.hasPathTo(v)) return null;

        let path = new Array();
        //因为v节点与根节点是连通的，我们从v节点出发，找到在深度搜索时，v节点是从edgeTo[v]深度搜索过来，一直到根节点，就形成一条路径；
        for (let x = v; x != this.s; x = this.edgeTo[x]) {
            path.unshift(x);
        }
        path.unshift(this.s);
        return path;
    }
    public static test(lines: string[], s: number): void {
        let graph = new Graph(lines);
        let paths = new this(graph, s);
        for (let v = 0; v < graph.V(); v++) {
            let str = `${s} to ${v} : `;
            if (paths.hasPathTo(v)) {
                for (let x of paths.pathTo(v)) {
                    if (x === s) str += x;
                    else str += `-${x}`;
                }
            }
            console.log(str);
        }
    }
};

export let BreadthFirstPaths: PathsClass = class {
    private marked: boolean[];
    private edgeTo: number[];
    private readonly s: number;
    constructor(graph: Graph, s: number) {
        this.marked = new Array(graph.V());
        this.edgeTo = new Array(graph.V());
        this.s = s;
        this.bfs(graph, s);
    }
    private bfs(graph: Graph, s: number): void {
        let queue = new Array();
        this.marked[s] = true;
        queue.push(s);
        while (queue.length !== 0) {
            let v = queue.shift();
            for (let w of graph.adj(v)) {
                if (!this.marked[w]) {
                    this.edgeTo[w] = v;
                    this.marked[w] = true;
                    queue.push(w);
                }
            }
        }
    }
    public hasPathTo(v: number): boolean {
        return this.marked[v];
    }
    public pathTo(v: number): Iterable<typeof v> {
        if (!this.hasPathTo(v)) return null;
        let path = new Array();

        for (let x = v; x != this.s; x = this.edgeTo[x]) {
            path.unshift(x);
        }
        path.unshift(this.s);
        return path;
    }
    public static test(lines: string[], s: number): void {
        let graph = new Graph(lines);
        let paths = new this(graph, s);
        for (let v = 0; v < graph.V(); v++) {
            let str = `${s} to ${v} : `;
            if (paths.hasPathTo(v)) {
                for (let x of paths.pathTo(v)) {
                    if (x === s) str += x;
                    else str += `-${x}`;
                }
            }
            console.log(str);
        }
    }
};
