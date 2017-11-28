import { SortCompare } from "../utils";
import * as sort from "./index";
export default function() {
    SortCompare.test(sort.Insertion, sort.Selection, sort.Shell, sort.Merge, sort.MergeBU, sort.Quick);
}
