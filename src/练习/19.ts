/*
 * @Author       : error: git config user.name & please set dead value or install git
 * @Date         : 2023-04-12 14:54:53
 * @LastEditors  : error: git config user.name & please set dead value or install git
 * @LastEditTime : 2023-04-12 15:07:04
 * @FilePath     : /src/练习/19.ts
 * @Description  : 
 * Copyright 2023 OBKoro1, All Rights Reserved. 
 * 2023-04-12 14:54:53
 */
// Implement the advanced util type RequiredKeys<T>, which picks all the required keys into a union.
// For example

type Result = RequiredKeys<{ foo: number; bar?: string }>;
// expected to be “foo”
// type RequiredKeys<T> = {
//   [P in keyof T as Omit<T, P> extends T ? never: P]: T[P]
// }
// type RequiredKeys<T , K = keyof T> = K extends keyof T ? T extends Required<Pick<T,K>> ? K : never
//   :never
type RequiredKeys<T, K = keyof T> = K extends keyof T ? T extends Required<Pick<T, K>> ? K : never : never;

// ----我是分割线---
// Implement Capitalize<T> which converts the first letter of a string to uppercase and leave the rest as-is.
// For example



type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
type Capitalize<T extends string> = T extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : T;

export {}
