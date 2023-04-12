/*
 * @Author       : linxiao
 * @Date         : 2023-04-10 11:47:34
 * @LastEditors  : error: git config user.name & please set dead value or install git
 * @LastEditTime : 2023-04-11 15:50:53
 * @FilePath     : /src/练习/16.ts
 * @Description  : 
 * Copyright 2023 OBKoro1, All Rights Reserved. 
 * 2023-04-10 11:47:34
 */

type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }
type GetRequired<T> = {
  [P in keyof T as Omit<T, P> extends T ? never: P]: T[P]
}
export {}
