import { useContext } from 'react';
import Header from '../components/Header'
import { Install } from '../typings'
import { useRouter } from 'next/router';
import prisma from '../db';
import { InstallsContext } from '../context/InstallsContext';

interface Props {
  databaseInstalls: Install[]
}

export default function CreatedInstall(): JSX.Element {

  // console.log(databaseInstalls);
  const { installs, setInstalls, newStore } = useContext(InstallsContext);
  console.log('new store: ', newStore);

  // if (installs.length < 1) setInstalls(databaseInstalls);

  const newInstalls = installs.filter((installFromState: Install) => installFromState.storeNum === newStore.toString());
  // console.log(newInstalls);

  const install: Install = newInstalls[0];

  console.log('install: ', install);

  const router = useRouter();
  const handleModify = (install: Install) => router.push(`/modify/${install.storeNum}`)

  const handleDelete = (install: Install) => {

    const storeNumber: string = install.storeNum;

    const deleteOne = async () => {
      const response = await fetch(`/api/delete/${storeNumber}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    };

    deleteOne().then
      (data => alert(`Installation for store #${data.storeNum} has been deleted!`)).then
    router.push('/');
  }

  return (
    <>
      <div className="flex items-center h-[110vh] w-full bg-slate-200 ">
        <Header />
        <div className="flex flex-col items-center w-full bg-white rounded shadow-lg p-8 pt-[60px] m-4 md:max-w-lg md:mx-auto">
          <h1 className="font-ptserif text-gray-700 text-4xl">{install.location}</h1>

          <div className="flex flex-col mt-[60px]">

            <p className="installInfo">Store Number: {install.storeNum}</p>
            <p className="installInfo">Campaign: {install.campaign}</p>
            <p className="installInfo">Project Manager: {install.pm}</p><br />

            {/* <p>Install Date: {install.installDate}</p>
            <p>Install Time: {install.installTime}</p> */}
            <p className="installInfo">Install Vendor: {install.installer}</p>
            <p className="installInfo">Install Vendor Phone #: {install.installerPhone}</p><br />
            <p className="installInfo">Installer Notes: {install.installerNotes}</p><br />

            <p className="installInfo">Production Vendor: {install.vendorName}</p>
            <p className="installInfo">Production Vendor Phone #: {install.vendorPhone}</p><br />

            {/* <p>Install Complete? {install.complete}</p>
            <p>Revisit Needed? {install.revisitNeeded}</p>
            <p>Revisit Date: {install.revisitDate}</p> */}

            <p className="installInfo">PM Notes: {install.pmNotes}</p>
            <div className="flex flex-col items-center mt-[60px]">

              <button
                onClick={() => handleModify(install)}
                className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-base px-4 py-2 mt-2 rounded"
                type="submit">Modify
              </button>
              <button
                onClick={() => handleDelete(install)}
                className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-base px-4 py-2 mt-2 rounded"
                type="submit">Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
