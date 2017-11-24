import { SortCompare } from "./utils";
import * as sort from "./sort";


SortCompare.test(sort.Insertion.name, sort.Selection.name, sort.Shell.name, sort.Merge.name, sort.MergeBU.name, sort.Quick.name);

// let list = SortCompare.randomInput(0, 100, 10, 1)[0];
// sort.Quick.test(list);
