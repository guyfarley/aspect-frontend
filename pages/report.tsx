import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import { Install } from '../typings'
import { GetServerSideProps } from 'next';
import prisma from '../db';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

interface Props {
  data: Install[]
}

export const getServerSideProps: GetServerSideProps = async () => {

  const installs = await prisma.install.findMany();

  return {
    props: {
      data: installs
    }
  }
}

export default withPageAuthRequired(function Report({ data }: Props): JSX.Element {

  return (
    <>
      <Header />
      <div className="flex items-center h-full w-full bg-slate-200 ">
        <div className="flex flex-col items-center h-full w-full bg-slate-200 mt-[24vh] p-8 md:max-w-md md:mx-auto">
          {data.map((install: Install) => (
            console.log(install.location),
            <p key={install.storeNum}>{install.location}</p>
          ))}
        </div>
      </div>
    </>
  );
})