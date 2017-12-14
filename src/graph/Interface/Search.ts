import PGraph from "src/graph/structure/PGraph";
import { Queue, Stack } from "src/utils/BasicSet";
export default class Search {
    protected _marked: boolean[];
    // 记录连通点的数量
    protected _count: number;
    protected _pre: Queue<number> = new Queue();
    protected _post: Queue<number> = new Queue();
    protected _reversePost: Stack<number> = new Stack();
    constructor(graph: PGraph) {
        this._marked = new Array(graph.V());
        this._count = 0;
    }
    public marked(w: number): boolean {
        return !!this._marked[w];
    }
    public count(): number {
        return this._count;
    }
    public pre(): Iterable<number> {
        return this._pre;
    }
    public post(): Iterable<number> {
        return this._post;
    }
    public reversePost(): Iterable<number> {
        return this._reversePost;
    }
}
