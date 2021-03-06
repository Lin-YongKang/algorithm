import StdRandom from "src/utils/StdRandom";
import Sorter from "src/sort";
import Stopwatch from "src/utils/Stopwatch";
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
        while (t--) nList[t] = StdRandom.uniformIntList(min, max, n);
        return nList;
    }
    public static sort(Sort: typeof Sorter, nList: number[][]) {
        let timer = new Stopwatch();
        for (let i = 0, len = nList.length; i < len; i++) {
            let result = Sort.sort(nList[i]);
            if (!Sort.isSorted(result)) throw new Error(`${Sort.name} sort fail.Param : ${nList[i]},result : ${result}`);
            console.log(Sort.name, timer.intervalTime());
        }
        return timer.elapsedTime();
    }
    public static test(...Sorts: typeof Sorter[]) {
        let nList = this.randomInput(0, 1000000, 20000, 300);
        let ts = Sorts.map(Sort => this.sort(Sort, nList));
        ts.forEach((t, index) => console.log(Sorts[index].name, t));
    }
}
