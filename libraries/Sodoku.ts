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
    convertToGrid = (puzzle: string): number[][] => {
        const grid: number[][] = [];
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
     * Checks if a Sudoku grid is valid.
     *
     * @param grid - The Sudoku grid to check.
     * @returns True if the Sudoku grid is valid, false otherwise.
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
     * Checks if a number can be placed in a specific cell of the Sudoku grid.
     * @param grid - The Sudoku grid.
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
     * Checks if a row in the Sudoku grid is valid.
     * @param grid - The Sudoku grid.
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
     * Checks if a column in the Sudoku grid is valid.
     * @param grid - The Sudoku grid.
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
     * Checks if a 3x3 box in the Sudoku grid is valid.
     * @param grid - The Sudoku grid.
     * @param row - The row index to check.
     * @param col - The column index to check.
     * @param num - The number to check.
     * @returns True if the box is valid, false otherwise.
     */
    isBoxValid(
        grid: SudokuGrid,
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
}

export default Sodoku;
