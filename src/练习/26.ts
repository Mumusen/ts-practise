/*
 * @Author       : error: git config user.name & please set dead value or install git
 * @Date         : 2023-04-19 14:38:29
 * @LastEditors  : error: git config user.name & please set dead value or install git
 * @LastEditTime : 2023-04-19 16:15:28
 * @FilePath     : /src/练习/26.ts
 * @Description  : 
 * Copyright 2023 OBKoro1, All Rights Reserved. 
 * 2023-04-19 14:38:29
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
type Grid = Array<Array<number>>
type Item = {
  id: number,
  style?: {
    gridRowStart?: number | string,
    gridRowEnd?: number | string,
    gridColumnStart?: number | string
    gridColumnEnd?: number | string
  }
}
function layout(rows: number, columns: number, items: Array<Item>): Grid {
  const grid: Grid = Array(rows).fill(null).map(() => Array(columns).fill(0));
  let currentRow = 0;
  let currentColumn = 0;

  for (const item of items) {
    if (item.style) {
      const {
        gridRowStart,
        gridRowEnd,
        gridColumnStart,
        gridColumnEnd
      } = item.style;

      if (gridRowStart) {
        currentRow = getRow(gridRowStart);
      }

      if (gridColumnStart) {
        currentColumn = getColumn(gridColumnStart);
      }

      for (let row = currentRow; row < Math.min(rows, getRow(gridRowEnd || rows + 1)); row++) {
        for (let column = currentColumn; column < Math.min(columns, getColumn(gridColumnEnd || columns + 1)); column++) {
          if (grid[row][column] === 0) {
            grid[row][column] = item.id;
          }
        }
      }

      if (!gridRowEnd || getRow(gridRowEnd) === rows) {
        currentColumn += 1;
      } else if (!gridColumnEnd || getColumn(gridColumnEnd) === columns) {
        currentRow += 1;
        currentColumn = 0;
      }
    } else {
      while (grid[currentRow][currentColumn] !== 0) {
        currentColumn += 1;
        if (currentColumn === columns) {
          currentRow += 1;
          currentColumn = 0;
        }
      }
      grid[currentRow][currentColumn] = item.id;
      currentColumn += 1;
    }
  }

  return grid;

  function getRow(value: number | string): number {
    if (typeof value === 'number') {
      return value - 1;
    } else {
      const span = parseInt(value.split(' ')[1], 10);
      return currentRow + span > rows ? rows - span : currentRow;
    }
  }

  function getColumn(value: number | string): number {
    if (typeof value === 'number') {
      return value - 1;
    } else {
      const span = parseInt(value.split(' ')[1], 10);
      return currentColumn + span > columns ? columns - span : currentColumn;
    }
  }
}
