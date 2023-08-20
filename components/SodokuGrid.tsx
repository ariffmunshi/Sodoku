/**
 * Renders a grid item with an input field.
 *
 * @param {number} value - The value to be displayed in the input field.
 * @return {JSX.Element} - The rendered grid item.
 */
const GridItem = ({ value }: { value: number }) => {
    return (
        <input
            type="text"
            className="grid-item"
            defaultValue={value}
            data-testid="grid-item"
        />
    );
};

/**
 * Renders a Sudoku grid.
 *
 * @return {JSX.Element} The rendered Sudoku grid.
 */
const SodokuGrid = () => {
    const puzzle = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    return (
        <div className="grid grid-cols-9">
            {puzzle.map((row, i) => {
                return (
                    <>
                        {row.map((value, j) => {
                            return <GridItem key={i + '-' + j} value={value} />;
                        })}
                    </>
                );
            })}
        </div>
    );
};

export default SodokuGrid;
