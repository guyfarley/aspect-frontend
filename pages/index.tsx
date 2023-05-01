import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { GetStaticProps } from 'next';
import prisma from '../db';
import { Install } from '../typings'
import { InstallsContext } from '../context/InstallsContext';
import Image from 'next/image'
import Footer from '../components/Footer';
import Link from 'next/link';
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
  const campaigns: string[] = [];
  // const router = useRouter();
  // const [route, setRoute] = useState("");

  if (installs.length <= 1) setInstalls(allInstalls);

  // iterates through installs to capture an array of campaign names currently in database
  const getCampaigns = (installs: Install[]) => {
    for (let i = 0; i < installs.length; i++) {
      const campaign = installs[i].campaign;
      if (!campaigns.includes(campaign)) {
        campaigns.push(campaign);
      }
    }
    return campaigns;
  }
  getCampaigns(installs);

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
