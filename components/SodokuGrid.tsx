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

    useEffect(() => {
        // Converts puzzle string to 2D array grid
        const grid = sodoku.convertToGrid(puzzleString);
        // Deep copy generated grid to cache original grid
        const gridCopy = grid.map((row) => [...row]);
        setInitialGrid(grid);
        setSolutionGrid(gridCopy);
    }, []);

    useEffect(() => {}, [solutionGrid]);

    const resetGrid = (): void => {
        const initial = initialGrid.map((row) => [...row]);
        setSolutionGrid(initial);
    };

    const solvePuzzle = (): void => {
        // Add call to solving function
    };

    const checkAnswer = (): void => {
        // Add call to check answer function
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
                                        column={columnIndex}
                                        value={value}
                                        disabled={
                                            initialGrid[rowIndex][
                                                columnIndex
                                            ] !== 0
                                        }
                                        setSolutionGrid={setSolutionGrid}
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
