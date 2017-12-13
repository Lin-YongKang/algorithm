import Digraph from "src/graph/structure/Digraph";
import Search from "src/graph/Interface/Search";
// import { Queue } from "src/utils/BasicSet";

export class DepthFirst extends Search {
    constructor(digraph: Digraph, s: number) {
        super(digraph, 0);
        this.dfs(digraph, s);
    }
    private dfs(digraph: Digraph, v: number) {
        this._marked[v] = true;
        this._count++;
        for (let w of digraph.adj(v)) {
            if (!this._marked[w]) this.dfs(digraph, w);
        }
    }
}
