import PGraph from "src/graph/structure/PGraph";

export default class Search {
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
