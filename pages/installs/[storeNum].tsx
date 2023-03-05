import { useContext } from 'react';
import Header from '../../components/Header';
import { Install } from '../../typings';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import prisma from '../../db';
import { InstallsContext } from '../../context/InstallsContext';

interface Props {
  install: Install
}

export const getStaticPaths: GetStaticPaths = async () => {

  const installs = await prisma.install.findMany();
  const paths = installs.map((install) => ({
    params: {
      storeNum: install.storeNum
    },
  }))
  return { paths, fallback: 'blocking' }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const installs = await prisma.install.findMany();

  const allInstalls = installs.filter((install) => install.storeNum === params!.storeNum);
  const install = allInstalls[0];

  return {
    props: {
      install,
    },
    // revalidate: 60,
  }
};

export default function OneInstall({ install }: Props): JSX.Element {

  const { installs } = useContext(InstallsContext);

  const stateInstalls = installs.filter((installFromState: Install) => installFromState.storeNum === install.storeNum);
  const stateInstall = stateInstalls[0];
  if (stateInstall) install = stateInstall;

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
      <div className="flex items-center h-[150vh] w-full pt-[130px] bg-slate-200 md:pt-30 md:h-[130vh]">
        <Header />
        <div className="flex flex-col items-center w-full bg-white rounded shadow-lg p-8 pt-[60px] m-4 md:max-w-lg md:mx-auto">
          <h1 className="font-ptserif text-gray-700 text-4xl">{install.location}</h1>
          <div className="flex flex-col mt-[60px]">
            <p className="installInfo">Store Number: {install.storeNum}</p>
            <p className="installInfo">Campaign: {install.campaign}</p>
            <p className="installInfo">Project Manager: {install.pm}</p><br />
            <p className="installInfo">Install Date: {install.installDate}</p>
            <p className="installInfo">Install Time: {install.installTime}</p><br />
            <p className="installInfo">Install Vendor: {install.installer}</p>
            <p className="installInfo">Install Vendor Phone #: {install.installerPhone}</p>
            <p className="installInfo">Installer Notes: {install.installerNotes}</p><br />
            <p className="installInfo">Production Vendor: {install.vendorName}</p>
            <p className="installInfo">Production Vendor Phone #: {install.vendorPhone}</p><br />
            <p className="installInfo">Install Complete? {install.complete}</p>
            <p className="installInfo">Revisit Needed? {install.revisitNeeded}</p>
            <p className="installInfo">Revisit Date: {install.revisitDate}</p>
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
