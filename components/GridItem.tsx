import { NullableNum } from './SodokuGrid';

/**
 * Renders a grid item with an input field.
 *
 * @param value - The value to be displayed in grid item, either number or null
 * @return {JSX.Element} - The rendered grid item.
 */
const GridItem = ({ value }: { value: NullableNum }): JSX.Element => {
    return (
        <input
            type="text"
            className="grid-item"
            defaultValue={value ?? undefined}
            data-testid="grid-item"
        />
    );
};

export default GridItem;
