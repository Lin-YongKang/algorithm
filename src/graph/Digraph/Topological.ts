import { Cycle } from "src/graph/Digraph/Cycle";
import Digraph from "src/graph/structure/Digraph";
import { DepthFirst } from "src/graph/Digraph/Search";
export class Topological {
    private depthFirstOrder: DepthFirst;
    constructor(digraph: Digraph) {
        if (!new Cycle(digraph).hasCycle()) {
            this.depthFirstOrder = new DepthFirst(digraph);
        } else {
            this.depthFirstOrder = null;
        }
    }
    public isDAG(): boolean {
        return this.depthFirstOrder !== null;
    }
    public order(): Iterable<number> {
        return this.depthFirstOrder.reversePost();
    }
}
