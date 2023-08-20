'use client';

import { useEffect, useState, Fragment } from 'react';
import GridItem from './GridItem';

export type GridInput = number | '';

/**
 * Renders a Sudoku grid.
 *
 * @return {JSX.Element} The rendered Sudoku grid.
 */
const SodokuGrid = () => {
    const puzzle =
        '52...6.........7.13...........4..8..6......5...........418.........3..2...87.....';
    const [grid, setGrid] = useState<GridInput[][]>([]);

    useEffect(() => {
        setGrid(convertToGrid(puzzle));
    }, []);

    /**
     * Converts a puzzle string into a grid of numbers if .
     *
     * @param puzzle - The puzzle string to convert.
     *
     * @returns {GridInput[][]} - The 2D grid representation of the puzzle.
     */
    const convertToGrid = (puzzle: string): GridInput[][] => {
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

    return (
        <div className="grid grid-cols-9">
            {grid.map((row: GridInput[], i: number) => {
                return (
                    <Fragment key={i}>
                        {row.map((value: GridInput, j: number) => {
                            return <GridItem key={i + '-' + j} value={value} />;
                        })}
                    </Fragment>
                );
            })}
        </div>
    );
};

export default SodokuGrid;
