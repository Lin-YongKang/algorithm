import Graph from "./Graph";
interface Paths {
    hasPathTo(v: number): boolean;
    pathTo(v: number): Iterable<typeof v>;
}
interface PathsClass {
    new (G: Graph, s: number): Paths;
    test(lines: string[], s: number): void;
}

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
                this.edgeTo[w] = s;
                this.dfs(graph, w);
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
