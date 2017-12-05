import * as fs from "fs";
import StdIn from "src/utils/StdIn";
import { expect } from "chai";

describe("StdIn 可读流的读取工具类", function() {
    let stdIn: StdIn;
    beforeEach(async () => {
        stdIn = await new StdIn(fs.createReadStream("test/data/tinyG.txt")).complete();
    });
    it("read number", function() {
        expect(stdIn.readNumber()).to.be.equal(399.55);
    });
    it("read int", function() {
        expect(stdIn.readInt()).to.be.equal(399);
    });
    it("read char", function() {
        expect(stdIn.readChar()).to.be.equal("I");
    });
    it("read string", function() {
        expect(stdIn.readString()).to.be.equal("In");
    });
    it("read line", function() {
        expect(stdIn.readLine()).to.be.equal("In early trading in Hong Kong on Friday, gold was quoted at $399.55.");
    });
    it("read next line", function() {
        expect(stdIn.readNextLine()).to.be.equal("Both the 9,600-ton Bunker Hill and the 7,810-ton Fife are capable of deploying Tomahawk missiles.");
    });
    it("Continuous read", function() {
        expect(stdIn.readNumber()).to.be.equal(399.55);
        expect(stdIn.readLine()).to.be.equal(".");
        expect(stdIn.readString()).to.be.equal("Both");
        expect(stdIn.readInt()).to.be.equal(9);
        expect(stdIn.readChar()).to.be.equal(",");
        expect(stdIn.readNextLine()).to.be.equal("At the first Pan Am bankruptcy hearing, for example, at least five airlines were represented.");
        expect(stdIn.readAll()).to.be.equal(
            `But other major banks left their rates unchanged, and after Black Monday those three banks quickly lowered their rates back to 9 1/2%.\nSo he joined Hyatt's frequent-guest program; so far, he has cashed in on discounted and upgraded rooms.`
        );
    });
});
