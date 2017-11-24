import Example, { Types } from "./index";
export default class Merge extends Example {
    public static sortSelf(list: Types.Param): void {
        this.fen(list);
    }
    private static fen(list: Types.Param) {
        let len = list.length;
        if (len === 1) return list;
        return this.merge(this.fen(list.slice(0, Math.floor(len / 2))), this.fen(list.slice(Math.floor(len / 2), len)));
    }
    private static merge(lList: Types.Param, rList: Types.Param) {
        let lLen = lList.length;
        let rLen = rList.length;
        let len = lLen + rLen;
        let l = 0;
        let r = 0;
        let list: Types.Param = [];
        for (let k = 0; k < len; k++) {
            if (l >= lLen) list[k] = lList[l++];
            else if (r >= rLen) list[k] = lList[r++];
            else if (this.less(<any>lList[l], <any>rList[r])) list[k] = lList[l++];
            else list[k] = rList[r++];
        }
        return list;
    }
}
