import Ugraph from "src/graph/structure/Ugraph";
export class TwoColor {
    private marked: boolean[];
    private color: boolean[];
    private _isTwoColor: boolean;
    constructor(graph: Ugraph) {
        let VLen = graph.V();
        this.marked = Array.from({ length: VLen }, () => false);
        this.color = Array.from({ length: VLen }, () => true);
        this._isTwoColor = true;
        for (let i = 0; i < VLen; i++) {
            if (!this.marked[i]) {
                this.dfs(graph, i);
            }
        }
    }
    private dfs(graph: Ugraph, v: number) {
        this.marked[v] = true;
        for (let w of graph.adj(v)) {
            if (!this.marked[w]) {
                // 未搜索的邻接节点的颜色标志是当前节点的否定
                this.color[w] = !this.color[v];
                this.dfs(graph, w);
                // 如果已经搜索过了，并且邻接的节点颜色相同，那么就是双色的
            } else if (this.color[w] === this.color[v]) this._isTwoColor = false;
        }
    }
    public isTwoColor(): boolean {
        return this._isTwoColor;
    }
}
