import Head from 'next/head';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Hero from '../components/Hero';
import { Install } from '../typings'
import { GetServerSideProps } from 'next';
import { InstallsContext } from '../context/InstallsContext';
import { useEffect, useContext } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Props {
  data: Install[];
}

export const getServerSideProps: GetServerSideProps = async () => {

  const installs = await prisma.install.findMany();

  return {
    props: {
      data: installs
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
