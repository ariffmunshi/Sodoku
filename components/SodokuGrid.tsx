'use client';

import { useEffect, useState, Fragment } from 'react';
import GridItem from './GridItem';
import Sodoku from '@/libraries/Sodoku';

export type GridInput = number | '';

const sodoku = new Sodoku();

/**
 * Renders a Sudoku grid.
 *
 * @return {JSX.Element} The rendered Sudoku grid.
 */
const SodokuGrid = () => {
    const puzzle =
        '52...6.........7.13...........4..8..6......5...........418.........3..2...87.....';
    const [initialGrid, setInitialGrid] = useState<GridInput[][]>([]);
    const [solutionGrid, setSolutionGrid] = useState<GridInput[][]>([]);

    useEffect(() => {
        const grid = sodoku.convertToGrid(puzzle);
        setInitialGrid(JSON.parse(JSON.stringify(grid)));
        setSolutionGrid(grid);
    }, []);

    return (
        <div className="grid grid-cols-9">
            {solutionGrid.map((row: GridInput[], i: number) => {
                return (
                    <Fragment key={i}>
                        {row.map((value: GridInput, j: number) => {
                            return (
                                <GridItem
                                    key={i + '-' + j}
                                    row={i}
                                    column={j}
                                    value={value}
                                    disabled={
                                        value !== '' &&
                                        value === initialGrid[i][j]
                                    }
                                    setSolutionGrid={setSolutionGrid}
                                />
                            );
                        })}
                    </Fragment>
                );
            })}
        </div>
    );
};

export default SodokuGrid;
