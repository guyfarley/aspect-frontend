import React, { useState, useContext } from 'react';
import Header from '../../components/Header'
import { Install } from '../../typings'
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import prisma from '../../db';
import { InstallsContext } from '../../context/InstallsContext';

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
  return { paths, fallback: 'blocking' }
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

  const { installs, updateStateInstall } = useContext(InstallsContext);

  const stateInstalls = installs.filter((installFromState: Install) => installFromState.storeNum === install.storeNum);
  const stateInstall = stateInstalls[0];

  if (stateInstall) install = stateInstall;

  const router = useRouter();
  const [route, setRoute] = useState("");

  // initialize formData with current install data
  const [formData, setFormData] = useState({
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
    // completionPics: install.completionPics,
    revisitNeeded: install.revisitNeeded,
    revisitDate: install.revisitDate,
    pmNotes: install.pmNotes,
  });
  const [formErrors, setFormErrors] = useState(Object);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // type assertion to access name and value properties on target
    const target = event.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
    setRoute(formData.storeNum);
  };

  const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    const target = event.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.checked });
    setRoute(formData.storeNum);
  };

  const handleSubmitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let nextErrors = validate(formData);
    setFormErrors(nextErrors);
    setIsSubmit(true);

    if (Object.keys(nextErrors).length < 1 && isSubmit === true) {
      console.log('we got here');
      updateStateInstall(formData);

      const updateInstall = async () => {
        const data = JSON.stringify(formData);
        console.log('form data being sent: ', data);
        const response = await fetch(`/api/updates/${route}`, {
          method: 'POST',
          body: data,
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return await response.json();
      }
      updateInstall().then
      router.push(`/installs/${route}`);
    } else {
      window.scrollTo(0, 0);
    }
  }

  const validate = (values: Install) => {
    // const storeNums = installs.map((install: Install) => install.storeNum)
    // console.log('store numbers: ', storeNums);

    const errors: any = {};
    if (!values.storeNum) {
      errors.storeNum = "Store number required!";
    }
    if (!values.location) {
      errors.location = "Store location required!";
    }
    if (!values.campaign) {
      errors.campaign = "Marketing campaign is required!";
    }
    if (!values.vendorName) {
      errors.vendorName = "Vendor name is required!";
    }
    if (!values.installer) {
      errors.installer = "Installer name is required!";
    }
    return errors;
  };

  return (
    <>
      <Header />
      <div className="flex items-center h-[210vh] w-full bg-slate-200 md:h-[170vh]">
        <div className="flex flex-col items-center h-full w-full bg-slate-200 p-8 md:max-w-md md:mx-auto">
          <h1 className="font-ptserif text-gray-700 text-4xl mt-[100px]">Modify Install</h1>
          <form className="mb-6 mt-[50px] md:flex md:flex-wrap md:justify-between" onSubmit={handleSubmitUpdate}>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:mr-2" htmlFor="storeNum">Store Number<span className="text-red-500"> *</span></label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="text" id="storeNum" name="storeNum" defaultValue={(formData.storeNum)} onChange={handleChange} />
              <p className="text-red-500 ml-1">{formErrors.storeNum}</p>
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:ml-2" htmlFor="location">Location<span className="text-red-500"> *</span></label>
              <input className="border py-2 px-3 text-grey-darkest md:ml-2" type="text" id="location" name="location" defaultValue={(formData.location)} onChange={handleChange} />
              <p className="text-red-500 ml-1 md:ml-3">{formErrors.location}</p>
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="pm">Project Manager</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="pm" name="pm" defaultValue={formData.pm} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="campaign">Campaign<span className="text-red-500"> *</span></label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="campaign" name="campaign" defaultValue={(formData.campaign)} onChange={handleChange} />
              <p className="text-red-500 ml-1">{formErrors.campaign}</p>
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="vendorName">Vendor Name<span className="text-red-500"> *</span></label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="vendorName" name="vendorName" defaultValue={formData.vendorName} onChange={handleChange} />
              <p className="text-red-500 ml-1">{formErrors.vendorName}</p>
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="vendorPhone">Vendor Phone #</label>
              <input className="border py-2 px-3 text-grey-darkest" type="tel" id="vendorPhone" name="vendorPhone" defaultValue={(formData.vendorPhone)} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:mr-2" htmlFor="installDate">Install Date</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="date" id="installDate" name="installDate" defaultValue={(formData.installDate)} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:ml-2" htmlFor="installTime">Install Time</label>
              <input className="border py-2 px-3 text-grey-darkest md:ml-2" type="time" id="installTime" name="installTime" defaultValue={(formData.installTime)} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="installer">Install Company<span className="text-red-500"> *</span></label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="installer" name="installer" defaultValue={formData.installer} onChange={handleChange} />
              <p className="text-red-500 ml-1">{formErrors.installer}</p>
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="installerPhone">Installer Phone #</label>
              <input className="border py-2 px-3 text-grey-darkest" type="tel" id="installerPhone" name="installerPhone" defaultValue={(formData.installerPhone)} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="installerNotes">Installer Notes</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="installerNotes" name="installerNotes" defaultValue={(formData.installerNotes)} onChange={handleChange} />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="complete">Install Complete?</label>
              <input className="border mb-[6px] ml-3 px-3 text-grey-darkest" type="checkbox" id="complete" name="complete" checked={formData.complete} onChange={onChangeCheckbox} />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="revisitNeeded">Revisit Needed?</label>
              <input className="border mb-[6px] ml-3 px-3 text-grey-darkest" type="checkbox" id="revisitNeeded" name="revisitNeeded" checked={formData.revisitNeeded} onChange={onChangeCheckbox} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest md:mr-2" htmlFor="revisitDate">Revisit Date</label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="date" id="revisitDate" name="revisitDate" defaultValue={(formData.revisitDate)} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm text-grey-darkest" htmlFor="pmNotes">PM Notes</label>
              <input className="border py-2 px-3 text-grey-darkest" type="text" id="pmNotes" name="pmNotes" defaultValue={(formData.pmNotes)} onChange={handleChange} />
            </div>
            <button className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-base px-4 py-2 mx-auto mt-6 rounded" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
