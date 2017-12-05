import StdRandom from "src/utils/StdRandom";
import { expect } from "chai";
describe("StdRandom 随机数生成工具类", function() {
    const count = 100,
        minInt = 40,
        maxInt = 100,
        minFloat = -0.4,
        maxFloat = 5.5;
    it("uniform", () => {
        function withinByList(list: number[], min: number, max: number) {
            list.forEach(value => expect(value).to.be.within(min, max));
        }
        for (let i = count; i--; ) {
            expect(StdRandom.uniform()).to.be.within(0, 1);

            expect(StdRandom.uniformInt(maxInt)).to.be.within(0, maxInt - 1);
            expect(StdRandom.uniformInt(minInt, maxInt)).to.be.within(5, maxInt - 1);

            expect(StdRandom.uniformFloat(maxFloat)).to.be.within(0, maxFloat);
            expect(StdRandom.uniformFloat(minFloat, maxFloat)).to.be.within(minFloat, maxFloat);
        }
        let intList = StdRandom.uniformIntList(minInt, maxInt, count);
        expect(intList).to.have.lengthOf(count);
        withinByList(intList, minInt, maxInt);

        let floatList = StdRandom.uniforFloatList(minFloat, maxFloat, count);
        expect(floatList).to.have.lengthOf(count);
        withinByList(floatList, minFloat, maxFloat);
    });
    it("bernoulli", () => {
        let b05 = 0,
            b08 = 0,
            b02 = 0,
            b00 = 0,
            b10 = 0;
        for (let i = count; i--; ) {
            if (StdRandom.bernoulli() === true) b05++;
            if (StdRandom.bernoulli(0.8) === true) b08++;
            if (StdRandom.bernoulli(0.2) === true) b02++;
            if (StdRandom.bernoulli(0) === true) b00++;
            if (StdRandom.bernoulli(1) === true) b10++;
        }
        expect(b05).to.be.within(40, 60);
        expect(b08).to.be.within(70, 90);
        expect(b02).to.be.within(10, 30);
        expect(b00).to.equal(0);
        expect(b10).to.equal(100);
    });
});
