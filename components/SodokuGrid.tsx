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
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [invalidIndex, setInvalidIndex] = useState<number[]>([]);
    const [activeArea, setActiveArea] = useState<{
        row: number;
        col: number;
        square: number[][];
    }>();

    // Fetch puzzle string
    useEffect(() => {
        initialisePuzzle();
    }, []);

    useEffect(() => {
        if (!activeGridItem) return;
        const { row, col, value }: { row: number; col: number; value: number } =
            activeGridItem;
        let message: string = '';
        let invalidArr: number[] = [];
        // Runs check for valid input if value is not 0
        if (value && sodoku.isValidMove(solutionGrid, row, col, value)) {
            message = 'That works!';
            invalidArr = [];
        } else if (value) {
            message = 'Invalid move!';
            invalidArr = [row, col];
        } else {
            message = '';
            invalidArr = [];
        }
        updateMessage(message);
        updateActiveArea(row, col);
        setInvalidIndex(invalidArr);
        setSolutionGrid((grid: SodokuGrid): SodokuGrid => {
            const updatedGrid = grid.map((row) => [...row]);
            updatedGrid[row][col] = value || 0;
            return updatedGrid;
        });
    }, [activeGridItem]);

    const updateActiveArea = (row: number, col: number): void => {
        const startRow: number = row - (row % 3);
        const startCol: number = col - (col % 3);
        const square: number[][] = [];
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            for (let colIndex = 0; colIndex < 3; colIndex++) {
                const currentRow = startRow + rowIndex;
                const currentCol = startCol + colIndex;
                square.push([currentRow, currentCol]);
            }
        }
        setActiveArea({
            row,
            col,
            square,
        });
    };

    /**
     * Fetches a sodoku puzzle from the server.
     *
     * @return A promise that resolves once the puzzle is fetched and the grid is initialized.
     */
    const fetchSodoku = async (): Promise<string> => {
        const response: Response = await fetch('/api/puzzles', {
            cache: 'no-store',
        });
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
        setIsLoading(false);
    };

    /**
     * Updates the message and sets a timeout to clear it after 3 seconds.
     * message - The new message to set.
     * @returns void
     */
    const updateMessage = (message: string): void => {
        setMessage(message);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    /**
     * Resets the grid to its initial state.
     *
     * Copies original grid to solution grid.
     * @return This function does not return any value.
     */
    const resetPuzzle = (): void => {
        const initial = initialGrid.map((row) => [...row]);
        updateActiveArea(9, 9);
        updateMessage('Puzzle reset');
        setInvalidIndex([]);
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
        if (solvedGrid) {
            updateMessage('There you go!');
            setSolutionGrid(solvedGrid);
        } else {
            updateMessage('Invalid grid');
            return;
        }
    };

    /**
     * Checks the answer by calling the check answer function and logging the result.
     *
     * @returns This function does not return anything.
     */
    const checkAnswer = (): void => {
        // Add call to check answer function
        const message: string = sodoku.isValidGrid(solutionGrid)
            ? 'All good!'
            : "Something's wrong!";
        updateMessage(message);
    };

    /**
     * Retrieves the puzzle by calling the initialisePuzzle function.
     *
     * @returns This function does not return anything.
     */
    const getPuzzle = (): void => {
        updateMessage('Fetching puzzle...');
        initialisePuzzle();
    };

    return (
        <>
            {isLoading ? (
                <h2
                    role="sub-heading"
                    className="text-center text-2xl text-gray-500 font-bold mt-40"
                >
                    Loading...
                </h2>
            ) : (
                <>
                    <div className="grid grid-cols-9 w-max mt-5 border-t-4 border-l-4 border-r-2 border-b-2 border-gray-600">
                        {solutionGrid.map((row: number[], rowIndex: number) => {
                            return (
                                <Fragment key={rowIndex}>
                                    {row.map(
                                        (
                                            value: number,
                                            columnIndex: number
                                        ) => {
                                            return (
                                                <GridItem
                                                    key={
                                                        rowIndex +
                                                        '-' +
                                                        columnIndex
                                                    }
                                                    row={rowIndex}
                                                    col={columnIndex}
                                                    value={value}
                                                    disabled={
                                                        initialGrid[rowIndex][
                                                            columnIndex
                                                        ] !== 0
                                                    }
                                                    isInvalid={
                                                        invalidIndex[0] ===
                                                            rowIndex &&
                                                        invalidIndex[1] ===
                                                            columnIndex
                                                    }
                                                    isActive={
                                                        activeArea?.row ===
                                                            rowIndex ||
                                                        activeArea?.col ===
                                                            columnIndex ||
                                                        activeArea?.square.some(
                                                            (arr) => {
                                                                return (
                                                                    arr[0] ===
                                                                        rowIndex &&
                                                                    arr[1] ===
                                                                        columnIndex
                                                                );
                                                            }
                                                        )
                                                    }
                                                    setActiveGridItem={
                                                        setActiveGridItem
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </Fragment>
                            );
                        })}
                    </div>
                    <p
                        role="message"
                        className={`mt-5 text-gray-700 font-bold transition-opacity duration-500 ${
                            message ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {message}
                    </p>
                    <div className="flex flex-wrap justify-center">
                        <button
                            role="reset-button"
                            className="mx-2 md:mx-4 mt-5 py-2 px-4 bg-rose-600 text-white font-semibold rounded-lg shadow-md active:bg-rose-700 focus:outline-none"
                            onClick={resetPuzzle}
                        >
                            Reset Puzzle
                        </button>
                        <button
                            role="check-answer"
                            className="mx-2 md:mx-4 mt-5 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md active:bg-indigo-700 focus:outline-none"
                            onClick={checkAnswer}
                        >
                            Check Answer
                        </button>
                        <button
                            role="solve-puzzle"
                            className="mx-2 md:mx-4 mt-5 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md active:bg-emerald-700 focus:outline-none"
                            onClick={solvePuzzle}
                        >
                            Show Answer
                        </button>
                        <button
                            role="new-puzzle"
                            className="mx-2 md:mx-4 mt-5 py-2 px-4 bg-cyan-600 text-white font-semibold rounded-lg shadow-md active:bg-cyan-700 focus:outline-none"
                            onClick={getPuzzle}
                        >
                            New Puzzle
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default SodokuGrid;
