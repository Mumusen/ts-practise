// Implement the built-in ReturnType<T> generic without using it.
// For example

const fn = (v: boolean) => {
  if (v) return 1
  else return 2
}

type a = MyReturnType<typeof fn>

type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any[]
) => infer P
  ? P
  : never
