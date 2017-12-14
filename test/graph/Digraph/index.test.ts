import Digraph from "src/graph/structure/Digraph";
import { expect } from "chai";
import StdIn from "src/utils/StdIn";
import * as fs from "fs";

import { DepthFirst } from "src/graph/Digraph/Search";
import { Paths, ShortestPaths } from "src/graph/Digraph/Paths";
import { Cycle } from "src/graph/Digraph/Cycle";
import { Topological } from "src/graph/Digraph/Topological";
describe("Digraph", () => {
    let graph: Digraph<number>;
    beforeEach(async () => {
        let stdIn = await new StdIn(fs.createReadStream("test/data/tinyG.txt")).complete();
        graph = new Digraph(stdIn);
    });
    describe("Search", () => {
        it("depth first", () => {
            let df = new DepthFirst(graph, 0);
            expect(df.marked(7), "marked 7").to.be.false;
            expect(df.marked(1), "marked 1").to.be.true;
            expect(df.count(), "count").to.be.equal(7);
        });
    });

    describe("Paths", () => {
        it("Paths", () => {
            let paths = new Paths(graph, 0);
            expect(paths.hasPathTo(7), "has path to 7").to.be.false;
            expect(paths.hasPathTo(5), "has path to 5").to.be.true;
            let p = [];
            for (let item of paths.pathTo(5)) p.push(item);
            expect(p).to.have.ordered.members([0, 5]);
        });

        it("ShortestPaths", () => {
            let paths = new ShortestPaths(graph, 0);
            expect(paths.hasPathTo(7), "has path to 7").to.be.false;
            expect(paths.hasPathTo(5), "has path to 5").to.be.true;
            let p = [];
            for (let item of paths.pathTo(5)) p.push(item);
            expect(p).to.have.ordered.members([0, 5]);
        });
    });

    describe("Cycle", () => {
        it("Cycle", () => {
            expect(new Cycle(graph).hasCycle(), "hasCycle").to.be.false;
        });
        it("Cycle", () => {
            let ugraph = new Digraph(3);
            ugraph.addEdge(0, 1);
            ugraph.addEdge(1, 2);
            expect(new Cycle(ugraph).hasCycle(), "hasCycle").to.be.false;

            ugraph.addEdge(2, 0);
            expect(new Cycle(ugraph).hasCycle(), "hasCycle").to.be.true;
        });
    });

    describe("Topological", () => {
        it("Topological", () => {
            let order = [];
            for (let node of new Topological(graph).order()) {
                order.push(node);
            }
            expect(order).to.have.ordered.members([9, 10, 11, 12, 7, 8, 0, 5, 1, 2, 6, 4, 3]);
        });
    });
});
