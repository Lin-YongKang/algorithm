interface Indexable {
    [key: string]: any;
}

interface CompareTo {
    compareTo(that: this): number;
}

interface ComparableType {
    CompareTo: CompareTo;
    number: number;
    string: string;
    boolean: boolean;
}

type Comparable = ComparableType[keyof ComparableType];
type Comparables = { [P in keyof ComparableType]: ComparableType[P][] }[keyof ComparableType];

export { Comparable, Comparables, Indexable, CompareTo };
