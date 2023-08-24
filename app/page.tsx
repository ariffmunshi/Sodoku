import SodokuGrid from '@/components/SodokuGrid';

/**
 * Renders the Home component.
 *
 * @return {JSX.Element} The main container point of application.
 */

const Home: React.FC = () => {
    return (
        <main className="w-full max-w-full flex flex-col items-center bg-gray-100">
            <h1 className="text-center text-5xl text-blue-gray-800 font-black uppercase tracking-wide mt-10 ">
                Sodoku
            </h1>
            <SodokuGrid />
        </main>
    );
};

export default Home;
