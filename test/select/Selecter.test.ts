import { Sequential } from "src/select";
import { expect } from "chai";
import { Indexable } from "src/interface";
import { DisorderedTableSelecter } from "src/select/Selecter";
describe("select", () => {
    const sentence = "SEARCHEXAMPLE";
    const disorderedResult: Indexable = {
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
    // };
    // const LIST = ["A", "C", "E", "H", "L", "M", "P", "R", "S", "X"];
    describe("disordered table", () => {
        function DisorderedTest(select: DisorderedTableSelecter<string, number>) {
            expect(select.isEmpty(), "isEmpty").to.be.true;
            for (let i = 0, len = sentence.length; i < len; i++) {
                select.put(sentence.charAt(i), i);
            }

            expect(select.size(), "size").to.be.equal(10);

            for (let key of select.keys()) {
                expect(select.get(key), `get ${key}`).to.be.equal(disorderedResult[key]);
            }

            expect(select.contains("A"), "brfore delete call contains").to.be.true;
            select.delete("A");
            expect(select.contains("A"), "after delete call contains").to.be.false;
        }
        it("Sequential", () => {
            DisorderedTest(new Sequential());
        });
    });
});
