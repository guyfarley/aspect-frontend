import Head from 'next/head';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Hero from '../components/Hero';
import { Install } from '../typings'
import allInstalls from './api/data';
import { GetStaticProps } from 'next';
import { InstallsContext } from '../context/InstallsContext';
import { useEffect, useContext } from 'react';

interface Props {
  data: Install[];
}

export const getStaticProps: GetStaticProps = async () => {

  // const res = await fetch('/api/get-form');
  // const data = await res.json();

  const data = allInstalls;

  return {
    props: {
      data
    }
  }
}

const Home = ({ data }: Props): JSX.Element => {

  const { installs, setInitialInstalls } = useContext(InstallsContext);

  useEffect(() => {
    if (installs.length < 1) {
      setInitialInstalls(data);
    }
  }, []);

  return (
    <div className="relative flex justify-center h-screen px-4 py-4 lg:h-[140vh]  bg-slate-200">
      <Head>
        <title>Aspect Install Tracker</title>
      </Head>

      <Header />
      <main>
        <Menu />
        <Hero />
      </main >
    </div >
  );
}

export default Home
