import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { GetStaticProps } from 'next';
import prisma from '../db';
import { Install } from '../typings'
import { InstallsContext } from '../context/InstallsContext';

interface Props {
  allInstalls: Install[]
}

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

  if (installs.length < 1) setInstalls(allInstalls);

  console.log('installs from index: ', installs);

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
