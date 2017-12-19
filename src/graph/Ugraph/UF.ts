export default class UF {
    private id: number[];
    private sz: number[];
    private _count: number;
    constructor(n: number) {
        this._count = n;
        this.id = Array.from({ length: n }, ({}, index) => index);
        this.sz = Array.from({ length: n }, () => 1);
    }
    public union(p: number, q: number) {
        let i = this.find(p);
        let j = this.find(q);
        if (i !== j) {
            if (this.sz[i] < this.sz[j]) {
                this.id[i] = j;
                this.sz[j] += this.sz[i];
            } else {
                this.id[j] = i;
                this.sz[i] += this.sz[j];
            }
            this._count--;
        }
    }
    public find(p: number): number {
        while (p !== this.id[p]) p = this.id[p];
        return p;
    }
    public connected(p: number, q: number): boolean {
        return this.find(p) === this.find(q);
    }
    public count(): number {
        return this._count;
    }
}
