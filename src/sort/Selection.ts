import Example, { Types } from "./index";
class Selection extends Example {
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

const list = [9, 8, 7, 6, 5, 4, 3, 2, 1];
Selection.test(list);