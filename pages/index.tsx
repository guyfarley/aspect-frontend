import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';

const Home = (): JSX.Element => {

  return (
    <div className="relative flex justify-center h-screen lg:h-[140vh] bg-slate-200">
      <Head>
        <title>Aspect Install Tracker</title>
      </Head>
      <Header />
      <main>
        <Hero />
      </main >
    </div >
  );
}

export default Home
