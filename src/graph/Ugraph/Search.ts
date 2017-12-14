import Ugraph from "src/graph/structure/Ugraph";
import Search from "src/graph/Interface/Search";
import { Queue } from "src/utils/BasicSet";

// 深度搜索优先
export class DepthFirst extends Search {
    constructor(graph: Ugraph);
    constructor(graph: Ugraph, s: number);
    constructor(graph: Ugraph, s?: number) {
        super(graph);
        if (s === undefined) {
            for (let v = 0, VLen = graph.V(); v < VLen; v++) {
                if (!this.marked(v)) this.dfs(graph, v);
            }
        } else if (typeof s === "number") {
            this.dfs(graph, s);
        }
    }
    private dfs(G: Ugraph, v: number): void {
        this._pre.enqueue(v);
        // 当访问一个定点是
        //将它标记为已访问；
        this._marked[v] = true;
        this._count++;
        // 递归地访问它的所有没有被标记的邻居顶点
        for (let w of G.adj(v)) if (!this.marked(w)) this.dfs(G, w);
        this._post.enqueue(v);
        this._reversePost.push(v);
    }
}

// 广度搜索优先
export class BreadthFirst extends Search {
    constructor(graph: Ugraph);
    constructor(graph: Ugraph, s: number);
    constructor(graph: Ugraph, s?: number) {
        super(graph);
        if (s === undefined) {
            for (let v = 0, VLen = graph.V(); v < VLen; v++) {
                if (!this.marked(v)) this.bfs(graph, v);
            }
        } else if (typeof s === "number") {
            this.bfs(graph, s);
        }
    }
    private bfs(graph: Ugraph, v: number): void {
        this._pre.enqueue(v);
        // 当访问一个定点是
        //将它标记为已访问；
        let queue = new Queue<typeof v>();
        queue.enqueue(v);
        this._marked[v] = true;
        while (!queue.isEmpty()) {
            let m = queue.dequeue();
            this._count++;
            for (let w of graph.adj(m)) {
                if (!this.marked(w)) {
                    queue.enqueue(w);
                    this._marked[w] = true;
                }
            }
        }
        this._post.enqueue(v);
        this._reversePost.push(v);
    }
}
