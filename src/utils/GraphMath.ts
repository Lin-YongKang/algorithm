import PGraph from "src/graph/structure/PGraph";
export default class GraphMath {
    public static degree(G: PGraph, v: number) {
        let degree = 0;
        for (let w of G.adj(v)) {
            w;
            degree++;
        }
        return degree;
    }
    public static maxDegree(G: PGraph) {
        let max = 0;
        let VLen = G.V();
        for (let i = 0; i < VLen; i++) {
            if (this.degree(G, i) > max) max = this.degree(G, i);
        }
        return max;
    }
    public static avgDegree(G: PGraph) {
        return 2 * G.E() / G.V();
    }
    public static numberOfSelfLoops(G: PGraph) {
        let count = 0;
        let VLen = G.V();
        for (let i = 0; i < VLen; i++) {
            for (let w of G.adj(i)) if (i === w) count++;
        }
        return Math.ceil(count / 2);
    }
}
