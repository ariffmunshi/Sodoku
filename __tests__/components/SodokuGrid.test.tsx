import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SodokuGrid from '@/components/SodokuGrid';

describe('Sodoku Grid Component', () => {
    it('renders 81 grid items', () => {
        render(<SodokuGrid />);

        const gridItems = screen.getAllByTestId('grid-item');
        expect(gridItems.length).toBe(81);
    });

    it('disables grid items with numbers', () => {
        render(<SodokuGrid />);
        const gridItems = screen.getAllByTestId('grid-item');
        gridItems.forEach((item) => {
            if (item.value) {
                expect(item).toBeDisabled();
            }
        });
    });
});
