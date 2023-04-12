/*
 * @Author       : linxiao
 * @Date         : 2023-04-10 11:51:08
 * @LastEditors  : error: git config user.name & please set dead value or install git
 * @LastEditTime : 2023-04-11 15:50:30
 * @FilePath     : /src/练习/17.ts
 * @Description  : 
 * Copyright 2023 OBKoro1, All Rights Reserved. 
 * 2023-04-10 11:51:08
 */
// Type the function PromiseAll that accepts an array of PromiseLike objects, the returning value should be Promise<T> where T is the resolved result array.

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)


declare function PromiseAll<T extends any[]>(
    values: readonly [...T]
): Promise<{ [K in keyof T] : T[K] extends Promise<infer R> ? R : T[K] }>;
// This implementation of PromiseAll accepts an array of PromiseLike objects and returns a Promise that resolves to an array of the resolved values. The returned Promise will only resolve when all the input Promises have resolved or rejected. If any of the input Promises are rejected, the returned Promise will also be rejected with the same reason.
