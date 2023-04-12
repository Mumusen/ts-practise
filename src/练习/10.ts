/*
 * @Author       : linxiao
 * @Date         : 2023-04-03 11:51:11
 * @LastEditors  : linxiao
 * @LastEditTime : 2023-04-07 14:26:39
 * @FilePath     : /src/练习/10.ts
 * @Description  : 
 * Copyright 2023 OBKoro1, All Rights Reserved. 
 * 2023-04-03 11:51:11
 */
// Given an array, transform it into an object type and the key/value must be in the provided array.

// For example:

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple>
// expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

// type TupleToObject<T extends readonly string[]> = {
//   [K in T[number]]: K
// }
type TupleToObject<T extends readonly PropertyKey[]> = {
  [K in T[number]]: K
}
