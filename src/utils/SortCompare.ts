import StdRandom from "./StdRandom";
import * as sort from "../sort";
import Stopwatch from "./Stopwatch";
export default class SortCompare {
    /**
     *
     * @param min 随机数的最小值
     * @param max 随机数的最大值
     * @param n 生成n个随机数
     * @param t 进行t次排序
     */
    public static randomInput(min: number, max: number, n: number, t: number) {
        let nList: number[][] = [];
        for (let i = 0; i < t; i++) {
            nList[i] = [];
            for (let j = 0; j < n; j++) {
                nList[i][j] = StdRandom.uniformInt(min, max);
            }
        }
        return nList;
    }
    public static sort(Sort: typeof sort.Example, nList: number[][]) {
        let timer = new Stopwatch();
        for (let i = 0, len = nList.length; i < len; i++) {
            Sort.sort(nList[i]);
            console.log(Sort.name, timer.intervalTime());
        }
        return timer.elapsedTime();
    }
    public static test(...Sorts: typeof sort.Example[]) {
        let nList = this.randomInput(0, 100000, 20000, 30);
        let ts = Sorts.map(Sort => this.sort(Sort, nList));
        ts.forEach((t, index) => console.log(Sorts[index].name, t));
    }
}
