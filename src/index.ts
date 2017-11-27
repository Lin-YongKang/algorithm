// import { SortCompare } from "./utils";
// import * as sort from "./sort";
// import MaxPQ from './structure/MaxPQ';
// import MinPQ from './structure/MinPQ';
import  * as select from './select';
import * as fs from "fs";
import * as path from "path";

// //SortCompare.test(sort.Insertion.name, sort.Selection.name, sort.Shell.name, sort.Merge.name, sort.MergeBU.name, sort.Quick.name);

// let list = SortCompare.randomInput(0, 100, 10, 1)[0];
// MaxPQ.test(list);
// MinPQ.test(list);
// sort.Quick.test(list);

select.SequentialSearchST.test(10, fs.createReadStream(path.resolve(__dirname, "../data/leipzig1m.txt")));