import Example, { Types } from "./index";
export default class Insertion extends Example {
    public static sortSelf(list: Types.Param): void {
        let len = list.length;
        for (let i = 1; i < len; i++) {
            for (let j = i; j > 0 && this.less(<any>list[j], <any>list[j - 1]); j--) {
                this.exch(list, j, j - 1);
            }
        }
    }
}
