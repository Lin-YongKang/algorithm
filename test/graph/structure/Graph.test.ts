import Graph from "src/graph/structure/Graph";
import { expect } from "chai";
import StdIn from "src/utils/StdIn";
import * as fs from "fs";
describe("Graph structure", () => {
    it("Graph instantiation by int", () => {
        const V = 10;
        let graph = new Graph(V);
        expect(graph.V()).to.be.equal(V);
        expect(graph.E()).to.be.equal(0);
        expect(graph.adj(1).size()).to.be.equal(0);

        graph.addEdge(1, 2);
        expect(graph.E()).to.be.equal(1);
        expect(graph.adj(1).size()).to.be.equal(1);
        expect(graph.adj(2).size()).to.be.equal(1);
    });
    it("Graph instantiation by Stdin", async () => {
        const result = [[6, 2, 1, 5], [0], [0], [5, 4], [5, 6, 3], [3, 4, 0], [0, 4], [8], [7], [11, 10, 12], [9], [9, 12], [11, 9]];
        let stdIn = await new StdIn(fs.createReadStream("test/data/tinyG.txt")).complete();
        let graph = new Graph(stdIn);
        expect(graph.V()).to.be.equal(13);
        expect(graph.E()).to.be.equal(13);
        for (let i = 0; i < 13; i++) {
            let adj = graph.adj(i);
            let r = result[i];
            expect(adj.size(), `V = ${i}`).to.be.equal(r.length);
            for (let n of adj) {
                expect(r.includes(n)).to.be.true;
            }
        }
    });
});
