import EdgeWeightedGraph from "src/graph/structure/EdgeWeightedGraph";
import { expect } from "chai";
import StdIn from "src/utils/StdIn";
import * as fs from "fs";

describe("EdgeWeightedGraph structure", () => {
    it("EdgeWeightedGraph instantiation by int", () => {
        const V = 10;
        let graph = new EdgeWeightedGraph(V);
        expect(graph.V()).to.be.equal(V);
        expect(graph.E()).to.be.equal(0);
        expect(graph.adj(1).size()).to.be.equal(0);
        graph.addEdge(1, 2, 0.1);
        expect(graph.E()).to.be.equal(1);
        expect(graph.adj(1).size()).to.be.equal(1);
        expect(graph.adj(2).size()).to.be.equal(1);
    });
    it("EdgeWeightedGraph instantiation by Stdin", async () => {
        let stdIn = await new StdIn(fs.createReadStream("test/data/tinyEWG.txt")).complete();
        let graph = new EdgeWeightedGraph(stdIn);
        console.log(graph.toString());
    });
});
