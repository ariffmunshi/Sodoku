/**
 * LIBRARY OF SODOKU FUNCTIONS
 *
 */

class Sodoku {
    /**
     * Converts a puzzle string into a 9x9 grid of numbers or blanks.
     *
     * @param puzzle - The puzzle string to convert.
     *
     * @returns The 2D grid representation of the puzzle.
     */
    convertToGrid = (puzzle: string): GridInput[][] => {
        const grid: GridInput[][] = [];
        for (let i = 0; i < 9; i++) {
            const row: GridInput[] = [];
            for (let j = 0; j < 9; j++) {
                puzzle[i * 9 + j] === '.'
                    ? row.push('')
                    : row.push(+puzzle[i * 9 + j]);
            }
            grid.push(row);
        }
        return grid;
    };
}

export default Sodoku;
