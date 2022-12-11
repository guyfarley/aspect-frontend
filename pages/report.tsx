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
    <div className="relative flex justify-center h-full w-full px-4 py-4 lg:h-[140vh]  bg-slate-200">
      <Header />

      <div className="flex flex-col h-full w-full bg-slate-200 p-8 md:max-w-lg md:mx-auto md:items-start">
        < div className="flex flex-col items-center mt-[15vh] mb-[70vh] md:items-start">
          {data.map((install: Install) => (
            console.log(install.location),
            <p key={install.storeNum}>{install.location} - {install.storeNum}</p>
          ))}
        </div>
      </div>
    </div>
  );
})