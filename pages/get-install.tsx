import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default function GetInstallForm() {

  const [route, setRoute] = useState("");

  return (
    <>
      <Header />
      <div className="flex items-center h-full w-full bg-slate-200 ">
        <div className="flex flex-col items-center h-full w-full bg-slate-200 p-8 md:max-w-md md:mx-auto">
          <form className="flex items-center justify-center mt-[24vh] mb-[100vh]" >
            <div className="flex flex-row">
              <label htmlFor="storeNumber">Store Number:</label>
              <div className="flex flex-col justify-center items-center ml-2">
                <input className="w-[100px] border rounded" type="text" id="storeNumber" name="storeNumber" onChange={(e) => setRoute(e.target.value)} required />
                <Link
                  href={`/installs/[id]`}
                  as={`/installs/${route}`}
                >
                  <button className="submitButton" type="submit">Submit</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* footer */}
    </>
  )
}