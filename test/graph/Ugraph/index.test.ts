import Ugraph from "src/graph/structure/Ugraph";
import { expect } from "chai";
import StdIn from "src/utils/StdIn";
import * as fs from "fs";

import { DepthFirst, BreadthFirst } from "src/graph/Ugraph/Search";
import { Paths, ShortestPaths } from "src/graph/Ugraph/Paths";

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
});
