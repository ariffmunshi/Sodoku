import SodokuGrid from '@/components/SodokuGrid';

/**
 * Renders the Home component.
 *
 * @return {JSX.Element} The main container point of application.
 */

const Home: React.FC = () => {
    return (
        <main className="w-full max-w-full flex flex-col items-center">
            <h1 className="text-center text-5xl text-gray-700 font-black uppercase tracking-wide">
                Sodoku
            </h1>
            <SodokuGrid />
        </main>
    );
};

export default Home;
