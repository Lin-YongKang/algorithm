        // let rl = readline.createInterface(fs.createReadStream(path.resolve(__dirname, "../../data/leipzig300k.txt")));
        // rl.on("line", (line: string) => {
        //     let words = line.replace(/,|\.|!|\?/g, "").split(/\s/);
        //     words.forEach(word => {
        //         if (word.length < minlength) return;
        //         if (!target.contains(word)) target.put(word, 1);
        //         else target.put(word, target.get(word) + 1);
        //     })
        // });
        // rl.on("close", () => {
        //     let max = " ";
        //     target.put(max, 0);
        //     for (let key of target.keys()) {
        //         if (target.get(key) > target.get(max)) max = key;
        //     }
        //     console.log(max + " " + target.get(max));
        // });