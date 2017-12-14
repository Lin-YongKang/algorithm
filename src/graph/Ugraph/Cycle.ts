import Ugraph from "src/graph/structure/Ugraph";
export class Cycle {
    private marked: boolean[];
    private _hadCycle: boolean;
    constructor(graph: Ugraph) {
        let VLen = graph.V();
        this.marked = new Array(VLen);
        this._hadCycle = false;
        for (let s = 0; s < VLen; s++) {
            if (!this.marked[s]) {
                this.dfs(graph, s, s);
            }
        }
    }
    // v表示当前搜索的节点，u表示v节点的是从u节点深度搜索过来的
    private dfs(graph: Ugraph, v: number, u: number): void {
        this.marked[v] = true;
        for (let w of graph.adj(v)) {
            if (!this.marked[w]) {
                this.dfs(graph, w, v);
                // 如果邻近节点已经被搜索过 并且 不是深度搜索的上一个节点，就表明有环
            } else if (w != u) this._hadCycle = true;
        }
    }
    public hasCycle(): boolean {
        return this._hadCycle;
    }
}
