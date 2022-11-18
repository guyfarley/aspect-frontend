import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { InstallsContext } from '../context/InstallsContext';
import { useContext } from 'react';

export default function GetInstallForm() {

  const router = useRouter();
  const [route, setRoute] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/installs/${route}`)
    // this function will handle the data fetching upon form submission
    // on submission, routes to pages/installs/[id]
  }

  const { installs } = useContext(InstallsContext);
  console.log('installs:', installs);

  return (
    <>
      <Header />
      <div className="flex items-center h-full w-full bg-slate-200 ">
        <div className="flex flex-col items-center h-full w-full bg-slate-200 p-8 md:max-w-md md:mx-auto">
          <form className="flex items-center justify-center mt-[24vh] mb-[100vh]" onSubmit={handleSubmit}>
            <div className="flex flex-row">
              <label htmlFor="storeNumber">Store Number:</label>
              <div className="flex flex-col justify-center items-center ml-2">
                <input className="w-[100px] border rounded" type="text" id="storeNumber" name="storeNumber" onChange={(e) => setRoute(e.target.value)} required />
                <button className="submitButton" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* footer */}
    </>
  )
}