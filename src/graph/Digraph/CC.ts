import Digraph from "src/graph/structure/Digraph";
import { DepthFirst } from "src/graph/Digraph/Search";
export class KosarajuSCC {
    private _marked: boolean[];
    private _id: number[];
    private _count: number;
    constructor(digraph: Digraph) {
        let VLen = digraph.V();
        this._marked = new Array(VLen);
        this._id = new Array(VLen);
        this._count = 0;

        // 使用反向图进行深度搜索
        let df = new DepthFirst(digraph.reverse());
        // 使用拓扑排序的顺序遍历
        for (let s of df.reversePost()) {
            if (!this._marked[s]) {
                // 深度搜索
                this.dfs(digraph, s);
                // s节点的深度搜索完成，连通分量标志 +1，继续遍历还没有marked的节点
                this._count++;
            }
        }
    }
    private dfs(digraph: Digraph, v: number) {
        this._marked[v] = true;
        //记录节点的所属连通分量
        this._id[v] = this._count;
        // 继续深度搜索
        for (let w of digraph.adj(v)) {
            if (!this._marked[w]) this.dfs(digraph, w);
        }
    }
    public stronglyConnected(v: number, w: number): boolean {
        return this._id[v] === this._id[w];
    }
    public id(v: number) {
        return this._id[v];
    }
    public count(): number {
        return this._count;
    }
}
