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
        setInitialGrid(JSON.parse(JSON.stringify(grid)));
        setSolutionGrid(grid);
    }, []);

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
        </>
    );
};

export default SodokuGrid;
