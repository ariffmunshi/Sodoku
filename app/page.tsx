import SodokuGrid from '@/components/SodokuGrid';

/**
 * Renders the Home component.
 *
 * @return {JSX.Element} The main container point of application.
 */

const Home: React.FC = () => {
    return (
        <main className="w-full flex flex-col">
            <h1 className="text-center">Sodoku</h1>
            <SodokuGrid />
        </main>
    );
};

export default Home;
