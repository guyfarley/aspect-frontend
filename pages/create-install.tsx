import React from "react"
import Header from '../components/Header'

export default function CreateInstallForm() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('form submitted');
    // this function will handle the data fetching upon form submission
    // on submission, routes to pages/one-install/[id]
  }

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center px-4 py-4  bg-slate-400">
        <div className="flex items-center">
          <h1 className="font-alata text-6xl md:text-7xl">Aspect</h1>
        </div>
        <div className="flex items-center">
          <h3 className="py-2 text-xs md:text-sm">SEE YOUR MARKETING, DELIVERED</h3>
        </div>
      </div>
      <div className="flex items-center h-full w-full bg-slate-400 ">
        {/* <div> */}
        <div className="flex flex-col items-center w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          {/* <div className="w-full bg-white rounded shadow-lg p-8 m-4"> */}
          <h1 className="mb-6 mt-[100px]">Create A New Install</h1>
          <form className="mb-6 mt-[15px] md:flex md:flex-wrap md:justify-between" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest md:mr-2" htmlFor="store_number">Store Number</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="number" id="store_number" name="store_number" required />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest md:ml-2" htmlFor="location">Location</label>
              <input className="border py-2 px-3 text-grey-darkest md:ml-2" type="text" id="location" name="location" required />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="campaign">Campaign</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="campaign" name="campaign" required />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="vendor">Vendor Name</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="vendor" name="vendor" required />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="vendor_phone">Vendor Phone #</label>
              <input className="border py-2 px-3 text-grey-darkest" type="tel" id="vendor_phone" name="vendor_phone" required />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest md:mr-2" htmlFor="install_date">Install Date</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="date" id="install_date" name="install_date" required />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest md:ml-2" htmlFor="install_time">Install Time</label>
              <input className="border py-2 px-3 text-grey-darkest md:ml-2" type="time" id="install_time" name="install_time" required />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="installer">Install Company</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="installer" name="installer" required />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="installer_phone">Installer Phone #</label>
              <input className="border py-2 px-3 text-grey-darkest" type="tel" id="installer_phone" name="installer_phone" required />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="installer_notes">Installer Notes</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="installer_notes" name="installer_notes" required />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="complete">Install Complete?</label>
              <input className="border mb-[6px] ml-3 px-3 text-grey-darkest" type="checkbox" id="complete" name="complete" required />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="revisit">Revisit Needed?</label>
              <input className="border mb-[6px] ml-3 px-3 text-grey-darkest" type="checkbox" id="revisit" name="revisit" required />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest md:mr-2" htmlFor="revisit_date">Revisit Date</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="date" id="revisit_date" name="revisit_date" required />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="pm_notes">PM Notes</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="pm_notes" name="pm_notes" required />
            </div>
            <button className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Submit</button>
          </form>
        </div>
      </div>
      {/* footer */}
    </>
  )
}