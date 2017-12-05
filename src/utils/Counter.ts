export default class Counter {
    private name: string;
    private count: number;
    constructor(id: string, count: number = 0) {
        this.name = id;
        this.count = count;
    }
    public increment() {
        this.count++;
    }
    public reduction() {
        this.count--;
    }
    public tally(): number {
        return this.count;
    }
    public toString(): string {
        return `${this.count} ${this.name}`;
    }
}
