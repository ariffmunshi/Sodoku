'use client';

import { useState } from 'react';

/**
 * Renders a grid item with an input field.
 *
 * @param value - The value to be displayed in grid item, either number or null
 * @return {JSX.Element} - The rendered grid item.
 */
const GridItem = ({
    row,
    column,
    value,
    disabled,
    setSolutionGrid,
}: {
    row: number;
    column: number;
    value: number;
    disabled: boolean;
    setSolutionGrid: (grid: number[][]) => number[][];
}): JSX.Element => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input = parseInt(event.target.value);
        if (input >= 1 && input <= 9) {
            setInputValue(input);
            setSolutionGrid((grid: number[][]): number[][] => {
                const updatedGrid = [...grid];
                updatedGrid[row][column] = input;
                return updatedGrid;
            });
        } else {
            setInputValue(0);
        }
    };
    return (
        <input
            type="text"
            pattern="[0-9]"
            className="grid-item"
            value={inputValue !== 0 ? inputValue : ''}
            role="input-item"
            disabled={disabled}
            onChange={handleChange}
        />
    );
};

export default GridItem;
