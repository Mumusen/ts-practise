// type Equal<A,B> = A extends B ? (B extends A ? true : false) : false;
// type Equal<A,B> = [A, B] extends [B, A] ? true : false;
type Equal<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;
type User1 = {
    name?: string,
    age: number,
    address: string
}

type User2 = {
    name?: string;
} & {
    age: number;
    address: string;
}

type Y1 = Equal<string, string>; // false
type Y2 = Equal<{name: string}, {name: string}> // true
type Y4 = Equal<{name: string}, {age: number}> // false
type Y5 = Equal<{name: string}, {name?:string}> // false
type Y6 = Equal<User1, User1> // true
type Y7 = Equal<true, boolean> // boolean
type Y8 = Equal<1 | 2, 1> // boolean
type Y9 = Equal<any, string> // true
type Y10 = Equal<{name: string}, {readonly name: string}> // true
