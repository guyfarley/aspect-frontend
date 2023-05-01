import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface Campaigns {
  campaigns: string[]
}

const GetReport = ({ campaigns }: Campaigns): JSX.Element => {

  const router = useRouter();
  const [route, setRoute] = useState("");

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
    <div className="flex flex-col items-center justify-center mt-[20px] w-[100vw] px-6 py-4 md:w-[60vw] md:items-start">
      <h1 className="font-ptserif text-gray-700 text-4xl">Get full campaign report.</h1>
      <form className="flex flex-col items-center mt-[50px] md:items-start" onSubmit={handleSubmit}>
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
  )
}

export default GetReport;