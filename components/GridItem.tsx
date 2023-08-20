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

export default GridItem;
