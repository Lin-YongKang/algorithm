import Graph from './Graph';
interface Search {
    marked(v: number): boolean;
    count(): number;
}
interface SearchClass {
    new(G: Graph, s: number): Search;
}

export let DepthFirst: SearchClass = class {
    private _marked: boolean[];
    private _count: number;
    constructor(G: Graph, s: number) {
        this._marked = new Array(G.V());
        this.dfs(G, s);
    }
    private dfs(G: Graph, v: number): void {
        this._marked[v] = true;
        this._count++;
        for (let w of G.adj(v)) if (!this.marked(w)) this.dfs(G, w);
    }
    public marked(w: number) {
        return this._marked[w]
    }
    public count() {
        return this._count;
    }
}