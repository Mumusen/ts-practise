/*
 * @Author       : linxiao
 * @Date         : 2023-04-07 14:10:55
 * @LastEditors  : linxiao
 * @LastEditTime : 2023-04-07 16:24:21
 * @FilePath     : /src/练习/12.ts
 * @Description  : 
 * Copyright 2023 OBKoro1, All Rights Reserved. 
 * 2023-04-07 14:10:55
 */
const add = (a:number, b:number) => a + b;
const three = add(1, 2);

// const Currying =
//   (fn, arr = []) =>
//   (...args) =>
//     ((arg) => (arg.length === fn.length ? fn(...arg) : Currying(fn, arg)))([
//       ...arr,
//       ...args
//     ]);

// 重复：重载、签名
// Function:慎用，太特殊
// function Currying<F extends (...args: any) => {}>(fn: F): Fn<Parameters<F>, ReturnType<F>>;

function Currying<F extends Function>(fn: F): CurryingFn<F>

function Currying(func) {
  return function curried(...args) {
    if(args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  }
}

// infer Fist: 如果继承变量
// type Fn<Args, R> = Args extends [infer Fist] ? (p:Fist) => R
//   : Args extends [any: infer First, ...rest: infer Rest]
//   ? (p: First) => Fn<Rest, R>
//   : never;
// add -> ()=>{} -> 行参==实参 -> add(...) ｜ ()=>{}

type CurryingFn<F extends Function> = F extends (
  first: infer First,
  ...remaining: infer Rest
) => infer Ret
  ? Rest['length'] extends 0 ? F : (first: First) => CurryingFn<(...args: Rest) => Ret>
  : never;

const curriedAdd = Currying(add);
const five = curriedAdd(2)(3);
console.log('five', five);

