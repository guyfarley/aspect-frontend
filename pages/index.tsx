import React, { useContext } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { GetStaticProps } from 'next';
import prisma from '../db';
import { Install } from '../typings'
import { InstallsContext } from '../context/InstallsContext';
import Footer from '../components/Footer';
import GetReport from '../components/GetReport';
import AddInstalls from '../components/AddInstalls';
import AccessInstalls from '../components/AccessInstalls';

interface Props {
  allInstalls: Install[]
}

// upon initial page load, fetch all installs from AWS database and pass into Home component
export const getStaticProps: GetStaticProps = async () => {
  const installs = await prisma.install.findMany();
  return {
    props: {
      allInstalls: installs,
    },
    revalidate: 60,
  }
};

const Home = ({ allInstalls }: Props): JSX.Element => {

  const { installs, setInstalls } = useContext(InstallsContext);
  if (installs.length <= 1) setInstalls(allInstalls);

  // iterates through installs to capture an array of campaign names currently in database
  const campaigns: string[] = installs.reduce((installArray: Install[], currentInstall: any) => {
    if (!installArray.includes(currentInstall.campaign)) {
      installArray.push(currentInstall.campaign);
    }
    return installArray;
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Aspect Install Tracker</title>
      </Head>
      <Header />
      <Hero />
      <GetReport campaigns={campaigns} />
      <AddInstalls />
      <AccessInstalls />
      <Footer />
    </div>
  );
}

export default Home
