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

const gridSolution = [
    [5, 2, 7, 3, 1, 6, 4, 8, 9],
    [8, 9, 6, 5, 4, 2, 7, 3, 1],
    [3, 1, 4, 9, 8, 7, 5, 6, 2],
    [1, 7, 2, 4, 5, 3, 8, 9, 6],
    [6, 8, 9, 2, 7, 1, 3, 5, 4],
    [4, 5, 3, 6, 9, 8, 2, 1, 7],
    [9, 4, 1, 8, 2, 5, 6, 7, 3],
    [7, 6, 5, 1, 3, 4, 9, 2, 8],
    [2, 3, 8, 7, 6, 9, 1, 4, 5],
];

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
        const gridItems = await waitFor(
            () => screen.getAllByRole('input-item') as HTMLInputElement[]
        );
        gridItems.forEach((item) => {
            if (item.value) {
                expect(item).toBeDisabled();
            }
        });
    });

    it('should not disable empty fields', async () => {
        render(<SodokuGrid />);
        const gridItems = await waitFor(
            () => screen.getAllByRole('input-item') as HTMLInputElement[]
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

    it('should return with a solution', async () => {
        render(<SodokuGrid />);
        const gridInputs = await waitFor(
            () => screen.getAllByRole('input-item') as HTMLInputElement[]
        );
        const solvePuzzle = screen.getByRole('solve-puzzle');
        fireEvent.click(solvePuzzle);
        const gridEntries = gridInputs.map((ele) => +ele.value);
        expect(gridEntries).toEqual(gridSolution.flat());
    });

    it('should return return true for valid input', async () => {
        render(<SodokuGrid />);
        const gridInputs = await waitFor(() => screen.getAllByDisplayValue(''));
        const message = screen.getByRole('message');
        fireEvent.change(gridInputs[0], {
            target: {
                value: '7',
            },
        });
        const checkAnswer = screen.getByRole('check-answer');
        fireEvent.click(checkAnswer);
        expect(message).toHaveTextContent('All good!');
    });

    it('should return return false for invalid input', async () => {
        render(<SodokuGrid />);
        const gridInputs = await waitFor(() => screen.getAllByDisplayValue(''));
        const message = screen.getByRole('message');
        fireEvent.change(gridInputs[0], {
            target: {
                value: '5',
            },
        });
        const checkAnswer = screen.getByRole('check-answer');
        fireEvent.click(checkAnswer);
        expect(gridInputs[0]).toHaveClass('bg-rose-200');
        expect(message).toHaveTextContent("Something's wrong!");
    });
});
