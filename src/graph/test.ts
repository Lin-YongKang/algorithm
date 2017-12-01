import { createReadStream } from "fs";
import * as readline from "readline";
import * as path from "path";
import { DepthFirst, BreadthFirst, DirectedDepthFirst } from "./search";
import { DepthFirstPaths, BreadthFirstPaths } from "./paths";
import { Cycle } from "./cycle";
import { TwoColor } from "./twoColor";
import { CC } from "./cc";
import { Digraph, Graph } from "./Graph";
function readFile(FILE: string): Promise<string[]> {
    return new Promise(resolve => {
        let rl = readline.createInterface(createReadStream(FILE));
        let lines: string[] = [];
        rl.on("line", (line: string) => {
            lines.push(line);
        });
        rl.on("close", () => {
            resolve(lines);
        });
    });
}
const tinyG = path.resolve(__dirname, "../../data/tinyG.txt");
const tinyGG = path.resolve(__dirname, "../../data/tinyGG.txt");
const tinyDG = path.resolve(__dirname, "../../data/tinyDG.txt");
export default async function() {
    let [tinyGLines, tinyGGLines, tinyDGLines] = await Promise.all([readFile(tinyG), readFile(tinyGG), readFile(tinyDG)]);
    const graph = new Graph(tinyGLines);
    const digraph = new Digraph(tinyGLines);
    Graph.test(tinyGLines);
    Digraph.test(tinyDGLines);

    console.log("DirectedDepthFirst");
    DirectedDepthFirst.test(digraph, 0);

    console.log("\nDepthFirst");

    DepthFirst.test(graph, 0);

    console.log("\nBreadthFirst");
    BreadthFirst.test(digraph, 0);

    console.log("\nDepthFirstPaths");
    DepthFirstPaths.test(graph, 0);

    console.log("\nBreadthFirstPaths");
    BreadthFirstPaths.test(new Graph(tinyGGLines), 0);

    console.log("\nCC");
    CC.test(graph);

    console.log("\nCycle");
    Cycle.test(graph);

    console.log("\nTwoColor");
    TwoColor.test(graph);
}
