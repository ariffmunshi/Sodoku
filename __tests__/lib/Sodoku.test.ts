import Sodoku from '@/lib/Sodoku';

describe('Sodoku', () => {
    let sodoku: Sodoku;

    beforeEach(() => {
        sodoku = new Sodoku();
    });

    describe('convertToGrid', () => {
        it('should convert a puzzle string into a 9x9 grid of numbers or blanks', () => {
            const puzzle =
                '52...6.........7.13...........4..8..6......5...........418.........3..2...87.....';
            const expectedGrid = [
                [5, 2, 0, 0, 0, 6, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 7, 0, 1],
                [3, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 4, 0, 0, 8, 0, 0],
                [6, 0, 0, 0, 0, 0, 0, 5, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 4, 1, 8, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 0, 2, 0],
                [0, 0, 8, 7, 0, 0, 0, 0, 0],
            ];
            const result = sodoku.convertToGrid(puzzle);
            expect(result).toEqual(expectedGrid);
        });
    });

    describe('isValidGrid', () => {
        it('should return true for a valid Sodoku grid', () => {
            const grid = [
                [5, 2, 0, 0, 0, 6, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 7, 0, 1],
                [3, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 4, 0, 0, 8, 0, 0],
                [6, 0, 0, 0, 0, 0, 0, 5, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 4, 1, 8, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 0, 2, 0],
                [0, 0, 8, 7, 0, 0, 0, 0, 0],
            ];
            const result = sodoku.isValidGrid(grid);
            expect(result).toBe(true);
        });

        it('should return false for an invalid Sodoku grid', () => {
            const grid = [
                [5, 2, 5, 0, 0, 6, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 7, 0, 1],
                [3, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 4, 0, 0, 8, 0, 0],
                [6, 0, 0, 0, 0, 0, 0, 5, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 4, 1, 8, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 0, 2, 0],
                [0, 0, 8, 7, 0, 0, 0, 0, 0],
            ];
            const result = sodoku.isValidGrid(grid);
            expect(result).toBe(false);
        });
    });

    describe('solvePuzzle', () => {
        it('should return correct solution', () => {
            const grid = [
                [5, 2, 0, 0, 0, 6, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 7, 0, 1],
                [3, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 4, 0, 0, 8, 0, 0],
                [6, 0, 0, 0, 0, 0, 0, 5, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 4, 1, 8, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 0, 2, 0],
                [0, 0, 8, 7, 0, 0, 0, 0, 0],
            ];
            const solution = [
                [5, 2, 7, 3, 1, 6, 4, 8, 9],
                [8, 9, 6, 5, 4, 2, 7, 3, 1],
                [3, 1, 4, 9, 8, 7, 5, 6, 2],
                [1, 7, 2, 4, 5, 3, 8, 9, 6],
                [6, 8, 9, 2, 7, 1, 3, 5, 4],
                [4, 5, 3, 6, 9, 8, 2, 1, 7],
                [9, 4, 1, 8, 2, 5, 6, 7, 3],
                [7, 6, 5, 1, 3, 4, 9, 2, 8],
                [2, 3, 8, 7, 6, 9, 1, 4, 5],
            ];
            const result = sodoku.solveSodoku(grid);
            expect(result).toEqual(solution);
        });
    });
});
