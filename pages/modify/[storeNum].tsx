import React, { useState } from 'react';
import Header from '../../components/Header'
import { Install } from '../../typings'
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { prisma } from '../../db';

interface Props {
  install: Install
}

export const getStaticPaths: GetStaticPaths = async () => {

  const installs = await prisma.install.findMany();

  const paths = installs.map(install => ({
    params: {
      storeNum: install.storeNum
    },
  }))
  return { paths, fallback: false }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const installs = await prisma.install.findMany();

  const allInstalls = installs.filter(install => install.storeNum === params!.storeNum);
  const install = allInstalls[0];

  return {
    props: {
      install,
    }
  }
};

export default function ModifyInstall({ install }: Props): JSX.Element {

  const router = useRouter();
  const [route, setRoute] = useState("");

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
    setRoute(formData.storeNum);
    console.log('form data: ', formData)
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    const updateInstall = async () => {
      const data = JSON.stringify(formData);
      const response = await fetch(`/api/updates/${route}`, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    };

    updateInstall().then((data) => {
      alert(data.location);
    })

    router.push(`/installs/${route}`);
  }

  return (
    <>
      <Header />
      <div className="flex items-center h-full w-full bg-slate-200 ">
        <div className="flex flex-col items-center h-full w-full bg-slate-200 p-8 md:max-w-md md:mx-auto">
          <h1 className="mb-6 mt-[100px]">Modify Install</h1>
          <form className="mb-6 mt-[15px] md:flex md:flex-wrap md:justify-between" onSubmit={handleSubmitUpdate}>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:mr-2" htmlFor="storeNum">Store Number</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="text" id="storeNum" name="storeNum" defaultValue={install.storeNum} onChange={handleChange} />
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
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="vendorName">Vendor Name</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="vendorName" name="vendorName" defaultValue={install.vendorName} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="vendorPhone">Vendor Phone #</label>
              <input className="border py-2 px-3 text-grey-darkest" type="tel" id="vendorPhone" name="vendorPhone" defaultValue={(install.vendorPhone)} onChange={handleChange} />
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
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="installer" name="installer" defaultValue={install.installer} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="installerPhone">Installer Phone #</label>
              <input className="border py-2 px-3 text-grey-darkest" type="tel" id="installerPhone" name="installerPhone" defaultValue={(install.installerPhone)} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="installerNotes">Installer Notes</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="installerNotes" name="installerNotes" defaultValue={(install.installerNotes)} onChange={handleChange} />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="complete">Install Complete?</label>
              <input className="border mb-[6px] ml-3 px-3 text-grey-darkest" type="checkbox" id="complete" name="complete" defaultChecked={(install.complete)} onChange={handleChange} />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="revisitNeeded">Revisit Needed?</label>
              <input className="border mb-[6px] ml-3 px-3 text-grey-darkest" type="checkbox" id="revisitNeeded" name="revisitNeeded" defaultChecked={(install.revisitNeeded)} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:mr-2" htmlFor="revisitDate">Revisit Date</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="date" id="revisitDate" name="revisitDate" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="pmNotes">PM Notes</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="pmNotes" name="pmNotes" defaultValue={(install.pmNotes)} onChange={handleChange} />
            </div>
            <button className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-base px-4 py-2 mx-auto mt-6 rounded" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
