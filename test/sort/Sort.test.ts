import Sorter from "src/sort";
import { Insertion, Selection, Shell, Merge, MergeBU, Quick, QuickThree, Heap } from "src/sort";
import { expect } from "chai";

describe("sort", () => {
    const hasSame = [2, 2, 2, 1, 1, 1, 3, 3, 3, 3];
    const hasSameResult = [1, 1, 1, 2, 2, 2, 3, 3, 3, 3];
    const random = [8, 9, 4, 5, 1, 6, 2, 3, 7];

    const list = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    it("isSorted", () => {
        expect(Sorter.isSorted([1, 2, 3])).to.be.true;
        expect(Sorter.isSorted([1, 3, 2])).to.be.false;
    });
    it("Insertion", () => {
        expect(Insertion.sort(list), "Reverse").to.have.ordered.members(result);
        expect(Insertion.sort(random), "random").to.have.ordered.members(result);
        expect(Insertion.sort(hasSame), "same").to.have.ordered.members(hasSameResult);
    });
    it("Selection", () => {
        expect(Selection.sort(list), "Reverse").to.have.ordered.members(result);
        expect(Selection.sort(random), "random").to.have.ordered.members(result);
        expect(Selection.sort(hasSame), "same").to.have.ordered.members(hasSameResult);
    });
    it("Shell", () => {
        expect(Shell.sort(list), "Reverse").to.have.ordered.members(result);
        expect(Shell.sort(random), "random").to.have.ordered.members(result);
        expect(Shell.sort(hasSame), "same").to.have.ordered.members(hasSameResult);
    });
    it("Merge", () => {
        expect(Merge.sort(list), "Reverse").to.have.ordered.members(result);
        expect(Merge.sort(random), "random").to.have.ordered.members(result);
        expect(Merge.sort(hasSame), "same").to.have.ordered.members(hasSameResult);
    });
    it("MergeBU", () => {
        expect(MergeBU.sort(list), "Reverse").to.have.ordered.members(result);
        expect(MergeBU.sort(random), "random").to.have.ordered.members(result);
        expect(MergeBU.sort(hasSame), "same").to.have.ordered.members(hasSameResult);
    });
    it("Quick", () => {
        expect(Quick.sort(list), "Reverse").to.have.ordered.members(result);
        expect(Quick.sort(random), "random").to.have.ordered.members(result);
        expect(Quick.sort(hasSame), "same").to.have.ordered.members(hasSameResult);
    });
    it("QuickThree", () => {
        expect(QuickThree.sort(list), "Reverse").to.have.ordered.members(result);
        expect(QuickThree.sort(random), "random").to.have.ordered.members(result);
        expect(QuickThree.sort(hasSame), "same").to.have.ordered.members(hasSameResult);
    });

    it("Heap", () => {
        expect(Heap.sort(list), "Reverse").to.have.ordered.members(result);
        expect(Heap.sort(random), "random").to.have.ordered.members(result);
        expect(Heap.sort(hasSame), "same").to.have.ordered.members(hasSameResult);
    });
});
