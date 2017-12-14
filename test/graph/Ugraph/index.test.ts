import Ugraph from "src/graph/structure/Ugraph";
import { expect } from "chai";
import StdIn from "src/utils/StdIn";
import * as fs from "fs";

import { DepthFirst, BreadthFirst } from "src/graph/Ugraph/Search";
import { Paths, ShortestPaths } from "src/graph/Ugraph/Paths";
import { CC } from "src/graph/Ugraph/CC";
import { Cycle } from "src/graph/Ugraph/Cycle";
import { TwoColor } from "src/graph/Ugraph/TwoColor";

describe("Ugraph", () => {
    let graph: Ugraph<number>;
    beforeEach(async () => {
        let stdIn = await new StdIn(fs.createReadStream("test/data/tinyG.txt")).complete();
        graph = new Ugraph(stdIn);
    });
    describe("Search", () => {
        it("depth first", () => {
            let df = new DepthFirst(graph, 0);
            expect(df.marked(7), "marked 7").to.be.false;
            expect(df.marked(1), "marked 1").to.be.true;
            expect(df.count(), "count").to.be.equal(7);
        });

        it("bread first", () => {
            let bf = new BreadthFirst(graph, 0);
            expect(bf.marked(7), "marked 7").to.be.false;
            expect(bf.marked(1), "marked 1").to.be.true;
            expect(bf.count(), "count").to.be.equal(7);
        });
    });

    describe("Paths", () => {
        it("Paths", () => {
            let paths = new Paths(graph, 0);
            expect(paths.hasPathTo(7), "has path to 7").to.be.false;
            expect(paths.hasPathTo(5), "has path to 5").to.be.true;
            let p = [];
            for (let item of paths.pathTo(5)) p.push(item);
            expect(p).to.have.ordered.members([0, 6, 4, 5]);
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
    describe("CC", () => {
        it("CC", () => {
            let cc = new CC(graph);
            expect(cc.count(), "count").to.be.equal(3);
            expect(cc.connected(0, 4)).to.be.true;
            expect(cc.connected(0, 12)).to.be.false;
            expect(cc.id(0))
                .to.be.equal(cc.id(1))
                .to.be.equal(0);
            expect(cc.id(7))
                .to.be.equal(cc.id(8))
                .to.be.equal(1);
            expect(cc.id(0)).to.be.not.equal(cc.id(9));
        });
    });

    describe("Cycle", () => {
        it("Cycle", () => {
            expect(new Cycle(graph).hasCycle(), "hasCycle").to.be.true;
        });
        it("Cycle", () => {
            let ugraph = new Ugraph(3);
            ugraph.addEdge(0, 1);
            ugraph.addEdge(1, 2);
            expect(new Cycle(ugraph).hasCycle(), "hasCycle").to.be.false;

            ugraph.addEdge(2, 1);
            expect(new Cycle(ugraph).hasCycle(), "hasCycle").to.be.true;
        });
    });
    describe("TwoColor", () => {
        it("TwoColor", () => {
            expect(new TwoColor(graph).isTwoColor(), "isTwoColor").to.be.false;
        });
        it("TwoColor", () => {
            let ugraph = new Ugraph(4);
            ugraph.addEdge(0, 1);
            ugraph.addEdge(1, 2);
            ugraph.addEdge(2, 3);
            expect(new TwoColor(ugraph).isTwoColor(), "isTwoColor").to.be.true;

            ugraph.addEdge(1, 3);
            expect(new TwoColor(ugraph).isTwoColor(), "isTwoColor").to.be.false;
        });
    });
});
