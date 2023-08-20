import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

describe('Home Page', () => {
    it('renders correct heading', () => {
        render(<Home />);

        const heading = screen.getByRole('heading');

        expect(heading).toHaveTextContent('Sodoku');
    });
});
