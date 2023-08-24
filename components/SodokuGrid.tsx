'use client';

import { useEffect, useState, Fragment } from 'react';
import GridItem from './GridItem';
import Sodoku, { SodokuGrid } from '@/lib/Sodoku';

const sodoku = new Sodoku();

/**
 * Renders a Sodoku grid.
 *
 * @return  The rendered Sodoku grid.
 */
const SodokuGrid = (): JSX.Element => {
    const [initialGrid, setInitialGrid] = useState<SodokuGrid>([]);
    const [solutionGrid, setSolutionGrid] = useState<SodokuGrid>([]);
    const [activeGridItem, setActiveGridItem] = useState<{
        row: number;
        col: number;
        value: number;
    }>();

    /**
     * Fetches a sodoku puzzle from the server.
     *
     * @return A promise that resolves once the puzzle is fetched and the grid is initialized.
     */
    const fetchSodoku = async (): Promise<string> => {
        const response: Response = await fetch('/api/puzzles');
        const data: { puzzle: string } = await response.json();
        return data.puzzle;
    };

    /**
     * Calls function to fetch a sodoku puzzle from the server and initializes the grid.
     *
     * @return A promise that resolves once the puzzle is fetched and the grid is initialized.
     */
    const initialisePuzzle = async (): Promise<void> => {
        const puzzle: string = await fetchSodoku();
        // Converts puzzle string to 2D array grid
        const grid: SodokuGrid = sodoku.convertToGrid(puzzle);
        // Deep copy generated grid to cache original grid
        const gridCopy: SodokuGrid = grid.map((row) => [...row]);
        setInitialGrid(grid);
        setSolutionGrid(gridCopy);
    };
    // Fetch puzzle string
    useEffect(() => {
        initialisePuzzle();
    }, []);

    useEffect(() => {
        if (!activeGridItem) return;
        const { row, col, value }: { row: number; col: number; value: number } =
            activeGridItem;
        // Runs check for valid input if value is not 0
        if (value && sodoku.isValidMove(solutionGrid, row, col, value)) {
            console.log(true);
        } else {
            console.log(false);
        }
        setSolutionGrid((grid: SodokuGrid): SodokuGrid => {
            const updatedGrid = grid.map((row) => [...row]);
            updatedGrid[row][col] = value || 0;
            return updatedGrid;
        });
    }, [activeGridItem]);

    /**
     * Resets the grid to its initial state.
     *
     * Copies original grid to solution grid.
     * @return This function does not return any value.
     */
    const resetPuzzle = (): void => {
        const initial = initialGrid.map((row) => [...row]);
        setSolutionGrid(initial);
    };

    /**
     * Solves the puzzle by calling the solving function and updating the solution grid.
     *
     * @returns This function does not return anything.
     */
    const solvePuzzle = (): void => {
        // Add call to solving function
        const puzzleGrid = initialGrid.map((row) => [...row]);
        const solvedGrid = sodoku.solveSodoku(puzzleGrid);
        setSolutionGrid(solvedGrid);
    };

    /**
     * Checks the answer by calling the check answer function and logging the result.
     *
     * @returns This function does not return anything.
     */
    const checkAnswer = (): void => {
        // Add call to check answer function
        console.log(sodoku.isValidGrid(solutionGrid));
    };

    /**
     * Retrieves the puzzle by calling the initialisePuzzle function.
     *
     * @returns This function does not return anything.
     */
    const getPuzzle = (): void => {
        initialisePuzzle();
    };

    return (
        <>
            <div className="grid grid-cols-9 w-max mt-5 border-t-4 border-l-4 border-r-2 border-b-2 border-gray-600">
                {solutionGrid.map((row: number[], rowIndex: number) => {
                    return (
                        <Fragment key={rowIndex}>
                            {row.map((value: number, columnIndex: number) => {
                                return (
                                    <GridItem
                                        key={rowIndex + '-' + columnIndex}
                                        row={rowIndex}
                                        col={columnIndex}
                                        value={value}
                                        disabled={
                                            initialGrid[rowIndex][
                                                columnIndex
                                            ] !== 0
                                        }
                                        // setSolutionGrid={setSolutionGrid}
                                        setActiveGridItem={setActiveGridItem}
                                    />
                                );
                            })}
                        </Fragment>
                    );
                })}
            </div>
            <div className="flex my-5">
                <button
                    role="reset-button"
                    className="mx-4 py-2 px-4 bg-rose-600 text-white font-semibold rounded-lg shadow-md active:bg-rose-700 focus:outline-none"
                    onClick={resetPuzzle}
                >
                    Reset Puzzle
                </button>
                <button
                    role="check-answer"
                    className="mx-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md active:bg-indigo-700 focus:outline-none"
                    onClick={checkAnswer}
                >
                    Check Answer
                </button>
                <button
                    role="solve-puzzle"
                    className="mx-4 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md active:bg-emerald-700 focus:outline-none"
                    onClick={solvePuzzle}
                >
                    Solve
                </button>
                <button
                    role="new-puzzle"
                    className="mx-4 py-2 px-4 bg-cyan-600 text-white font-semibold rounded-lg shadow-md active:bg-cyan-700 focus:outline-none"
                    onClick={getPuzzle}
                >
                    New Puzzle
                </button>
            </div>
        </>
    );
};

export default SodokuGrid;
