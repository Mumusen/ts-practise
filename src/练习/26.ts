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
function layoutGrid(rows: number, columns: number, items: Item[]): Grid {
    const grid: Grid = Array.from({ length: rows }, () => Array.from({ length: columns }, () => 0));

    items.forEach(item => {
        const { id, style } = item;
        let rowStart = 1, rowEnd = rows, colStart = 1, colEnd = columns;

        if (style) {
            if (style.gridRowStart !== undefined) {
                rowStart = Number(style.gridRowStart);
            }
            if (style.gridRowEnd !== undefined) {
                rowEnd = Number(style.gridRowEnd);
            }
            if (style.gridColumnStart !== undefined) {
                colStart = Number(style.gridColumnStart);
            }
            if (style.gridColumnEnd !== undefined) {
                colEnd = Number(style.gridColumnEnd);
            }
        }

        for (let i = rowStart - 1; i < rowEnd; i++) {
            for (let j = colStart - 1; j < colEnd; j++) {
                grid[i][j] = id;
            }
        }
    });

    return grid;
}

