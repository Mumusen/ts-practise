/*
 * @Author       : error: git config user.name & please set dead value or install git
 * @Date         : 2023-04-12 15:10:03
 * @LastEditors  : error: git config user.name & please set dead value or install git
 * @LastEditTime : 2023-04-12 15:10:04
 * @FilePath     : /src/练习/2.ts
 * @Description  : 
 * Copyright 2023 OBKoro1, All Rights Reserved. 
 * 2023-04-12 15:10:03
 */
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
