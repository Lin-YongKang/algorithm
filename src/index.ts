import { SortCompare } from "./utils";
import * as sort from "./sort";

//SortCompare.test(sort.Insertion.name, sort.Selection.name, sort.Shell.name);
let list = SortCompare.randomInput(0, 100, 10, 1)[0];
sort.Merge.test(list);
