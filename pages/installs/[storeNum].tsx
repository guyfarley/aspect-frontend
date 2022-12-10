import Header from '../../components/Header'
import { Install } from '../../typings'
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import prisma from '../../db';

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

export default function OneInstall({ install }: Props): JSX.Element {

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

    deleteOne().then(data => alert(`Installation for store #${data.storeNum} has been deleted!`));
    // router.push(`/modify/${install.storeNum}`)
  }

  return (
    <>
      <Header />
      <div className="flex items-center h-[120vh] w-full bg-slate-200 ">
        <div className="flex flex-col items-center w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-lg md:mx-auto">

          <h1 className="mb-6 mt-[100px] text-xl font-bold">{install.location}</h1>
          <div className="flex flex-col mt-[60px]">

            <p>Store Number: {install.storeNum}</p>
            <p>Campaign: {install.campaign}</p>
            <p>Project Manager: {install.pm}</p><br />

            {/* <p>Install Date: {install.installDate}</p>
            <p>Install Time: {install.installTime}</p> */}
            <p>Install Vendor: {install.installer}</p>
            <p>Install Vendor Phone #: {install.installerPhone}</p><br />
            <p>Installer Notes: {install.installerNotes}</p>

            <p>Production Vendor: {install.vendorName}</p>
            <p>Production Vendor Phone #: {install.vendorPhone}</p><br />

            {/* <p>Install Complete? {install.complete}</p>
            <p>Revisit Needed? {install.revisitNeeded}</p>
            <p>Revisit Date: {install.revisitDate}</p> */}

            <p>PM Notes: {install.pmNotes}</p>

            <button
              onClick={() => handleModify(install)}
              className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-lg mx-auto p-4 rounded"
              type="submit">Modify
            </button>
            <button
              onClick={() => handleDelete(install)}
              className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-lg mx-auto p-4 rounded"
              type="submit">Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
