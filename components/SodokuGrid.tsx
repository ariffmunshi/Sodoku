'use client';

import { useEffect, useState } from 'react';
import GridItem from './GridItem';

export type NullableNum = number | null;

/**
 * Renders a Sudoku grid.
 *
 * @return {JSX.Element} The rendered Sudoku grid.
 */
const SodokuGrid = () => {
    const puzzle =
        '52...6.........7.13...........4..8..6......5...........418.........3..2...87.....';
    const [grid, setGrid] = useState<NullableNum[][]>([]);

    useEffect(() => {
        setGrid(convertToGrid(puzzle));
    }, []);

    /**
     * Converts a puzzle string into a grid of nullable numbers.
     *
     * @param puzzle - The puzzle string to convert.
     *
     * @returns {NullableNum[][]} - The 2D grid representation of the puzzle.
     */
    const convertToGrid = (puzzle: string): NullableNum[][] => {
        const grid: NullableNum[][] = [];
        for (let i = 0; i < 9; i++) {
            const row: NullableNum[] = [];
            for (let j = 0; j < 9; j++) {
                puzzle[i * 9 + j] === '.'
                    ? row.push(null)
                    : row.push(+puzzle[i * 9 + j]);
            }
            grid.push(row);
        }
        return grid;
    };

    return (
        <div className="grid grid-cols-9">
            {grid.map((row: NullableNum[], i: number) => {
                return (
                    <>
                        {row.map((value: number | null, j: number) => {
                            return <GridItem key={i + '-' + j} value={value} />;
                        })}
                    </>
                );
            })}
        </div>
    );
};

export default SodokuGrid;
