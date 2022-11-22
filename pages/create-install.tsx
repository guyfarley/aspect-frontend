import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { InstallsContext } from '../context/InstallsContext';
import { useContext } from 'react';
import Header from '../components/Header'

export default function CreateInstallForm() {

  const { installs, addInstall } = useContext(InstallsContext);
  const router = useRouter();
  const [route, setRoute] = useState("");
  const [formData, setFormData] = useState({});


  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setRoute(formData.id);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addInstall(formData);
    // console.log('Create install form submitted');
    // console.log(installs);
    // router.push(`/installs/${route}`);
  }

  return (
    <>
      <Header />
      <div className="flex items-center h-full w-full bg-slate-200 ">
        <div className="flex flex-col items-center h-full w-full bg-slate-200 p-8 md:max-w-md md:mx-auto">
          <h1 className="mb-6 mt-[100px]">Create A New Install</h1>
          <form className="mb-6 mt-[15px] md:flex md:flex-wrap md:justify-between" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:mr-2" htmlFor="store_number">Store Number</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="number" id="store_number" name="store_number" onChange={handleChange} />
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
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="vendor">Vendor Name</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="vendor" name="vendor" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="vendor_phone">Vendor Phone #</label>
              <input className="border py-2 px-3 text-grey-darkest" type="tel" id="vendor_phone" name="vendor_phone" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:mr-2" htmlFor="install_date">Install Date</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="date" id="install_date" name="install_date" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:ml-2" htmlFor="install_time">Install Time</label>
              <input className="border py-2 px-3 text-grey-darkest md:ml-2" type="time" id="install_time" name="install_time" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="installer">Install Company</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="installer" name="installer" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="installer_phone">Installer Phone #</label>
              <input className="border py-2 px-3 text-grey-darkest" type="tel" id="installer_phone" name="installer_phone" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="installer_notes">Installer Notes</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="installer_notes" name="installer_notes" onChange={handleChange} />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="complete">Install Complete?</label>
              <input className="border mb-[6px] ml-3 px-3 text-grey-darkest" type="checkbox" id="complete" name="complete" onChange={handleChange} />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="revisit">Revisit Needed?</label>
              <input className="border mb-[6px] ml-3 px-3 text-grey-darkest" type="checkbox" id="revisit" name="revisit" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:mr-2" htmlFor="revisit_date">Revisit Date</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="date" id="revisit_date" name="revisit_date" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="pm_notes">PM Notes</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="pm_notes" name="pm_notes" onChange={handleChange} />
            </div>
            <button className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-base px-4 py-2 mx-auto mt-6 rounded" type="submit">Submit</button>
          </form>
        </div>
      </div>
      {/* footer */}
    </>
  )
}