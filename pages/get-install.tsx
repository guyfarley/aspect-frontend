import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { GetStaticProps } from 'next';
import prisma from '../db';
import { Install } from '../typings'

interface Props {
  installs: Install[]
}

export const getStaticProps: GetStaticProps = async () => {
  const installs = await prisma.install.findMany();

  return {
    props: {
      installs,
    }
  }
};

export default withPageAuthRequired(function GetInstallForm({ installs }: Props) {

  const campaigns: string[] = [];
  let filteredInstalls: Install[] = [];
  const router = useRouter();
  const [route, setRoute] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState<Install[]>([]);

  const getCampaigns = (installs: Install[]) => {
    for (let i = 0; i < installs.length; i++) {
      const campaign = installs[i].campaign;
      if (!campaigns.includes(campaign)) {
        campaigns.push(campaign);
      }
    }
    console.log('campaigns: ', campaigns);
    return campaigns;
  }
  getCampaigns(installs);

  const getInstalls = (campaign: string) => {
    console.log('campaign: ', campaign);

    // filter installs down to only those installs for provided campaign
    filteredInstalls = installs.filter(install => install.campaign === campaign);
    console.log('filtered installs: ', filteredInstalls);
    setDynamicOptions(filteredInstalls);
  }

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const target = event.target as HTMLSelectElement;
    console.log(target.value);

    getInstalls(target.value);
    console.log('installs filtered: ', filteredInstalls);
    console.log('Dynamic Options', dynamicOptions);
    return filteredInstalls;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const getOne = async () => {
      const response = await fetch(`/api/installs/${route}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    };

    getOne();
    router.push(`/installs/${route}`);
  }
  // validate store number exists here?

  return (
    <div className="relative flex justify-center h-screen px-4 py-4 lg:h-[140vh]  bg-slate-200">
      <Header />
      <div className="flex flex-col h-full w-full mt-[100px] md:max-w-lg md:mx-auto md:items-start">

        <h1 className="font-ptserif text-gray-700 text-4xl">Looking for a specific install?</h1>
        <h1 className="font-roboto text-gray-700 text-base mt-[16px]">Just enter your store number below and submit!</h1>
        <form className="flex flex-col items-center mt-[15vh] mb-[70vh] md:items-start" onSubmit={handleSubmit}>

          <label className="mb-2 uppercase font-bold text-sm  text-gray-700 md:mr-2" htmlFor="campaigns">Choose Campaign</label>
          <select
            className="w-[130px] border rounded pl-[6px] py-[3px]"
            name="campaigns"
            id="campaigns"
            onChange={handleSelection}
          >
            <option></option>
            {campaigns.map((campaign) => (
              <option key={campaign}>
                {campaign}
              </option>
            ))}
          </select>

          {dynamicOptions && (
            <>
              <label className="mb-2 uppercase font-bold text-sm mt-6 text-gray-700 md:mr-2" htmlFor="campaign-installs">Choose Install</label>
              <select
                className="w-[130px] border rounded pl-[6px] py-[3px]"
                name="campaign-installs"
                id="campaign-installs"
                onChange={(e) => setRoute(e.target.value)}          >
                <option></option>
                {dynamicOptions.map((install) => (
                  <option key={install.storeNum} value={install.storeNum}>
                    {install.location} - Store #{install.storeNum}
                  </option>
                ))}
              </select>
            </>
          )}


          {/* <input className="w-[130px] border rounded pl-[6px] py-[3px]" type="text" id="storeNumber" name="storeNum" onChange={(e) => setRoute(e.target.value)} placeholder="Store #" required /> */}
          <button className="submitButton" type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
})