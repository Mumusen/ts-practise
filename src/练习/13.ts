/*
 * @Author       : linxiao
 * @Date         : 2023-04-07 15:15:45
 * @LastEditors  : linxiao
 * @LastEditTime : 2023-04-07 16:24:15
 * @FilePath     : /src/练习/13.ts
 * @Description  : 
 * Copyright 2023 OBKoro1, All Rights Reserved. 
 * 2023-04-07 15:15:45
 */
// type arr1 = ['a', 'b', 'c']
// type arr2 = [3, 2, 1]

// type head1 = First<arr1> // expected to be 'a'
// type head2 = First<arr2> // expected to be 3

// type First<T extends any[]> = T extends [infer U, ...any[]] ? U :never
// type First<T extends any[]> = T extends [] ? never : T[0]
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
// const firstElement: First<typeof Array> = 1;
// 接收 遍历，返回第一个


type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]


type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1
// type Last<T extends any[]> = T extends [...any[], infer U] ? U : never
type Last<T extends any[]> = T['length'] extends 0
  ? never
  : [never, ...T][T['length']]
