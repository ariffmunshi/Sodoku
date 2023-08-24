/**
 * LIBRARY OF SODOKU FUNCTIONS
 *
 */
export type SodokuGrid = number[][];
class Sodoku {
    /**
     * Converts a puzzle string into a 9x9 grid of numbers or blanks.
     *
     * @param puzzle - The puzzle string to convert.
     *
     * @returns The 2D grid representation of the puzzle.
     */
    convertToGrid = (puzzle: string): SodokuGrid => {
        const grid: SodokuGrid = [];
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const row: number[] = [];
            for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
                puzzle[rowIndex * 9 + columnIndex] === '.'
                    ? row.push(0)
                    : row.push(+puzzle[rowIndex * 9 + columnIndex]);
            }
            grid.push(row);
        }
        return grid;
    };

    /**
     * Checks if a Sodoku grid is valid.
     *
     * @param grid - The Sodoku grid to check.
     * @returns True if the Sodoku grid is valid, false otherwise.
     */
    isValidGrid(grid: SodokuGrid): boolean {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const num = grid[row][col];
                if (num !== 0 && !this.isValidMove(grid, row, col, num)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Checks if a number can be placed in a specific cell of the Sodoku grid.
     * @param grid - The Sodoku grid.
     * @param row - The row index of the cell.
     * @param col - The column index of the cell.
     * @param num - The number to check.
     * @returns True if the number can be placed in the cell, false otherwise.
     */
    isValidMove(
        grid: SodokuGrid,
        row: number,
        col: number,
        num: number
    ): boolean {
        return (
            this.isRowValid(grid, row, col, num) &&
            this.isColumnValid(grid, row, col, num) &&
            this.isBoxValid(grid, row, col, num)
        );
    }

    /**
     * Checks if a row in the Sodoku grid is valid.
     * @param grid - The Sodoku grid.
     * @param row - The row index to check.
     * @param col - The col index to check
     * @param num - The number to check.
     * @returns True if the row is valid, false otherwise.
     */
    isRowValid(
        grid: SodokuGrid,
        row: number,
        col: number,
        num: number
    ): boolean {
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            if (grid[row][colIndex] === num && colIndex !== col) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if a column in the Sodoku grid is valid.
     * @param grid - The Sodoku grid.
     * @param row - The row index to check.
     * @param col - The column index to check.
     * @param num - The number to check.
     * @returns True if the column is valid, false otherwise.
     */
    isColumnValid(
        grid: SodokuGrid,
        row: number,
        col: number,
        num: number
    ): boolean {
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            if (grid[rowIndex][col] === num && rowIndex !== row) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if a 3x3 box in the Sodoku grid is valid.
     * @param grid - The Sodoku grid.
     * @param row - The row index to check.
     * @param col - The column index to check.
     * @param num - The number to check.
     * @returns True if the box is valid, false otherwise.
     */
    isBoxValid(
        grid: SodokuGrid,
        row: number,
        col: number,
        num: number
    ): boolean {
        const startRow: number = row - (row % 3);
        const startCol: number = col - (col % 3);
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            for (let colIndex = 0; colIndex < 3; colIndex++) {
                const currentRow = startRow + rowIndex;
                const currentCol = startCol + colIndex;
                if (
                    grid[currentRow][currentCol] === num &&
                    currentRow !== row &&
                    currentCol !== col
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Solves a Sodoku grid.
     * @param grid - The Sodoku grid to solve.
     * @returns The solved Sodoku grid, or null if no solution exists.
     */
    solveSodoku(grid: SodokuGrid): SodokuGrid | null {
        const [row, col] = this.findEmptyCell(grid);
        if (row === -1) {
            return grid;
        }

        for (let num = 1; num <= 9; num++) {
            if (this.isValidMove(grid, row, col, num)) {
                grid[row][col] = num;
                if (this.solveSodoku(grid)) {
                    return grid;
                }
                grid[row][col] = 0;
            }
        }

        return null;
    }

    /**
     * Finds the next empty cell in the Sodoku grid.
     * @param grid - The Sodoku grid to search.
     * @returns The row and column indices of the next empty cell, or [-1, -1] if no empty cell is found.
     */
    findEmptyCell(grid: SodokuGrid): [number, number] {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return [-1, -1];
    }
}

export default Sodoku;
