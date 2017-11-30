import { createReadStream } from "fs";
import * as readline from "readline";
import * as path from "path";
import { DepthFirst, BreadthFirst } from "./search";
import { DepthFirstPaths, BreadthFirstPaths } from "./paths";
import {CC} from "./cc";
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
export default async function () {
    let [tinyGLines, tinyGGLines] = await Promise.all([readFile(tinyG), readFile(tinyGG)]);

    DepthFirst.test(tinyGLines, 0);
    console.log("\n");
    BreadthFirst.test(tinyGLines, 0);
    console.log("\n");
    DepthFirstPaths.test(tinyGGLines, 0);
    console.log("\n");
    BreadthFirstPaths.test(tinyGGLines, 0);
    CC.test(tinyGLines);
}
