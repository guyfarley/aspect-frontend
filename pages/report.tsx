import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import { Install } from '../typings'
// import allInstalls from './api/data';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

// initial request for all item data from database - runs at buildtime

interface Props {
  allInstallData: Install[]
}

export async function getStaticProps() {

  const res = await fetch('http://localhost:3000/api/read-all');
  const data = await res.json();

  return {
    props: {
      allInstallData: data
    }
  }
}

// export const getStaticProps: GetStaticProps = () => {
//   // const data = { allInstalls };
//   const data = fetch(`/api/read-all`);

//   console.log(data);
//   return {
//     props: {
//       allInstallData: data
//     }
//   }
// };

export default function Report({ allInstallData }: Props): JSX.Element {

  console.log(allInstallData);

  return (
    <>
      <Header />
      <div className="flex items-center h-full w-full bg-slate-200 ">
        <div className="flex flex-col items-center h-full w-full bg-slate-200 mt-[24vh] p-8 md:max-w-md md:mx-auto">
          {allInstallData.map((install) => (
            console.log(install.location),
            <p key={install.storeNum}>{install.location}</p>
          ))}
        </div>
      </div>
    </>
  );
}