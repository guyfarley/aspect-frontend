import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { InstallsContext } from '../context/InstallsContext';
import CreateInstallHero from '../components/CreateInstallHero';
import { Install } from '../typings';
import Footer from '../components/Footer';
import CreateInstallTitle from '../components/CreateInstallTitle';

export default function CreateInstallForm() {

  const { addStateInstall, installs } = useContext(InstallsContext);
  const router = useRouter();

  // initialize formData with correct keys and value types
  const [formData, setFormData] = useState({
    storeNum: "",
    pm: "",
    location: "",
    campaign: "",
    vendorName: "",
    vendorPhone: "",
    installDate: "",
    installTime: "",
    complete: false,
    revisitNeeded: false,
    revisitDate: "",
    installer: "",
    installerPhone: "",
    installerNotes: "",
    pmNotes: "",
  });
  const [formErrors, setFormErrors] = useState(Object);
  const [vendorPhoneInput, setVendorPhoneInput] = useState('');
  const [installerPhoneInput, setInstallerPhoneInput] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;

    if (target.name === 'vendorPhone') {
      const formattedPhoneNumber = formatPhoneNumber(target.value);
      setVendorPhoneInput(formattedPhoneNumber);
    }

    if (target.name === 'installerPhone') {
      const formattedPhoneNumber = formatPhoneNumber(target.value);
      setInstallerPhoneInput(formattedPhoneNumber);
    }

    setFormData({ ...formData, [target.name]: target.value });
    // setRoute(formData.storeNum);
  };

  // formats phone number while user types
  const formatPhoneNumber = (value: any) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6,
    )}-${phoneNumber.slice(6, 10)}`;
  }

  const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    const target = event.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.checked });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let nextErrors = validate(formData);
    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length < 1) {
      // calls addStateInstall function in InstallsContext, passes formData into it
      addStateInstall(formData);

      // passes formData to create API, to be posted to AWS database
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

      // call postData function, alert confirmation, and route user back to home page
      postData().then
      alert(`New install for Store #${formData.storeNum} has been created!`);
      router.push(`/`);
    } else {
      window.scrollTo(0, 0);
    }
  }

  const validate = (values: Install) => {
    const storeNums = installs.map((install: Install) => install.storeNum)
    const errors: any = {};

    if (!values.storeNum) {
      errors.storeNum = "Store number is required!";
    } else if (storeNums.includes(values.storeNum)) {
      errors.storeNum = "Store number already exists!"
    }
    if (!values.location) errors.location = "Store location is required!";
    if (!values.campaign) errors.campaign = "Marketing campaign is required!";
    if (!values.vendorName) errors.vendorName = "Vendor name is required!";
    if (!values.installer) errors.installer = "Installer name is required!";

    return errors;
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <Header />
        <CreateInstallTitle />
        <div className="flex flex-col items-center h-full w-full pb-8 md:max-w-md md:mx-auto md:items-start">
          <form className="mb-6 mt-[60px] md:flex md:flex-wrap md:justify-between" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700 md:mr-2" htmlFor="storeNum">Store Number<span className="text-red-500"> *</span></label>
              <input className="border py-2 px-3 text-grey-darkest md:mr-2" type="text" id="storeNum" name="storeNum" placeholder="201" onChange={handleChange} />
              <p className="text-red-500 ml-1">{formErrors.storeNum}</p>
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700 md:ml-2" htmlFor="location">Location<span className="text-red-500"> *</span></label>
              <input className="border py-2 px-3  text-gray-700 md:ml-2" type="text" id="location" name="location" placeholder="Seattle, WA" onChange={handleChange} />
              <p className="text-red-500 ml-1 md:ml-3">{formErrors.location}</p>
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="pm">Project Manager</label>
              <input className="border py-2 px-3  text-gray-700" type="text" id="pm" name="pm" placeholder="Full Name" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="campaign">Campaign<span className="text-red-500"> *</span></label>
              <input className="border py-2 px-3  text-gray-700" type="text" id="campaign" name="campaign" placeholder="Marketing Campaign" onChange={handleChange} />
              <p className="text-red-500 ml-1">{formErrors.campaign}</p>
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="vendorName">Vendor Name<span className="text-red-500"> *</span></label>
              <input className="border py-2 px-3  text-gray-700" type="text" id="vendorName" name="vendorName" onChange={handleChange} />
              <p className="text-red-500 ml-1">{formErrors.vendorName}</p>
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="vendorPhone">Vendor Phone #</label>
              <input className="border py-2 px-3  text-gray-700" type="tel" id="vendorPhone" name="vendorPhone" placeholder="(555) 123-4567" onChange={handleChange} value={vendorPhoneInput} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700 md:mr-2" htmlFor="installDate">Install Date</label>
              <input className="border py-2 px-3  text-gray-700 md:mr-2" type="date" id="installDate" name="installDate" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700 md:ml-2" htmlFor="installTime">Install Time</label>
              <input className="border py-2 px-3  text-gray-700 md:ml-2" type="time" id="installTime" name="installTime" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="installer">Install Company<span className="text-red-500"> *</span></label>
              <input className="border py-2 px-3  text-gray-700" type="text" id="installer" name="installer" onChange={handleChange} />
              <p className="text-red-500 ml-1">{formErrors.installer}</p>
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="installerPhone">Installer Phone #</label>
              <input className="border py-2 px-3  text-gray-700" type="tel" id="installerPhone" name="installerPhone" placeholder="(555) 123-4567" onChange={handleChange} value={installerPhoneInput} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="installerNotes">Installer Notes</label>
              <input className="border py-2 px-3  text-gray-700" type="text" id="installerNotes" name="installerNotes" onChange={handleChange} />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="complete">Install Complete?</label>
              <input className="border mb-[6px] ml-3 px-3  text-gray-700" type="checkbox" id="complete" name="complete" onChange={onChangeCheckbox} />
            </div>
            <div className="flex mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="revisitNeeded">Revisit Needed?</label>
              <input className="border mb-[6px] ml-3 px-3  text-gray-700" type="checkbox" id="revisitNeeded" name="revisitNeeded" onChange={onChangeCheckbox} />
            </div>
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700 md:mr-2" htmlFor="revisitDate">Revisit Date</label>
              <input className="border py-2 px-3  text-gray-700 md:mr-2" type="date" id="revisitDate" name="revisitDate" onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-2 uppercase font-bold text-sm  text-gray-700" htmlFor="pmNotes">PM Notes</label>
              <input className="border py-2 px-3  text-gray-700" type="text" id="pmNotes" name="pmNotes" onChange={handleChange} />
            </div>
            <button className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-base px-4 py-2 mx-auto mt-6 rounded" type="submit">Submit</button>
          </form>
        </div>
        <CreateInstallHero />
        <Footer />
      </div>
    </>
  )
}