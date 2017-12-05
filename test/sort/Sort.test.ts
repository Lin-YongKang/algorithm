import Sorter from "src/sort";
import { Insertion, Selection, Shell, Merge, MergeBU, Quick } from "src/sort";
import { expect } from "chai";

describe("sort", () => {
    const list = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    it("isSorted", () => {
        expect(Sorter.isSorted([1, 2, 3])).to.be.true;
        expect(Sorter.isSorted([1, 3, 2])).to.be.false;
    });
    it("Insertion", () => {
        expect(Insertion.sort(list)).to.have.ordered.members(result);
    });
    it("Selection", () => {
        expect(Selection.sort(list)).to.have.ordered.members(result);
    });
    it("Shell", () => {
        expect(Shell.sort(list)).to.have.ordered.members(result);
    });
    it("Merge", () => {
        expect(Merge.sort(list)).to.have.ordered.members(result);
    });
    it("MergeBU", () => {
        expect(MergeBU.sort(list)).to.have.ordered.members(result);
    });
    it("Quick", () => {
        expect(Quick.sort(list)).to.have.ordered.members(result);
    });
});
