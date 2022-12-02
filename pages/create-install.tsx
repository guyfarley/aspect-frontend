import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header'

export default function CreateInstallForm() {

  const router = useRouter();
  const [route, setRoute] = useState("");
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setRoute(formData.storeNum);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = async () => {
      const response = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    };

    postData().then((data) => {
      alert(data.location);
    });

    router.push(`/installs/${route}`);
  }

  return (
    <>
      <Header />
      <div className="flex items-center h-full w-full bg-slate-200 ">
        <div className="flex flex-col items-center h-full w-full bg-slate-200 p-8 md:max-w-md md:mx-auto">
          <h1 className="mb-6 mt-[100px]">Create A New Install</h1>
          <form className="mb-6 mt-[15px] md:flex md:flex-wrap md:justify-between" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:mr-2" htmlFor="storeNum">Store Number</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="text" id="storeNum" name="storeNum" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:ml-2" htmlFor="location">Location</label>
              <input className="border py-2 px-3 text-grey-darkest md:ml-2" type="text" id="location" name="location" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="campaign">Campaign</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="campaign" name="campaign" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="vendorName">Vendor Name</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="vendorName" name="vendorName" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="vendorPhone">Vendor Phone #</label>
              <input className="border py-2 px-3 text-grey-darkest" type="tel" id="vendorPhone" name="vendorPhone" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:mr-2" htmlFor="installDate">Install Date</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="date" id="installDate" name="installDate" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:ml-2" htmlFor="installTime">Install Time</label>
              <input className="border py-2 px-3 text-grey-darkest md:ml-2" type="time" id="installTime" name="installTime" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="installer">Install Company</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="installer" name="installer" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="installerPhone">Installer Phone #</label>
              <input className="border py-2 px-3 text-grey-darkest" type="tel" id="installerPhone" name="installerPhone" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="installerNotes">Installer Notes</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="installerNotes" name="installerNotes" onChange={handleChange} />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="complete">Install Complete?</label>
              <input className="border mb-[6px] ml-3 px-3 text-grey-darkest" type="checkbox" id="complete" name="complete" onChange={handleChange} />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="revisitNeeded">Revisit Needed?</label>
              <input className="border mb-[6px] ml-3 px-3 text-grey-darkest" type="checkbox" id="revisitNeeded" name="revisitNeeded" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:mr-2" htmlFor="revisitDate">Revisit Date</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="date" id="revisitDate" name="revisitDate" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="pmNotes">PM Notes</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="pmNotes" name="pmNotes" onChange={handleChange} />
            </div>
            <button className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-base px-4 py-2 mx-auto mt-6 rounded" type="submit">Submit</button>
          </form>
        </div>
      </div>
      {/* footer */}
    </>
  )
}