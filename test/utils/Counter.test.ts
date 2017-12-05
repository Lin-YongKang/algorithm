import Counter from "src/utils/Counter";
import { expect } from "chai";

describe("Counter 计数器工具类", function() {
    let counter = new Counter("name");
    it("increment and tally", () => {
        counter.increment();
        expect(counter.tally()).to.be.equal(1);
    });
    it("reduction and tally", () => {
        counter.reduction();
        expect(counter.tally()).to.be.equal(0);
    });
    it("toString", () => {
        expect(counter.toString()).to.be.equal("0 name");
    });
});
