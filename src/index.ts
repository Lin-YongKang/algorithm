import { SortCompare } from "./utils";
import * as sort from "./sort";
import test from "./test";
console.log(test);
let list = SortCompare.randomInput(1, 100, 10, 1)[0];
sort.Shell.test(list);
