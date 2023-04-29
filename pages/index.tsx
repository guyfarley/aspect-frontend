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
  const router = useRouter();
  const [route, setRoute] = useState("");

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

  // calls getInstalls function to get filtered-down installs, sets those to filteredInstalls
  const handleCampaignSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const target = event.target as HTMLSelectElement;
    setRoute(target.value);
  }

  // when Submit button clicked, user routed to dynamic route for the chosen install
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/reports/${route}`);
  }

  return (
    <div className="relative flex justify-center h-screen lg:h-[140vh] bg-slate-200">
      <Head>
        <title>Aspect Install Tracker</title>
      </Head>
      <Header />
      <main className="flex flex-col">
        <div className="flex flex-col h-[45vh] w-[100vw] px-6 py-4 mt-[100px] md:h-[30vh] md:w-[60vw]">
          <h1 className="font-ptserif text-gray-700 text-4xl">See your marketing,</h1>
          <h1 className="font-ptserif text-gray-700 text-4xl mb-10">delivered.</h1>
          <div className="shadow-lg">
            <Image
              src="/lights_cropped.jpg"
              alt="hands holding string lights"
              width="1280"
              height="960"
            />
          </div>
          <h3 className="font-roboto text-gray-600 text-base mt-[30px]">With Aspect, tracking your retail graphic and fixture installations has never been easier. Aspect allows you to add install information to a central database held securely in the cloud. Then you may access that install, modify its details, or delete it entirely!</h3>
          <div className="mt-[30px]">

            <h1 className="font-ptserif text-gray-700 text-4xl">Get full campaign report.</h1>
            <div className="flex justify-center md:justify-start">
              <form className="flex flex-col items-center mt-[7vh] mb-[4vh] md:items-start" onSubmit={handleSubmit}>

                <select
                  className="w-[180px] border rounded pl-[6px] py-[3px] mb-2 md:ml-2"
                  name="campaigns"
                  id="campaigns"
                  onChange={handleCampaignSelection}
                >
                  <option className="font-roboto text-gray-400">Select Campaign</option>
                  {campaigns.map((campaign) => (
                    <option className="font-roboto text-gray-600" key={campaign}>
                      {campaign}
                    </option>
                  ))}
                </select>
                <div className="md:ml-2">
                  <button className="submitButton" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
          <h1 className="font-ptserif text-gray-700 text-4xl mt-[40px]">Add your installs.</h1>
          <h3 className="font-roboto text-gray-600 text-base mt-[30px]">To add an installation simply visit the <Link href="/create-install">CREATE INSTALL</Link> page and enter the information. Once submitted, the data for that install will be posted to the central database - where it can then be accessed by your project management team, install crews, or the customer!</h3>
          <h1 className="font-ptserif text-gray-700 text-4xl mt-[40px]">Access your installs.</h1>
          <h3 className="font-roboto text-gray-600 text-base mt-[30px] mb-[30px]">To access an installation, visit the <Link href="/get-install">FIND INSTALL</Link> page and choose from the available marketing campaigns. The CHOOSE INSTALL dropdown menu will auto-populate with all installations related to that campaign. Choose the correct install location and submit, and you'll be taken to a new page showing all current data for that installation! From there, you may MODIFY or DELETE the install as needed. It's that easy!</h3>
          <div className="shadow-lg">
            <Image
              src="/laptop_1.jpg"
              alt="laptop on desk"
              width="1280"
              height="853"
            />
          </div>
          <Footer />
        </div>
      </main >
    </div >
  );
}

export default Home
