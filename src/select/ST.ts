import { ReadStream } from "fs";
import * as readline from "readline";
export default abstract class ST<K, V>{
    public abstract put(key: K, value: V): void;
    public abstract get(key: K): V;
    public delete(key: K): void {
        this.put(key, null);
    };
    public abstract size(): number;
    public abstract keys(): Iterable<K>;

    public contains(key: K): boolean {
        return this.get(key) != null;
    }
    public isEmpty(): boolean {
        return this.size() === 0;
    }
    public static test(): void;
    public static test(min: number, readStream: ReadStream): void;
    public static test(min?, readStream?) {
        interface STT extends ST<string, number> { }
        let That = <any>this;
        let st: STT = new That();
        if (typeof min === 'number') {
            const rl = readline.createInterface({
                input: readStream,
            });
            rl.on('line', (line: string) => {
                let words = line.split(" ");
                words.forEach(word => {
                    word = word.replace(/(,|\.|!|"|'|\?|\)|\()/, "");
                    if (word.length < min) return;
                    if (!st.contains(word)) st.put(word, 1);
                    else st.put(word, st.get(word) + 1);
                });
            });
            rl.on("close", () => {
                let keys = st.keys();
                let maxKey = keys[0];
                for (let key of keys) {
                    if (st.get(key) > st.get(maxKey)) maxKey = key;
                }
                console.log(maxKey + " " + st.get(maxKey));
            })
        } else {
            const string = "SEARCHEXAMPLE";
            for (let i = 0, len = string.length; i < len; i++) {
                st.put(string.charAt(i), i);
            }
            for (let key of st.keys()) {
                console.log(key + " " + st.get(key));
            }
        }
    }

}