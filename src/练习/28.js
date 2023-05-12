/*
 * @Author       : error: git config user.name & please set dead value or install git
 * @Date         : 2023-05-05 15:19:19
 * @LastEditors  : error: git config user.name & please set dead value or install git
 * @LastEditTime : 2023-05-05 16:08:23
 * @FilePath     : /src/练习/28.js
 * @Description  : 
 * Copyright 2023 OBKoro1, All Rights Reserved. 
 * 2023-05-05 15:19:19
 */
LazyMan('Jack', console.log).eat('banana').sleepFirst(1).eat('apple').sleep(1)
// (after 10 seconds)
// Wake up after 10 seconds.
// Hi, I'm Jack.
// Eat banana
// Eat apple
// (after 1 second)
// Wake up after 1 second.async function exec() {
    

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
function LazyMan(name, fn) {
  const cmds = [['say', name]]
  const actions = {
    say: name => fn(`Hi, I'm ${name}`),
    eat: food => fn(`Eat ${food}`),
    sleep: ms => sleep(ms * 1000).then(() => fn(`Wake up after ${ms} second${ms > 1 ? 's' : ''}.`)),
  }
  Promise.resolve().then(exec)
  async function exec() {
    for (const [cmd, val] of cmds) {
      await actions[cmd](val)
    }
  }

  return {
    sleep(ms) {
      cmds.push(['sleep', ms])
      return this
    },
    sleepFirst(ms) {
      cmds.unshift(['sleep', ms])
      return this
    },
    eat(food) {
      cmds.push(['eat', food])
      return this
    }
  }
}
