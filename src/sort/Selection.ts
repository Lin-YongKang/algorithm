import Example, { Types } from "./index";
export default class Selection extends Example {
    public static sortSelf(list: Types.Param): void {
        let len = list.length;
        for (let i = 0; i < len; i++) {
            let min = i;
            for (let j = i + 1; j < len; j++) {
                if (this.less(<any>list[j], <any>list[min])) min = j;
            }
            this.exch(list, min, i);
        }
    }
}
