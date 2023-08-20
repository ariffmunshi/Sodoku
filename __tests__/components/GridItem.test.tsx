import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridItem from '@/components/GridItem';

describe('Grid Item Component', () => {
    it('should only accept numbers 1-9', () => {
        render(<GridItem value={null} />);
        const gridItem = screen.getByTestId('grid-item');
        fireEvent.change(gridItem, { target: { value: 9 } });
        expect(gridItem.value).toBe('9');
        fireEvent.change(gridItem, { target: { value: 11 } });
        expect(gridItem.value).toBe('');
        fireEvent.change(gridItem, { target: { value: 'a' } });
        expect(gridItem.value).toBe('');
    });
});
