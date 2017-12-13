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
}
