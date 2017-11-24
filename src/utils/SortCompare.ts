import * as sort from "../sort";
import Stopwatch from "./Stopwatch";
export default class SortCompare {
    public static time(name: string, list: sort.Types.Param) {
        let timer = new Stopwatch();
        sort[name].sort(list);
        return timer.elapsedTime();
    }
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
                nList[i][j] = _random(min, max);
            }
        }
        return nList;
        function _random(min: number, max: number) {
            return Math.floor(min + Math.random() * max);
        }
    }
    public static sort(name: string, nList: number[][]) {
        let total = 0;
        for (let i = 0, len = nList.length; i < len; i++) {
            let t = this.time(name, nList[i]);
            console.log(name, t);
            total += t;
        }
        return total;
    }
    public static test(...names) {
        let nList = this.randomInput(0, 100000, 10000, 10);
        let ts = names.map(name => this.sort(name, nList));
        ts.forEach((t, index) => {
            console.log(names[index], t);
        });
    }
}
