import * as select from "src/select";
import * as readline from "readline";
import * as fs from "fs";
import Stopwatch from "src/utils/Stopwatch";
type Param = typeof select.DisorderedTableSelecter | typeof select.OrderedTableSelecter;
export default class FrequencyCounter {
    public static test(...Selects: Param[]) {
        this.readFile("test/data/leipzig1m.txt").then(lines => {
            Selects.forEach(Select => {
                this.selection(Select, lines);
            });
        });
    }
    public static selection(Select: Param, lines: string[][]) {
        let watch = new Stopwatch();
        let That = <any>Select;
        let target = new That();
        console.log(Select.name, "before put", watch.intervalTime());
        lines.forEach(words => {
            words.forEach(word => {
                if (word === "") return;
                !target.contains(word) ? target.put(word, 1) : target.put(word, target.get(word) + 1);
            });
        });
        console.log(Select.name, "after put", watch.intervalTime());
        console.log(Select.name, "before max", watch.intervalTime());
        let max = "";
        if (target instanceof select.DisorderedTableSelecter) {
            target.put(max, 0);
            for (let word of target.keys()) {
                if (target.get(word) > target.get(max)) max = word;
            }
        } else if (target instanceof select.OrderedTableSelecter) {
            max = target.max();
        }
        console.log(Select.name, "after max", watch.intervalTime());
        console.log(Select.name, max + " " + target.get(max));
        console.log(Select.name, "totel", watch.elapsedTime());
        return target;
    }
    public static readFile(file: string): Promise<string[][]> {
        return new Promise((resolve, reject) => {
            let rl = readline.createInterface(fs.createReadStream(file));
            let lines: string[][] = [];
            rl.on("line", (line: string) => lines.push(line.replace(/,|\.|!|\?/g, "").split(/\s/)));
            rl.on("close", () => resolve(lines));
        });
    }
}
