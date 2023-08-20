'use client';

import { useState } from 'react';
import { GridInput } from './SodokuGrid';

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
    value: GridInput;
    disabled: boolean;
    setSolutionGrid: (grid: GridInput[][]) => void;
}): JSX.Element => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input = parseInt(event.target.value);
        if (input >= 1 && input <= 9) {
            setInputValue(input);
            setSolutionGrid((grid: GridInput[][]): GridInput[][] => {
                const updatedGrid = [...grid];
                updatedGrid[row][column] = input;
                return updatedGrid;
            });
        } else {
            setInputValue('');
        }
    };
    return (
        <input
            type="text"
            className="grid-item"
            value={inputValue}
            data-testid="grid-item"
            disabled={disabled}
            onChange={handleChange}
        />
    );
};

export default GridItem;
