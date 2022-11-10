import Head from 'next/head'
import Image from 'next/image'
import { allInstalls } from '../../data';
import { GetStaticProps, GetStaticPaths } from 'next';

// getStaticPaths() and getStaticProps() run at build time of this page
// component will render all data for specific install being requested

export const getStaticPaths: GetStaticPaths = () => {
  const data = { allInstalls };

  const paths = data.map(install => ({
    params: {
      id: install.id.toString()
    },
  }))
  return { paths, fallback: false }
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const data = { allInstalls };
  const install = data.filter(install => install.id.toString() === params.id);

  return {
    props: {
      install,
    }
  }
};

export default function OneInstall({ install }): JSX.Element {
  const installData = install;

  return (

    <p>{installData.pm}</p>

  );

}
