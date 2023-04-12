/*
 * @Author       : error: git config user.name & please set dead value or install git
 * @Date         : 2023-04-11 15:49:42
 * @LastEditors  : error: git config user.name & please set dead value or install git
 * @LastEditTime : 2023-04-12 15:07:01
 * @FilePath     : /src/练习/18.ts
 * @Description  : 
 * Copyright 2023 OBKoro1, All Rights Reserved. 
 * 2023-04-11 15:49:42
 */
type I = Union2Intersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true

type Union2Intersection<U> = (U extends U ? (arg: U)  => void: never) extends (args: infer T) => void ? T : never;
