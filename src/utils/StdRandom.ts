export default class StdRandom {
    /**
     * [0,1)之间的实数
     * @return a random real number uniformly in [0, 1)
     */
    public static uniform(): number {
        return Math.random();
    }
    /**
     * [0,n-1)之间的实数
     * @param n number of possible float;
     * @return a random number uniformly between 0 (inclusive) and {@code n} (exclusive)
     */
    public static uniformFloat(n: number): typeof n;
    /**
     * [lo,hi)之间的实数
     * @param lo the left endpoint
     * @param hi the right endpoint
     * @return a random float uniformly in [lo, hi)
     */
    public static uniformFloat(lo: number, hi: typeof lo): typeof lo;
    public static uniformFloat(lo: number, hi?: number) {
        if (hi === undefined) {
            hi = lo;
            lo = 0;
        }
        return lo + this.uniform() * hi;
    }
    /**
     * [0,n-1)之间的整数
     * @param n number of possible int;
     * @return a random number uniformly between 0 (inclusive) and {@code n} (exclusive)
     */
    public static uniformInt(n: number): typeof n;
    /**
     * [lo,hi)之间的整数
     * @param lo the left endpoint
     * @param hi the right endpoint
     * @return a random int uniformly in [lo, hi)
     */
    public static uniformInt(lo: number, hi: typeof lo): typeof lo;
    public static uniformInt(lo: number, hi?: number) {
        if (hi === undefined) {
            hi = lo;
            lo = 0;
        }
        return Math.ceil(lo + this.uniform() * hi);
    }
    /**
     * 返回{@code true}的概率为50%;
     * @return {@code true} with probability 1/2 and
     *         {@code false} with probability 1/2
     */
    public static bernoulli(): boolean;
    /**
     * 返回{@code true}的概率为{@code p};
     * @param  p the probability of returning {@code true}
     * @return {@code true} with probability {@code p} and
     *         {@code false} with probability {@code p}
     * @throws unless {@code 0} &le; {@code p} &le; {@code 1.0}
     */
    public static bernoulli(p: number): boolean;
    public static bernoulli(p?: number) {
        if (p === undefined) return this.bernoulli(0.5);
        if (p >= 1 || p <= 0) throw new Error("probability p must be between 0.0 and 1.0: " + p);
        return this.uniform() < p;
    }
    /**
     * 正态分布，期望值为0，标准差为1
     * @return a random real number from a standard Gaussian distribution
     *         (mean 0 and standard deviation 1).
     */
    public static gaussian(): number;
    /**
     * 正态分布，期望值为m，标准差为s
     * @param  m the mean
     * @param  s the standard deviation
     * @return a real number distributed according to the Gaussian distribution
     *         with mean {@code mu} and standard deviation {@code sigma}
     */
    public static gaussian(m: number, s: number): number;
    public static gaussian(m?: number, s?: number) {
        if (m === undefined && s === undefined) {
            let r, x, y;
            do {
                x = this.uniformFloat(-1.0, 1.0);
                y = this.uniformFloat(-1.0, 1.0);
                r = x * x + y * y;
            } while (r >= 1 || r == 0);
            return x * Math.sqrt(-2 * Math.log(r) / r);
        }
        return m + s * this.gaussian();
    }
    /**
     * 返回{@code i}的概率为{@code list[i]}
     * @param  list the probability of occurrence of each integer
     * @return a random integer from a discrete distribution:
     *         {@code i} with probability {@code list[i]}
     * @throws IllegalArgumentException if {@code list} is {@code null}
     * @throws IllegalArgumentException if sum of array entries is not (very nearly) equal to {@code 1.0}
     * @throws IllegalArgumentException unless {@code list[i] >= 0.0} for each index {@code i}
     */
    public static discrete(list: number[]): number {
        if (list == undefined) throw new Error("argument array is undefined");
        let len = list.length;
        let sum = 0;
        for (let i = 0; i < len; i++) {
            if (list[i] < 0) throw new Error("array entry " + i + " must be nonnegative: " + list[i]);
            sum += list[i];
        }
        if (sum > 1 + Number.EPSILON || sum < 1 - Number.EPSILON) throw new Error("sum of array entries does not approximately equal 1.0: " + sum);

        // the for loop may not return a value when both r is (nearly) 1.0 and when the
        // cumulative sum is less than 1.0 (as a result of floating-point roundoff error)
        while (true) {
            let r = this.uniform();
            sum = 0;
            for (let i = 0; i < len; i++) {
                sum += list[i];
                if (sum > r) return i;
            }
        }
    }
    /**
     * 将数组 {@code list}随机打乱
     * @param  list the array to shuffle
     * @throws IllegalArgumentException if {@code list} is {@code null}
     */
    public static shuffleSelf(list: any[]): void {
        let len = list.length;
        for (let i = 0; i < len; i++) {
            let r = i + this.uniformInt(len - i);     // between i and n-1
            let temp = list[i];
            list[i] = list[r];
            list[r] = temp;
        }
    }
    /**
     * 将数组 {@code list}随机打乱
     * @param  list the array to shuffle
     * @throws IllegalArgumentException if {@code a} is {@code null}
     * @return a the array to shuffle
     */
    public static shuffle(list: any[]): typeof list {
        let l = list.concat([]);
        this.shuffleSelf(l);
        return l;
    }
}
