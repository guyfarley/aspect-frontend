import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function GetInstallForm() {

  const router = useRouter();
  const [route, setRoute] = useState("");

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
          <input className="w-[130px] border rounded pl-[6px] py-[3px]" type="text" id="storeNumber" name="storeNum" onChange={(e) => setRoute(e.target.value)} placeholder="Store #" required />
          <button className="submitButton" type="submit">Submit</button>
        </form>
      </div>
      {/* footer */}
    </div>
  )
})