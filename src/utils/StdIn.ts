import * as readline from "readline";
import { ReadStream } from "fs";
export default class StdIn {
    private lines: string[] = [];
    private promise: Promise<StdIn>;
    constructor(input: ReadStream) {
        this.promise = new Promise((resolve, reject) => {
            let rl = readline.createInterface(input);
            rl.on("line", line => this.lines.push(line));
            rl.on("close", () => resolve(this));
            rl.on("error", err => reject(err));
        });
    }
    public complete() {
        return this.promise;
    }
    public readInt() {
        while (!this.isEmpty()) {
            let n = this.lines[0].search(/\d/);
            if (n === -1) this.lines.shift();
            else {
                this.lines[0] = this.lines[0].slice(n);
                let m = this.lines[0].search(/\D/);
                if (m === -1) {
                    let number = this.lines[0].slice(0);
                    this.lines.shift();
                    return parseInt(number);
                } else {
                    let number = this.lines[0].slice(0, m);
                    this.lines[0] = this.lines[0].slice(m);
                    return parseInt(number);
                }
            }
        }
    }
    public readNumber() {
        let int = this.readInt().toString();
        if (this.lines[0].search(/\.\d/) === 0) {
            int += this.readChar();
            int += this.readInt();
        }
        return parseFloat(int);
    }
    public readChar() {
        while (!this.isEmpty()) {
            let n = this.lines[0].search(/\S/);
            if (n === -1) this.lines.shift();
            else {
                let char = this.lines[0].charAt(n);
                this.lines[0] = this.lines[0].slice(n);
                return char;
            }
        }
    }
    public readString() {
        while (!this.isEmpty()) {
            let n = this.lines[0].search(/\S/);
            if (n === -1) this.lines.shift();
            else {
                this.lines[0] = this.lines[0].slice(n);
                let m = this.lines[0].search(/\s/);

                if (m === -1) {
                    let str = this.lines[0].slice(0);
                    this.lines.shift();
                    return str;
                } else {
                    let str = this.lines[0].slice(0, m);
                    this.lines[0] = this.lines[0].slice(m);
                    return str;
                }
            }
        }
    }
    public readNextLine() {
        this.lines.shift();
        return this.readLine();
    }
    public readLine() {
        let line = this.lines[0];
        this.lines.shift();
        return line;
    }
    public readAll() {
        let s = this.lines.join("\n");
        this.lines = [];
        return s;
    }
    public isEmpty() {
        return this.lines.length === 0;
    }
}
