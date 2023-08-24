import SodokuGrid from '@/components/SodokuGrid';

/**
 * Renders the Home component.
 *
 * @return {JSX.Element} The main container point of application.
 */

const Home: React.FC = () => {
    return (
        <main className="w-full max-w-full flex flex-col items-center pb-10 bg-gray-100">
            <h1 className="text-center text-5xl text-gray-700 font-black uppercase tracking-wide0">
                Sodoku
            </h1>
            <SodokuGrid />
        </main>
    );
};

export default Home;
