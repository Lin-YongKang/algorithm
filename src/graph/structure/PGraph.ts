export default abstract class PGraph<W = any> {
    // public static test(lines: string[]) {
    //     interface That extends PGraph {}
    //     let That = <any>this;
    //     let target: That = new That(lines);
    //     console.log(target.toString());
    // }
    public abstract addEdge(v: number, w: W): void;
    public abstract V(): number;
    public abstract E(): number;
    public abstract adj(v: number): Iterable<W>;
    public toString(): string {
        let s = `${this.V()} vertices.${this.E()} edges\n`;
        for (let v = 0; v < this.V(); v++) {
            let vw = "";
            for (let w of this.adj(v)) {
                vw += `(${v}:${w}),`;
            }
            s += vw + "\n";
        }
        return s;
    }
}
