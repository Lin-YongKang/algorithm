import { Stack } from "src/utils/BasicSet";
import Digraph from "src/graph/structure/Digraph";
export class Cycle {
    private marked: boolean[];
    private edgeTo: number[];
    private _cycle: Stack<number>; // 用于记录有向环中的所有顶点
    /**
     * 用true记录深度搜索当前路径的数组，回退的时候就将相应节点设为false
     * 0 -> 1 -> 2
     *        -> 3
     * 到2时：[true,true,true,false]
     * 回退到1时：[true,true,false,false]
     * 到3时：[true,true false,true]
     */
    private onStack: boolean[];

    constructor(graph: Digraph) {
        let VLen = graph.V();
        // 初始化
        this.edgeTo = new Array(VLen);
        this.onStack = new Array(VLen);
        this.marked = new Array(VLen);

        // 深度搜索
        for (let s = 0; s < VLen; s++) {
            if (!this.marked[s]) {
                this.dfs(graph, s);
            }
        }
    }
    private dfs(graph: Digraph, v: number): void {
        // 打标记
        this.onStack[v] = true;
        this.marked[v] = true;

        // 深度搜索
        for (let w of graph.adj(v)) {
            // 检测到有向环就退出深度搜索
            if (this.hasCycle()) return;
            else if (!this.marked[w]) {
                // 找到下一个没有没有标记的点；
                // 记录搜索路径，w是从v来的，并递归深度搜索
                this.edgeTo[w] = v;
                this.dfs(graph, w);
                // 如果下一个点没有进去过，并且被标记在当前路径中，就是一个环，生成环路径
            } else if (this.onStack[w]) {
                this._cycle = new Stack();
                for (let x = v; x != w; x = this.edgeTo[x]) {
                    this._cycle.push(x);
                }
                this._cycle.push(w);
                this._cycle.push(v);
            }
        }
        // 当v点没有下一个节点可以去了，就退回去，同时将当前路径标志设为false，
        this.onStack[v] = false;
    }
    public hasCycle(): boolean {
        return this._cycle != null;
    }
    public cycle(): Iterable<number> {
        return this._cycle;
    }
}
