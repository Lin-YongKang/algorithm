import Digraph from "src/graph/structure/Digraph";
import Search from "src/graph/Interface/Search";

export class DepthFirst extends Search {
    constructor(digraph: Digraph);
    constructor(digraph: Digraph, s: number);
    constructor(digraph: Digraph, s?: number) {
        super(digraph);
        if (s === undefined) {
            for (let v = 0, VLen = digraph.V(); v < VLen; v++) {
                if (!this.marked(v)) this.dfs(digraph, v);
            }
        } else if (typeof s === "number") {
            this.dfs(digraph, s);
        }
    }
    private dfs(digraph: Digraph, v: number) {
        this._pre.enqueue(v);
        this._marked[v] = true;
        this._count++;
        for (let w of digraph.adj(v)) {
            if (!this._marked[w]) this.dfs(digraph, w);
        }
        this._post.enqueue(v);
        this._reversePost.push(v);
    }
}
