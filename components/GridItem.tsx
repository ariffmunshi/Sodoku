'use client';

import { useState, useEffect } from 'react';

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
    setSolutionGrid: (grid: number[][]) => void;
}): JSX.Element => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input = parseInt(event.target.value);
        if (input >= 1 && input <= 9) {
            setInputValue(input);
        } else {
            setInputValue(0);
        }
        setSolutionGrid((grid: number[][]): number[][] => {
            const updatedGrid = grid.map((row) => [...row]);
            updatedGrid[row][column] = input || 0;
            return updatedGrid;
        });
    };
    return (
        <input
            type="text"
            pattern="[1-9]"
            className="grid-item"
            value={inputValue !== 0 ? inputValue : ''}
            role="input-item"
            disabled={disabled}
            onChange={handleChange}
        />
    );
};

export default GridItem;
