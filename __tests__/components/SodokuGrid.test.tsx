import { render, screen } from '@testing-library/react';
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
});
