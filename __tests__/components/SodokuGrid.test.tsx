import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SodokuGrid from '@/components/SodokuGrid';

describe('Sodoku Grid Component', () => {
    it('renders 81 grid items', () => {
        render(<SodokuGrid />);
        const gridItems = screen.getAllByRole('input-item');
        expect(gridItems.length).toBe(81);
    });

    it('disables grid items with initial numbers', () => {
        render(<SodokuGrid />);
        const gridItems = screen.getAllByRole('input-item');
        gridItems.forEach((item) => {
            if (item.value) {
                expect(item).toBeDisabled();
            }
        });
    });

    it('should not disable empty fields', () => {
        render(<SodokuGrid />);
        const gridItems = screen.getAllByRole('input-item');
        gridItems.forEach((item) => {
            if (item.value === '') {
                expect(item).not.toBeDisabled();
            }
        });
    });

    it('should reset grid on reset button click', () => {
        render(<SodokuGrid />);
        const gridInputs = screen.getAllByDisplayValue('');
        const resetButton = screen.getByRole('reset-button');
        fireEvent.change(gridInputs[0], {
            target: {
                value: '9',
            },
        });
        expect(gridInputs[0]).toHaveValue('9');
        fireEvent.click(resetButton);
        expect(gridInputs[0]).toHaveValue('');
    });
});
