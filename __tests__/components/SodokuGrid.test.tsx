import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SodokuGrid from '@/components/SodokuGrid';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';

const server = setupServer(
    rest.get('/api/puzzles', (req, res, ctx) => {
        return res(
            ctx.json({
                puzzle: '52...6.........7.13...........4..8..6......5...........418.........3..2...87.....',
            })
        );
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Sodoku Grid Component', () => {
    it('renders 81 grid items', async () => {
        render(<SodokuGrid />);
        const gridItems = await waitFor(() =>
            screen.getAllByRole('input-item')
        );
        expect(gridItems.length).toBe(81);
    });

    it('disables grid items with initial numbers', async () => {
        render(<SodokuGrid />);
        const gridItems = await waitFor(() =>
            screen.getAllByRole('input-item')
        );
        gridItems.forEach((item) => {
            if (item.value) {
                expect(item).toBeDisabled();
            }
        });
    });

    it('should not disable empty fields', async () => {
        render(<SodokuGrid />);
        const gridItems = await waitFor(() =>
            screen.getAllByRole('input-item')
        );
        gridItems.forEach((item) => {
            if (item.value === '') {
                expect(item).not.toBeDisabled();
            }
        });
    });

    it('should reset grid on reset button click', async () => {
        render(<SodokuGrid />);
        const gridInputs = await waitFor(() => screen.getAllByDisplayValue(''));
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
