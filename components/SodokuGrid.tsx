'use client';

import { useEffect, useState, Fragment } from 'react';
import GridItem from './GridItem';
import Sodoku from '@/libraries/Sodoku';

const sodoku = new Sodoku();

/**
 * Renders a Sudoku grid.
 *
 * @return {JSX.Element} The rendered Sudoku grid.
 */
const SodokuGrid = () => {
    const puzzleString =
        '837629145.4.318..2921574368.54186239163...8.7289.53416..28.56.1...241..3318967524';
    const [initialGrid, setInitialGrid] = useState<number[][]>([]);
    const [solutionGrid, setSolutionGrid] = useState<number[][]>([]);
    const [activeGridItem, setActiveGridItem] = useState<{
        row: number;
        col: number;
        value: number;
    }>();

    useEffect(() => {
        // Converts puzzle string to 2D array grid
        const grid = sodoku.convertToGrid(puzzleString);
        // Deep copy generated grid to cache original grid
        const gridCopy = grid.map((row) => [...row]);
        setInitialGrid(grid);
        setSolutionGrid(gridCopy);
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
        setSolutionGrid((grid: number[][]): number[][] => {
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
    const resetGrid = (): void => {
        const initial = initialGrid.map((row) => [...row]);
        setSolutionGrid(initial);
    };

    const solvePuzzle = (): void => {
        // Add call to solving function
    };

    const checkAnswer = (): void => {
        // Add call to check answer function
        console.log(sodoku.isValidGrid(solutionGrid));
    };

    return (
        <>
            <div className="grid grid-cols-9">
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
            <button role="reset-button" onClick={resetGrid}>
                Reset Grid
            </button>
            <button onClick={solvePuzzle}>Solve</button>
            <button onClick={checkAnswer}>Check Answer</button>
        </>
    );
};

export default SodokuGrid;
