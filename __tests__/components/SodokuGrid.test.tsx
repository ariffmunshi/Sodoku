import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SodokuGrid from '@/components/SodokuGrid';

describe('Sodoku Grid Component layout', () => {
    it('renders 81 grid items', () => {
        render(<SodokuGrid />);

        const gridItems = screen.getAllByTestId('grid-item');
        expect(gridItems.length).toBe(81);
    });
});
