import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import GetInstallHero from '../components/GetInstallHero';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Install } from '../typings'
import { InstallsContext } from '../context/InstallsContext';

export default withPageAuthRequired(function GetInstallForm() {

  const { installs, setInstalls, dynamicOptions, setDynamicOptions } = useContext(InstallsContext);
  const campaigns: string[] = [];
  let filteredInstalls: Install[] = [];
  const router = useRouter();
  const [route, setRoute] = useState("");


  // const storedInstalls = JSON.parse(localStorage.getItem('localStorageInstalls') || "");
  // if (storedInstalls) {
  //   setInstalls(storedInstalls);
  // }

  // localStorage.setItem('localStorageInstalls', JSON.stringify(installs));


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

  // filter installs down to only those installs for provided campaign
  const getInstalls = (campaign: string) => {
    filteredInstalls = installs.filter((install: Install) => install.campaign === campaign);
    return filteredInstalls;
  }

  // calls getInstalls function to get filtered-down installs, sets those to filteredInstalls
  const handleCampaignSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const target = event.target as HTMLSelectElement;
    getInstalls(target.value);
    setDynamicOptions(filteredInstalls);
  }

  // when install selected from dropdown, route set to that install
  const handleInstallSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const target = event.target as HTMLSelectElement;
    const matchingInstalls = installs.filter((location: Install) => location.storeNum === target.value)
    const oneInstall = matchingInstalls[0];
    setRoute(oneInstall.storeNum);
  }

  // when Submit button clicked, user routed to dynamic route for the chosen install
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/installs/${route}`);
  }

  return (
    <>
      <div className="relative flex justify-center px-6 py-4">
        <Header />
        <div className="flex flex-col h-full w-full mt-[100px] pb-8 md:max-w-lg md:mx-auto md:items-start">
          <h1 className="font-ptserif text-gray-700 text-4xl">Looking for a specific install?</h1>
          <h1 className="font-roboto text-gray-600 text-base mt-[12px]">Choose your marketing campaign and installation below, and submit!</h1>
          <form className="flex flex-col items-center mt-[8vh] mb-[5vh] md:items-start" onSubmit={handleSubmit}>
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
      <div className="flex flex-col items-center mb-[5vh]">
        <GetInstallHero />
      </div>
    </>
  )
})