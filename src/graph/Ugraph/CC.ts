//import { Bag } from "src/utils/BasicSet";
import Ugraph from "src/graph/structure/Ugraph";
// 连通分量
export class CC {
    private _marked: boolean[];
    private _id: number[];
    private _count: number;
    constructor(graph: Ugraph) {
        let VLen = graph.V();
        this._marked = new Array(VLen);
        this._id = new Array(VLen);
        this._count = 0;
        // 遍历所以节点
        for (let s = 0; s < VLen; s++) {
            if (!this._marked[s]) {
                // 深度搜索
                this.dfs(graph, s);

                // s节点的深度搜索完成，在构造函数进入的点深度搜索都属于同一个连通分量，连通分量标志 +1，继续遍历还没有marked的节点
                this._count++;
            }
        }
    }
    private dfs(graph: Ugraph, v: number) {
        this._marked[v] = true;
        //记录节点的所属连通分量
        this._id[v] = this._count;
        // 继续深度搜索
        for (let w of graph.adj(v)) {
            if (!this._marked[w]) this.dfs(graph, w);
        }
    }
    public id(v: number) {
        return this._id[v];
    }
    public connected(v: number, w: number): boolean {
        return this._id[v] === this._id[w];
    }
    public count(): number {
        return this._count;
    }
}
