import StdStats from "src/utils/StdStats";
import { expect } from "chai";

describe("StdStats 统计工具类", () => {
    const list = [1, 3, 4, 5, 6, 23, 7, 8, 2, 11];
    it("max", () => {
        expect(StdStats.max(list)).to.be.equal(23);
    });
    it("min", () => {
        expect(StdStats.min(list)).to.be.equal(1);
    });
    it("mean", () => {
        expect(StdStats.mean(list)).to.be.equal(7);
    });
    it("sum", () => {
        expect(StdStats.sum(list)).to.be.equal(70);
    });
    it("var", () => {
        expect(StdStats.var(list)).to.be.equal(36.4);
    });
    it("stddev", () => {
        expect(StdStats.stddev(list)).to.be.equal(6.0332412515993425);
    });
});
