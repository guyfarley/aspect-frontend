import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';


export default withPageAuthRequired(function CreateInstallForm() {

  const router = useRouter();
  const [route, setRoute] = useState("");
  const [formData, setFormData] = useState({
    pm: "",
    storeNum: "",
    location: "",
    campaign: "",
    vendorName: "",
    vendorPhone: "",
    // installDate: install.installDate,
    // installTime: install.installTime,
    installer: "",
    installerPhone: "",
    installerNotes: "",
    // complete: install.complete,
    // completionPics: install.completionPics,
    // revisitNeeded: install.revisitNeeded,
    // revisitDate: install.revisitDate,
    pmNotes: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const target = event.target as HTMLInputElement;

    setFormData({ ...formData, [target.name]: target.value });

    setRoute(formData.storeNum);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    postData();
    router.push(`/installs/${route}`);
  }

  return (
    <div className="relative flex justify-center h-full w-full px-4 py-4 lg:h-[140vh]">
      <Header />
      <div className="flex flex-col items-center h-full w-full px-4 pb-8 md:max-w-md md:mx-auto md:items-start">
        <div className="flex flex-col">
          <h1 className="font-ptserif text-gray-700 text-4xl mt-[100px]">Create a new install.</h1>
          <h1 className="font-roboto text-gray-700 text-base mt-[20px]">Fill out the form below to create your installation!</h1>
        </div>

        <form className="mb-6 mt-[60px] md:flex md:flex-wrap md:justify-between" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4 md:w-1/2">
            <label className="mb-2 uppercase font-bold text-sm  text-gray-700 md:mr-2" htmlFor="storeNum">Store Number</label>
            <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="text" id="storeNum" name="storeNum" onChange={handleChange} />
          </div>
          <div className="flex flex-col mb-4 md:w-1/2">
            <label className="mb-2 uppercase font-bold text-sm  text-gray-700 md:ml-2" htmlFor="location">Location</label>
            <input className="border py-2 px-3  text-gray-700 md:ml-2" type="text" id="location" name="location" onChange={handleChange} />
          </div>
          <div className="flex flex-col mb-4 md:w-full">
            <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="pm">Project Manager</label>
            <input className="border py-2 px-3  text-gray-700" type="text" id="pm" name="pm" onChange={handleChange} />
          </div>
          <div className="flex flex-col mb-4 md:w-full">
            <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="campaign">Campaign</label>
            <input className="border py-2 px-3  text-gray-700" type="text" id="campaign" name="campaign" onChange={handleChange} />
          </div>
          <div className="flex flex-col mb-4 md:w-full">
            <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="vendorName">Vendor Name</label>
            <input className="border py-2 px-3  text-gray-700" type="text" id="vendorName" name="vendorName" onChange={handleChange} />
          </div>
          <div className="flex flex-col mb-4 md:w-full">
            <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="vendorPhone">Vendor Phone #</label>
            <input className="border py-2 px-3  text-gray-700" type="tel" id="vendorPhone" name="vendorPhone" onChange={handleChange} />
          </div>
          {/* <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700 md:mr-2" htmlFor="installDate">Install Date</label>
              <input className="border py-2 px-3  text-gray-700 md:mr-2" type="date" id="installDate" name="installDate" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700 md:ml-2" htmlFor="installTime">Install Time</label>
              <input className="border py-2 px-3  text-gray-700 md:ml-2" type="time" id="installTime" name="installTime" onChange={handleChange} />
            </div> */}
          <div className="flex flex-col mb-4 md:w-full">
            <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="installer">Install Company</label>
            <input className="border py-2 px-3  text-gray-700" type="text" id="installer" name="installer" onChange={handleChange} />
          </div>
          <div className="flex flex-col mb-4 md:w-full">
            <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="installerPhone">Installer Phone #</label>
            <input className="border py-2 px-3  text-gray-700" type="tel" id="installerPhone" name="installerPhone" onChange={handleChange} />
          </div>
          <div className="flex flex-col mb-4 md:w-full">
            <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="installerNotes">Installer Notes</label>
            <input className="border py-2 px-3  text-gray-700" type="text" id="installerNotes" name="installerNotes" onChange={handleChange} />
          </div>
          {/* <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="complete">Install Complete?</label>
              <input className="border mb-[6px] ml-3 px-3  text-gray-700" type="checkbox" id="complete" name="complete" onChange={handleChange} />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="revisitNeeded">Revisit Needed?</label>
              <input className="border mb-[6px] ml-3 px-3  text-gray-700" type="checkbox" id="revisitNeeded" name="revisitNeeded" onChange={handleChange} />
            </div> */}
          {/* <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700 md:mr-2" htmlFor="revisitDate">Revisit Date</label>
              <input className="border py-2 px-3  text-gray-700 md:mr-2" type="date" id="revisitDate" name="revisitDate" onChange={handleChange} />
            </div> */}
          <div className="flex flex-col mb-4 md:w-full">
            <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="pmNotes">PM Notes</label>
            <input className="border py-2 px-3  text-gray-700" type="text" id="pmNotes" name="pmNotes" onChange={handleChange} />
          </div>
          <button className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-base px-4 py-2 mx-auto mt-6 rounded" type="submit">Submit</button>
        </form>
      </div>
    </div>
    // footer
  )
})