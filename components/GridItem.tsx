'use client';

import { useState } from 'react';
import { GridInput } from './SodokuGrid';

/**
 * Renders a grid item with an input field.
 *
 * @param value - The value to be displayed in grid item, either number or null
 * @return {JSX.Element} - The rendered grid item.
 */
const GridItem = ({ value }: { value: GridInput }): JSX.Element => {
    const [inputValue, setInputValue] = useState(value);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input = parseInt(event.target.value);
        if (input >= 1 && input <= 9) {
            setInputValue(input);
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
            disabled={value !== ''}
            onChange={handleChange}
        />
    );
};

export default GridItem;
