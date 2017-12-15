import EdgeWeightedGraph from "src/graph/structure/EdgeWeightedGraph";
import { Edge } from "src/graph/structure/EdgeWeightedGraph";
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
        expect(graph.V()).to.be.equal(8);
        expect(graph.E()).to.be.equal(16);
    });
    it("Edge", () => {
        let e1 = new Edge(1, 2, 0.5);
        expect(e1.either()).to.be.equal(1);
        expect(e1.other(1)).to.be.equal(2);
        expect(e1.other(2)).to.be.equal(1);
        expect(() => e1.other(3)).to.throw();
        expect(e1.weight()).to.be.equal(0.5);

        let e2 = new Edge(2, 1, 0.4);
        expect(e1.compareTo(e2)).to.be.equal(1);
        expect(e2.compareTo(e1)).to.be.equal(-1);
    });
});
