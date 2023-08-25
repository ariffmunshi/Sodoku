import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridItem from '@/components/GridItem';

describe('Grid Item Component', () => {
    it('should only accept numbers 1-9', () => {
        const mockFunction = jest.fn();
        render(
            <GridItem
                row={0}
                col={0}
                value={0}
                disabled={false}
                isInvalid={false}
                isActive={false}
                setActiveGridItem={mockFunction}
            />
        );
        const gridItem: HTMLInputElement = screen.getByRole('input-item');
        fireEvent.change(gridItem, { target: { value: 9 } });
        expect(gridItem.value).toBe('9');
        fireEvent.change(gridItem, { target: { value: 11 } });
        expect(gridItem.value).toBe('');
        fireEvent.change(gridItem, { target: { value: 'a' } });
        expect(gridItem.value).toBe('');
    });

    it('should not disable updated grid item', () => {
        const mockFunction = jest.fn();
        render(
            <GridItem
                row={0}
                col={0}
                value={0}
                disabled={false}
                isInvalid={false}
                isActive={false}
                setActiveGridItem={mockFunction}
            />
        );
        const gridItem: HTMLInputElement = screen.getByRole('input-item');
        fireEvent.change(gridItem, { target: { value: 9 } });
        expect(gridItem.value).toBe('9');
        expect(gridItem).not.toHaveAttribute('disabled');
    });
});
