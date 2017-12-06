import { Bag, Stack, Queue, MaxPQ, IndexMaxPQ } from "src/utils/BasicSet";
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

    it("MaxPQ", () => {
        const maxPQ = new MaxPQ<number>();
        const list = [0, 4, 5, 6, 7, 8, 9, 1, 2, 3];

        expect(maxPQ.isEmpty()).to.be.true;
        expect(maxPQ.size()).to.be.equal(0);
        list.forEach(v => maxPQ.insert(v));
        expect(maxPQ.isEmpty()).to.be.false;
        expect(maxPQ.size()).to.be.equal(list.length);

        for (let i = list.length - 1; i >= 0; i--) {
            expect(maxPQ.max()).to.be.equal(i);
            expect(maxPQ.delMax()).to.be.equal(i);
        }
        expect(maxPQ.isEmpty()).to.be.true;
        expect(maxPQ.size()).to.be.equal(0);
    });

    it("IndexMaxPQ", () => {
        const indexMaxPQ = new IndexMaxPQ<{ num: number }>();
        const list = [0, 4, 5, 6, 7, 8, 9, 1, 2, 3];

        expect(indexMaxPQ.isEmpty()).to.be.true;
        expect(indexMaxPQ.size()).to.be.equal(0);
        list.forEach(v => indexMaxPQ.insert(v, { num: v }));
        expect(indexMaxPQ.isEmpty()).to.be.false;
        expect(indexMaxPQ.size()).to.be.equal(list.length);

        for (let i = list.length - 1; i >= 0; i--) {
            expect(indexMaxPQ.contains(i)).to.be.true;
            expect(indexMaxPQ.maxIndex()).to.be.equal(i);
            expect(indexMaxPQ.max()).to.deep.equal({ num: i });
            expect(indexMaxPQ.delMax()).to.deep.equal({ num: i });
        }
        expect(indexMaxPQ.isEmpty()).to.be.true;
        expect(indexMaxPQ.size()).to.be.equal(0);

        indexMaxPQ.insert(10, { num: 10 });
        indexMaxPQ.change(10, { num: 11 });
        expect(indexMaxPQ.max()).to.deep.equal({ num: 11 });
    });
});
