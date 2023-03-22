import { useContext } from 'react';
import Header from '../../components/Header';
import { Install } from '../../typings';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import prisma from '../../db';
import { InstallsContext } from '../../context/InstallsContext';

interface Props {
  campaignInstalls: Install[]
}

export const getStaticPaths: GetStaticPaths = async () => {

  const installs = await prisma.install.findMany();
  const campaigns: string[] = [];

  // iterates through installs to capture an array of campaign names currently in database
  for (let i = 0; i < installs.length; i++) {
    const campaign = installs[i].campaign;
    if (!campaigns.includes(campaign)) {
      campaigns.push(campaign);
    }
  }

  // all possible paths are now the campaign names
  const paths = campaigns.map((campaign) => ({
    params: {
      campaign
    },
  }))
  return { paths, fallback: 'blocking' }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const installs = await prisma.install.findMany();
  // filters installs to those matching the campaign passed into params
  const campaignInstalls = installs.filter((install) => install.campaign === params!.campaign);

  // returns filtered-down installs, to be passed to OneInstall component as props
  return {
    props: {
      campaignInstalls,
    },
    revalidate: 60,
  }
};

export default function OneInstall({ campaignInstalls }: Props): JSX.Element {

  console.log('campaign installs from props: ', campaignInstalls);

  const { installs } = useContext(InstallsContext);
  const stateInstalls: Install[] = installs.filter((installFromState: Install) => installFromState.campaign === campaignInstalls[0].campaign);
  console.log('campaign installs from state: ', stateInstalls);

  // const stateInstall = stateInstalls[0];

  let reportInstalls: Install[] = [];
  if (stateInstalls) reportInstalls = stateInstalls;

  console.log('report installs: ', reportInstalls);

  // let installComplete = "No";
  // if (install.complete === true) {
  //   installComplete = "Yes";
  // }

  // let revisitNeeded = "No";
  // if (install.revisitNeeded === true) {
  //   revisitNeeded = "Yes";
  // }

  // const router = useRouter();
  // const handleModify = (install: Install) => router.push(`/modify/${install.storeNum}`)

  // const handleDelete = (install: Install) => {

  //   const storeNumber: string = install.storeNum;

  //   const deleteOne = async () => {
  //     const response = await fetch(`/api/delete/${storeNumber}`);
  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }
  //     return await response.json();
  //   };

  //   deleteOne().then
  //     (data => alert(`Installation for store #${data.storeNum} has been deleted!`)).then
  //   router.push('/');
  // }

  return (
    <div className="flex items-center h-[150vh] w-full pt-[130px] bg-slate-200 md:pt-30 md:h-[130vh]">
      <Header />
      <p>{campaignInstalls[0].location}</p>
    </div>

    // <>
    //   <div className="flex items-center h-[150vh] w-full pt-[130px] bg-slate-200 md:pt-30 md:h-[130vh]">
    //     <Header />
    //     <div className="flex flex-col items-center w-full bg-white rounded shadow-lg p-8 pt-[60px] m-4 md:max-w-lg md:mx-auto">
    //       <h1 className="font-ptserif text-gray-700 text-4xl">{install.location}</h1>
    //       <div className="flex flex-col mt-[60px]">
    //         <p className="installInfo">Store Number: {install.storeNum}</p>
    //         <p className="installInfo">Campaign: {install.campaign}</p>
    //         <p className="installInfo">Project Manager: {install.pm}</p><br />
    //         <p className="installInfo">Install Date: {install.installDate}</p>
    //         <p className="installInfo">Install Time: {install.installTime}</p><br />
    //         <p className="installInfo">Install Vendor: {install.installer}</p>
    //         <p className="installInfo">Install Vendor Phone #: {install.installerPhone}</p>
    //         <p className="installInfo">Installer Notes: {install.installerNotes}</p><br />
    //         <p className="installInfo">Production Vendor: {install.vendorName}</p>
    //         <p className="installInfo">Production Vendor Phone #: {install.vendorPhone}</p><br />
    //         <p className="installInfo">Install Complete? {installComplete}</p>
    //         <p className="installInfo">Revisit Needed? {revisitNeeded}</p>
    //         <p className="installInfo">Revisit Date: {install.revisitDate}</p>
    //         <p className="installInfo">PM Notes: {install.pmNotes}</p>
    //         <div className="flex flex-col items-center mt-[60px]">
    //           <button
    //             onClick={() => handleModify(install)}
    //             className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-base px-4 py-2 mt-2 rounded"
    //             type="submit">Modify
    //           </button>
    //           <button
    //             onClick={() => handleDelete(install)}
    //             className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-base px-4 py-2 mt-2 rounded"
    //             type="submit">Delete
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}
