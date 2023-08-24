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
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-center border border-gray-600 p-2 bg-gray-100 focus:bg-white disabled:opacity-100 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-gray-100 ${
                (row + 1) % 3 ? '' : 'border-b-4'
            }
            ${(col + 1) % 3 ? '' : 'border-r-4'}
            `}
            value={inputValue !== 0 ? inputValue : ''}
            role="input-item"
            disabled={disabled}
            onChange={handleChange}
        />
    );
};

export default GridItem;
// border-4 bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 p-2 disabled:opacity-80 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:text-white ${
//     (row + 1) % 3 ? '' : 'border-b-4 border-gray-600'
// }
