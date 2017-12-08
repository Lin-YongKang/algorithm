import { Sequential, Binary, BST } from "src/select";
import { expect } from "chai";
import { Indexable } from "src/interface";
import { DisorderedTableSelecter, OrderedTableSelecter } from "src/select/Selecter";
describe("select", () => {
    const sentence = "SEARCHEXAMPLE";
    const result: Indexable = {
        A: 8,
        C: 4,
        E: 12,
        H: 5,
        L: 11,
        M: 9,
        P: 10,
        R: 3,
        S: 0,
        X: 7
    };

    const orderedResult = ["A", "C", "E", "H", "L", "M", "P", "R", "S", "X"];
    describe("disordered table", () => {
        function DisorderedTest(select: DisorderedTableSelecter<string, number>) {
            expect(select.isEmpty(), "isEmpty").to.be.true;
            for (let i = 0, len = sentence.length; i < len; i++) {
                select.put(sentence.charAt(i), i);
            }

            expect(select.size(), "size").to.be.equal(10);

            for (let key of select.keys()) {
                expect(select.get(key), `get ${key}`).to.be.equal(result[key]);
            }

            expect(select.contains("A"), "brfore delete call contains").to.be.true;
            select.delete("A");
            expect(select.contains("A"), "after delete call contains").to.be.false;
        }
        it("Sequential", () => {
            DisorderedTest(new Sequential());
        });
    });
    describe("ordered table", () => {
        function OrderedTest(select: OrderedTableSelecter<string, number>) {
            expect(select.isEmpty(), "isEmpty").to.be.true;
            for (let i = 0, len = sentence.length; i < len; i++) {
                select.put(sentence.charAt(i), i);
            }

            expect(select.size(), "size").to.be.equal(10);

            let i = 0;
            for (let key of select.keys()) {
                expect(select.get(key), `get ${key}`).to.be.equal(result[key]);
                expect(key, `get ${key}`).to.be.equal(orderedResult[i++]);
            }
            expect(select.min(), "min").to.be.equal(orderedResult[0]);
            expect(select.max(), "max").to.be.equal(orderedResult[orderedResult.length - 1]);
            expect(select.select(1), "select").to.be.equal(orderedResult[1]);
            expect(select.ceil("B"), "ceil").to.be.equal("C");
            expect(select.floor("B"), "floor").to.be.equal("A");
            expect(select.rank("H"), "rank").to.be.equal(3);

            select.deleteMax();
            expect(select.max(), "deleteMax").to.be.equal(orderedResult[orderedResult.length - 2]);

            select.deleteMin();
            expect(select.min(), "deleteMin").to.be.equal(orderedResult[1]);

            expect(select.contains("M"), "brfore delete call contains").to.be.true;
            select.delete("M");
            expect(select.contains("M"), "after delete call contains").to.be.false;
        }
        it("Binary", () => {
            OrderedTest(new Binary());
        });
        it("BST", () => {
            OrderedTest(new BST());
        });
    });
});
