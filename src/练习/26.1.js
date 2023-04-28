/*
 * @Author       : error: git config user.name & please set dead value or install git
 * @Date         : 2023-04-27 11:11:47
 * @LastEditors  : error: git config user.name & please set dead value or install git
 * @LastEditTime : 2023-04-27 14:39:50
 * @FilePath     : /src/练习/26.1.js
 * @Description  : 
 * Copyright 2023 OBKoro1, All Rights Reserved. 
 * 2023-04-27 11:11:47
 */
/**
 * @typedef {Object} Item 
 * @property {number} id
 * @property {number | string } [gridRowStart]
 * @property {number | string } [gridRowEnd]
 * @property {number | string } [gridColumnStart]
 * @property {number | string } [gridColumnEnd]
 */

/**
 * @param {number} rows
 * @param {number} columns
 * @param {Array<Item>} items
 * @returns {number[][]}
 */

function layout(rows, columns, items) {
  let LockLev = 0;//1 释放模式 
  let LockLevTemp = 0;//存储，循环完row再使用
  let result = new Array(rows).fill(0).map(item => {
    return new Array(columns).fill(0)
  });
  items.map(item => {//添加标识
    let { style = {} } = item;
    let {
      gridRowStart,
      gridRowEnd,
    } = style;
    let obj = formatItem(style)
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        item[key] = obj[key];
      }
    }
    item._has_row_start = isNumber(gridRowStart) ? 1 : 0;//排序标识 
    item._lock_lev = gridRowStart || gridRowEnd ? 1 : 0;  //
    return item;
  }).sort((a, b) => {//类型排序
    return b._has_row_start - a._has_row_start;
  }).map(item => {
    let {
      _row_start,
      _row_span,
      _col_start,
      _col_span,
      _has_row_start,
      _lock_lev,
      id
    } = item;

    if (!_has_row_start) {// row 循环之后才有清除模式。
      LockLev = LockLevTemp;
    }
    if (_lock_lev) {
      LockLevTemp = _lock_lev;
    }
    result = result.map((row, row_index) => {//标识不可用位置
      return row.map((col, col_index) => {
        let rowLock = row.findLastIndex(i => i > 0) > col_index;
        let colLock = result.map(i => i[col_index]).findLastIndex(i => i > 0) > row_index;

        if (rowLock && colLock) { //死区检测 标识 -2
          return col > 0 ? col : -2;
        }
        if (LockLev == 1 && col == -1) {// 清除模式 清除-1
          return col > 0 ? col : 0;
        }
        return col;
      })
    })
    let col_start = _col_start || 0;
    let row_start = _row_start || 0;
    let position = true;

    while (position) {//找位置
      let b1 = result.slice(row_start, row_start + _row_span).map(item => {
        return item.slice(col_start, col_start + _col_span)
      }).flat().filter(item => { return item !== 0 });
      if (b1.length) {
        if (_col_start != null) {//指定了col ，row直接换行找               
          row_start++;
        } else {  //没指定，一个个col找
          col_start++;
          if (col_start + _col_span > columns) {
            row_start++;
            col_start = 0;
          }
        }

      } else {
        position = false;
      }
    }
    //根据找到的位置填入数据 和 锁死标识
    result = result.map((row, row_index) => {
      if (row_index < row_start) {//小于的行
        return row.map(c => {
          return c === 0 ? _has_row_start ? -1 : -2 : c
        })
      } else if (row_index >= row_start && row_index < row_start + _row_span) {//行内
        return row.map((c, c_index) => {
          if (c_index < col_start) {//小于的列
            return c === 0 ? _has_row_start || row_start != row_index ? -1 : -2 : c;// 第一行是 -2 
          } else if (c_index >= col_start && c_index < col_start + _col_span) {//列内
            return id;
          }
          return c;//大于的列
        })
      } else {//大于的行
        return row
      }
    })
  });
  result = result.map(row => {
    return row.map(col => {
      return col == -1 || col == -2 ? 0 : col;
    })
  })
  return result;
  function formatItem(style = {}) {
    let {
      gridRowStart,
      gridRowEnd,
      gridColumnStart,
      gridColumnEnd
    } = style;
    let _row_span = getSpan(gridRowStart, gridRowEnd);
    let _col_span = getSpan(gridColumnStart, gridColumnEnd);
    return {
      _row_span,
      _col_span,
      _row_start: isNumber(gridRowStart) ? gridRowStart - 1 : isNumber(gridRowEnd) ? Math.min(gridRowEnd, rows) - _row_span : null,
      _col_start: isNumber(gridColumnStart) ? gridColumnStart - 1 : isNumber(gridColumnEnd) ? Math.min(gridColumnEnd, columns) - _col_span : null
    }
  }
  function getSpan(start, end) {
    if (isNumber(start) && isNumber(end)) {
      return end - start;
    }
    if (isString(start)) {
      return getSpanNumber(start)
    }
    if (isString(end)) {
      return getSpanNumber(end)
    }
    return 1;
  }
  function getSpanNumber(s) {
    return Number(s.match(/\d/)[0])
  }
  function isNumber(n) {
    return typeof n == 'number'
  }
  function isString(s) {
    return typeof s == 'string';
  }
}
console.log(
  layout(3, 3, [
    {
      id: 1,
      style: {
        gridColumnStart: 'span 2'
      }
    },
    {
      id: 2,
      style: {
        gridColumnStart: 'span 2'
      }
    },
    {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 5
    }
  ]));
