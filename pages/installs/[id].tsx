import Header from '../../components/Header'
import allInstalls from '../../data';
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

export default function OneInstall({ install }: Props): JSX.Element {

  const router = useRouter();
  const { installs } = useContext(InstallsContext);
  const stateInstalls = installs.filter(installFromState => installFromState.id.toString() === install.id);
  const stateInstall = stateInstalls[0];

  if (stateInstall) {
    install = stateInstall;
  }

  const handleClick = (install: Install) => {
    router.push(`/modify/${install.id}`)
  }

  console.log('install data:', install);

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

            <p>Install Date: {install.installDate}</p>
            <p>Install Time: {install.installTime}</p>
            <p>Install Vendor: {install.installer}</p>
            <p>Install Vendor Phone #: {install.installerPhone}</p><br />
            <p>Installer Notes: {install.installerNotes}</p>

            <p>Production Vendor: {install.vendorName}</p>
            <p>Production Vendor Phone #: {install.vendorPhone}</p><br />

            <p>Install Complete? {install.complete}</p>
            <p>Revisit Needed? {install.revisitNeeded}</p>
            <p>Revisit Date: {install.revisitDate}</p>

            <p>PM Notes: {install.pmNotes}</p>

            <button onClick={() => handleClick(install)} className="block bg-slate-600 hover:bg-slate-400 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Modify
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
