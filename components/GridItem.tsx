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
    col,
    value,
    disabled,
    setActiveGridItem,
}: {
    row: number;
    col: number;
    value: number;
    disabled: boolean;
    setActiveGridItem: (gridItem: {
        row: number;
        col: number;
        value: number;
    }) => void;
}): JSX.Element => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    /**
     * Handles the change event of the input element.
     *
     * Allows only inputs 1-9, sets as 0 other wise
     * Updates state with new input value
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input = parseInt(event.target.value);
        if (input >= 1 && input <= 9) {
            // sends input to parent if valid
            setActiveGridItem({ row, col, value: input });
            setInputValue(input);
        } else {
            // sends 0 for all invalid inputs including empty string
            setActiveGridItem({ row, col, value: 0 });
            setInputValue(0);
        }
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
