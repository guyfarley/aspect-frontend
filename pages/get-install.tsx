import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import GetInstallHero from '../components/GetInstallHero';
import { Install } from '../typings'
import { InstallsContext } from '../context/InstallsContext';
import GetInstallTitle from '../components/GetInstallTitle';
import Footer from '../components/Footer';

export default function GetInstallForm() {

  const { installs, installOptions, setInstallOptions } = useContext(InstallsContext);
  const router = useRouter();
  const [route, setRoute] = useState("");
  let filteredInstalls: Install[] = [];

  // iterates through installs to capture an array of campaign names:
  const campaigns: string[] = installs.reduce((installArray: Install[], currentInstall: any) => {
    if (!installArray.includes(currentInstall.campaign)) {
      installArray.push(currentInstall.campaign);
    }
    return installArray;
  }, []);

  // filters installs down to only those installs for selected campaign:
  const getInstalls = (campaign: string) => {
    return filteredInstalls = installs.filter((install: Install) => install.campaign === campaign);
  }

  // calls getInstalls function to get filteredInstalls, sets those to installOptions
  const handleCampaignSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const target = event.target as HTMLSelectElement;
    getInstalls(target.value);
    setInstallOptions(filteredInstalls);
  }

  // when install selected from dropdown, route set to that install
  const handleInstallSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const target = event.target as HTMLSelectElement;
    setRoute(target.value);
  }

  // when Submit button clicked, user routed to install-specific page
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/installs/${route}`);
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <Header />
        <GetInstallTitle />
        <div className="flex flex-col items-center justify-center mt-[20px] mb-[40px] w-[100vw] px-6 py-4 md:w-[60vw] md:items-start">
          <form className="flex flex-col items-center md:items-start" onSubmit={handleSubmit}>
            <label className="mb-2 uppercase font-bold text-sm  text-gray-700 md:mr-2" htmlFor="campaigns">Campaign</label>
            <select
              className="w-[180px] border rounded pl-[6px] py-[3px]"
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
            <label className="mb-2 uppercase font-bold text-sm mt-6 text-gray-700 md:mr-2" htmlFor="campaign-installs">Install</label>
            <select
              className="w-[180px] border rounded pl-[6px] py-[3px]"
              name="campaign-installs"
              id="campaign-installs"
              onChange={handleInstallSelection}
            >
              <option className="font-roboto text-gray-400">Select Install</option>
              {installOptions.map((install: Install) => (
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
      <div className="flex flex-col items-center">
        <GetInstallHero />
        <Footer />
      </div>
    </>
  )
}