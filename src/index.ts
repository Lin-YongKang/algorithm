import { SortCompare } from "./utils";
import * as sort from "./sort";

SortCompare.test(sort.Insertion, sort.Selection, sort.Shell, sort.Merge, sort.MergeBU, sort.Quick);
