import { DirectedCycle } from "./cycle";
import { Digraph } from "./Graph";
import { DepthFirstOrder } from "./search";
export class Topological {
    private depthFirstOrder: DepthFirstOrder;
    constructor(digraph: Digraph) {
        if (!new DirectedCycle(digraph)) {
            this.depthFirstOrder = new DepthFirstOrder(digraph);
        } else {
            this.depthFirstOrder = null;
        }
    }
    public isDAG(): boolean {
        return this.depthFirstOrder !== null;
    }
    public order(): Iterable<number> {
        return this.reversePost();
    }
    public pre(): Iterable<number> {
        return this.depthFirstOrder.pre();
    }
    public post(): Iterable<number> {
        return this.depthFirstOrder.pre();
    }
    public reversePost(): Iterable<number> {
        return this.depthFirstOrder.pre();
    }
}
