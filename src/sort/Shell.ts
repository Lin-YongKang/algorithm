import Example, { Types } from "./index";
export default class Shell extends Example {
    public static sortSelf(list: Types.Param): void {
        let len = list.length;
        let h = 1;
        while (h < len / 3) h = 3 * h;
        while (h >= 1) {
            for (let i = h; i < len; i++) {
                for (let j = i; j >= h && this.less(<any>list[j], <any>list[j - h]); j -= h) {
                    this.exch(list, j, j - h);
                }
            }
            h = h / 3;
        }
    }
}
