import { Graph } from "./Graph";
export class TwoColor {
    private marked: boolean[];
    private color: boolean[];
    private _isTwoColor: boolean;
    constructor(graph: Graph) {
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
    private dfs(graph: Graph, v: number) {
        this.marked[v] = true;
        for (let w of graph.adj(v)) {
            if (!this.marked[w]) {
                this.color[w] = !this.color[v];
                this.dfs(graph, w);
            } else if (this.color[w] === this.color[v]) this._isTwoColor = false;
        }
    }
    public isTwoColor(): boolean {
        return this._isTwoColor;
    }
    public static test(graph: Graph) {
        let cycle = new this(graph);
        console.log(cycle.isTwoColor());
    }
}
