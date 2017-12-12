import Digraph from "src/graph/structure/Digraph";
import { expect } from "chai";
import StdIn from "src/utils/StdIn";
import * as fs from "fs";
describe("Digraph structure", () => {
    it("Digraph instantiation by int", () => {
        const V = 10;
        let graph = new Digraph(V);
        expect(graph.V()).to.be.equal(V);
        expect(graph.E()).to.be.equal(0);
        expect(graph.adj(1).size()).to.be.equal(0);

        graph.addEdge(1, 2);
        expect(graph.E()).to.be.equal(1);
        expect(graph.adj(1).size()).to.be.equal(1);
        expect(graph.adj(2).size()).to.be.equal(0);
    });
    it("Digraph instantiation by Stdin", async () => {
        const result = [[5, 1, 2, 6], [], [], [], [3], [3, 4], [4], [8], [], [11, 10, 12], [], [12], []];
        let stdIn = await new StdIn(fs.createReadStream("test/data/tinyG.txt")).complete();
        let graph = new Digraph(stdIn);
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
