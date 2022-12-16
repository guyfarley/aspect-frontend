import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Install } from '../typings'
import { InstallsContext } from '../context/InstallsContext';

export default withPageAuthRequired(function GetInstallForm() {

  const { installs, dynamicOptions, setDynamicOptions } = useContext(InstallsContext);

  const campaigns: string[] = [];
  let filteredInstalls: Install[] = [];
  const router = useRouter();
  const [route, setRoute] = useState("");

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

  const getInstalls = (campaign: string) => {

    // filter installs down to only those installs for provided campaign
    filteredInstalls = installs.filter((install: Install) => install.campaign === campaign);
    return filteredInstalls;
  }

  const handleCampaignSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const target = event.target as HTMLSelectElement;
    console.log(target.value);

    getInstalls(target.value);
    setDynamicOptions(filteredInstalls);
    console.log('Filtered Installs: ', filteredInstalls);
  }
  console.log('Dynamic Options', dynamicOptions);
  console.log('route: ', route);

  const handleInstallSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const target = event.target as HTMLSelectElement;
    console.log('install target value: ', target.value);

    const matchingInstalls = installs.filter((location: Install) => location.storeNum === target.value)
    const oneInstall = matchingInstalls[0];
    console.log(oneInstall);
    setRoute(oneInstall.storeNum);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('route: ', route);
    // const oneInstall = installs.filter((location: Install) => location.storeNum === route);

    // const getOne = async () => {
    //   const response = await fetch(`/api/installs/${route}`);
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   return await response.json();
    // };

    // getOne();
    router.push(`/installs/${route}`);
  }

  return (
    <div className="relative flex justify-center h-screen px-6 py-4 lg:h-[140vh]">
      <Header />
      <div className="flex flex-col h-full w-full mt-[100px] pb-8 md:max-w-lg md:mx-auto md:items-start">
        <h1 className="font-ptserif text-gray-700 text-4xl">Looking for a specific install?</h1>
        <h1 className="font-roboto text-gray-600 text-base mt-[12px]">Choose your marketing campaign and installation below, and submit!</h1>
        <form className="flex flex-col items-center mt-[10vh] mb-[50vh] md:items-start" onSubmit={handleSubmit}>
          <label className="mb-2 uppercase font-bold text-sm  text-gray-700 md:mr-2" htmlFor="campaigns">Choose Campaign</label>
          <select
            className="w-[180px] border rounded pl-[6px] py-[3px]"
            name="campaigns"
            id="campaigns"
            onChange={handleCampaignSelection}
          >
            <option></option>
            {campaigns.map((campaign) => (
              <option className="font-roboto text-gray-600" key={campaign}>
                {campaign}
              </option>
            ))}
          </select>

          <label className="mb-2 uppercase font-bold text-sm mt-6 text-gray-700 md:mr-2" htmlFor="campaign-installs">Choose Install</label>
          <select
            className="w-[180px] border rounded pl-[6px] py-[3px]"
            name="campaign-installs"
            id="campaign-installs"
            onChange={handleInstallSelection}
          >
            <option></option>
            {dynamicOptions.map((install: Install) => (
              <option className="font-roboto text-gray-600" key={install.storeNum} value={install.storeNum}>
                {install.location} ({install.storeNum})
              </option>
            ))}
          </select>


          <div className="mt-[20px]">
            <button className="submitButton" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
})