interface Indexable {
    [key: string]: any;
}

interface Comparable {
    compareTo(that: this): number;
}
export { Comparable, Indexable };
