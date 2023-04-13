type trimmed = Trim<'  Helolo World '>

type pattern = ' ' | '\n' | '\t';
type Trim<S extends string> = S extends `${pattern}${infer F}` ?
    Trim<F> : S extends `${infer K}${pattern}` ?
    Trim<K> : S;
