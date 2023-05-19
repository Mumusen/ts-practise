/*
 * @Author       : error: git config user.name & please set dead value or install git
 * @Date         : 2023-05-18 10:33:48
 * @LastEditors  : error: git config user.name & please set dead value or install git
 * @LastEditTime : 2023-05-18 10:36:25
 * @FilePath     : /src/练习/28.1.js
 * @Description  : 
 * Copyright 2023 OBKoro1, All Rights Reserved. 
 * 2023-05-18 10:33:48
 */
function LazyMan(name, logFn) {
  const ids = new Map();
  let delay = 0;
  const man = {
    intro: (param) => {
      ids.set(`intro-${param}`, setTimeout(() => {
        debugger
        logFn(`Hi, I'm ${param}.`);
      }, delay));
      return man;
    },
    eat: (param) => {
      ids.set(`eat-${param}`, setTimeout(() => logFn(`Eat ${param}.`), delay));
      return man;
    },
    sleep: (param) => {
      delay += param * 1000;
      setTimeout(() => logFn(`Wake up after ${param} second${param > 1 ? 's' : ''}.`), delay);
      return man;
    },
    sleepFirst: (param) => {
      man.sleep(param);
      for (const [name, timeout] of ids) {
        clearTimeout(timeout);
        const [n, p] = name.split('-');
        man[n](p);
      }
      return man;
    }
  }
  man.intro(name);
  return man;
}

LazyMan('Jack', console.log).eat('banana').sleepFirst(10).eat('apple').sleep(1)
