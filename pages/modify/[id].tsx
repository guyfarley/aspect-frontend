import React, { useState } from 'react';
import Header from '../../components/Header'
import allInstalls from '../api/data';
import { Install } from '../../typings'
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { InstallsContext } from '../../context/InstallsContext';
import { useContext } from 'react';

interface Props {
  install: Install
}

export const getStaticPaths: GetStaticPaths = () => {
  const data = allInstalls;
  const paths = data.map(install => ({
    params: {
      id: install.id.toString()
    },
  }))
  return { paths, fallback: false }
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const data = allInstalls;
  const installs = data.filter(install => install.id.toString() === params!.id);
  const install = installs[0];

  return {
    props: {
      install,
    }
  }
};

export default function ModifyInstall({ install }: Props): JSX.Element {

  const { installs, updateInstall } = useContext(InstallsContext);

  console.log('Installs: ', installs)

  const stateInstall = (installs.filter(installFromState => installFromState.id === install.id))[0];

  if (stateInstall) install = stateInstall;

  const [formData, setFormData] = useState({
    id: install.id,
    pm: install.pm,
    storeNum: install.storeNum,
    location: install.location,
    campaign: install.campaign,
    vendorName: install.vendorName,
    vendorPhone: install.vendorPhone,
    installDate: install.installDate,
    installTime: install.installTime,
    installer: install.installer,
    installerPhone: install.installerPhone,
    installerNotes: install.installerNotes,
    complete: install.complete,
    completionPics: install.completionPics,
    revisitNeeded: install.revisitNeeded,
    revisitDate: install.revisitDate,
    pmNotes: install.pmNotes,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setRoute(formData.id);
  };

  const router = useRouter();
  const [route, setRoute] = useState("");
  // this function will handle the data fetching upon form submission
  // on submission, routes to pages/installs/[id]
  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    console.log('New install data: ', formData);
    console.log('Route: ', route);
    updateInstall(formData);
    router.push(`/installs/${route}`);
  }

  return (
    <>
      <Header />
      <div className="flex items-center h-full w-full bg-slate-200 ">
        <div className="flex flex-col items-center h-full w-full bg-slate-200 p-8 md:max-w-md md:mx-auto">
          {/* <div className="w-full bg-white rounded shadow-lg p-8 m-4"> */}
          <h1 className="mb-6 mt-[100px]">Modify Install</h1>
          <form className="mb-6 mt-[15px] md:flex md:flex-wrap md:justify-between" onSubmit={handleSubmitUpdate}>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:mr-2" htmlFor="store_number">Store Number</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="number" id="store_number" name="storeNum" defaultValue={(install.storeNum).toString()} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:ml-2" htmlFor="location">Location</label>
              <input className="border py-2 px-3 text-grey-darkest md:ml-2" type="text" id="location" name="location" defaultValue={(install.location)} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="campaign">Campaign</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="campaign" name="campaign" defaultValue={(install.campaign)} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="vendor">Vendor Name</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="vendor" name="vendorName" defaultValue={install.vendorName} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="vendor_phone">Vendor Phone #</label>
              <input className="border py-2 px-3 text-grey-darkest" type="tel" id="vendor_phone" name="vendorPhone" defaultValue={(install.vendorPhone).toString()} onChange={handleChange} />
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
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="installer" name="installer" defaultValue={install.installer} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="installer_phone">Installer Phone #</label>
              <input className="border py-2 px-3 text-grey-darkest" type="tel" id="installer_phone" name="installerPhone" defaultValue={(install.installerPhone).toString()} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="installer_notes">Installer Notes</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="installer_notes" name="installerNotes" defaultValue={(install.installerNotes)} onChange={handleChange} />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="complete">Install Complete?</label>
              <input className="border mb-[6px] ml-3 px-3 text-grey-darkest" type="checkbox" id="complete" name="complete" defaultChecked={(install.complete)} onChange={handleChange} />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="revisit">Revisit Needed?</label>
              <input className="border mb-[6px] ml-3 px-3 text-grey-darkest" type="checkbox" id="revisit" name="revisitNeeded" defaultChecked={(install.revisitNeeded)} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:mr-2" htmlFor="revisit_date">Revisit Date</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="date" id="revisit_date" name="revisit_date" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="pm_notes">PM Notes</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="pm_notes" name="pmNotes" defaultValue={(install.pmNotes)} onChange={handleChange} />
            </div>
            <button className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-base px-4 py-2 mx-auto mt-6 rounded" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
