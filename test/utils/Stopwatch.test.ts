import Stopwatch from "src/utils/Stopwatch";
import { expect } from "chai";

describe("Stopwatch 计时器", function() {
    it("elapsedTime", done => {
        let sw = new Stopwatch();
        expect(sw.elapsedTime()).to.be.below(0.1);
        setTimeout(() => {
            expect(sw.elapsedTime()).to.be.within(0.5, 0.6);
        }, 500);
        setTimeout(() => {
            expect(sw.elapsedTime()).to.be.within(1, 1.1);
            done();
        }, 1000);
    });
    it("intervalTime", done => {
        let sw = new Stopwatch();
        expect(sw.intervalTime()).to.be.below(0.1);
        setTimeout(() => {
            expect(sw.intervalTime()).to.be.within(0.5, 0.6);
        }, 500);
        setTimeout(() => {
            expect(sw.intervalTime()).to.be.within(0.5, 0.6);
            done();
        }, 1000);
    });
});
