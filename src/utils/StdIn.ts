import readline = require("readline");
import fs = require("fs");

export = class StdIn {
    private lines: String[] = [];
    private promise: Promise<String[]>;
    constructor(input: fs.ReadStream) {
        this.promise = new Promise((resolve, reject) => {
            let rl = readline.createInterface(input);
            rl.on("line", line => this.lines.push(line));
            rl.on("close", () => resolve());
            rl.on("error", err => reject(err));
        });
    }
    public complete() {
        return this.promise;
    }
    public readInt() {}
    public readFloat() {}
    public readChar() {}
    public readString() {}
    public readNextLine() {
        this.lines.unshift();
        return this.readLine();
    }
    public readLine() {
        let line = this.lines[0];
        this.lines.unshift();
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
};
