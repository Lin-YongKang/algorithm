import { Bag, Stack, Queue } from "src/utils/BasicSet";
import { expect } from "chai";

describe("BasicSet 基本数据结构", () => {
    it("Bag", () => {
        const bag = new Bag<number>();
        expect(bag.isEmpty()).to.be.true;
        expect(bag.size()).to.be.equal(0);
        bag.add(1);
        expect(bag.isEmpty()).to.be.false;
        expect(bag.size()).to.be.equal(1);

        bag.add(2);
        bag.add(3);
        let arr = Array.from({ length: 4 }, () => false);
        for (let value of bag) {
            arr[value] = true;
        }
        expect(arr[0]).to.be.false;
        expect(arr[1]).to.be.true;
        expect(arr[2]).to.be.true;
        expect(arr[3]).to.be.true;
    });
    it("Stack", () => {
        const stack = new Stack<number>();
        expect(stack.isEmpty()).to.be.true;
        expect(stack.size()).to.be.equal(0);
        stack.push(1);
        expect(stack.isEmpty()).to.be.false;
        expect(stack.size()).to.be.equal(1);

        expect(stack.pop()).to.be.equal(1);
        expect(stack.isEmpty()).to.be.true;
        expect(stack.size()).to.be.equal(0);

        stack.push(1);
        stack.push(2);
        let arr = [2, 1];
        for (let value of stack) {
            expect(value).to.be.equal(arr.shift());
        }
    });
    it("Queue", () => {
        const queue = new Queue<number>();
        expect(queue.isEmpty()).to.be.true;
        expect(queue.size()).to.be.equal(0);
        queue.enqueue(1);
        expect(queue.isEmpty()).to.be.false;
        expect(queue.size()).to.be.equal(1);

        expect(queue.dequeue()).to.be.equal(1);
        expect(queue.isEmpty()).to.be.true;
        expect(queue.size()).to.be.equal(0);

        queue.enqueue(1);
        queue.enqueue(2);
        let arr = [1, 2];
        for (let value of queue) {
            expect(value).to.be.equal(arr.shift());
        }
    });
});
