import Head from 'next/head'
import Image from 'next/image'
import { Install } from '../../typings'
import allInstalls from '../../data';
import { GetStaticProps, GetStaticPaths } from 'next';

// getStaticPaths() and getStaticProps() run at build time of this page
// component will render all data for specific install being requested

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
  console.log('install data:', install);

  return (
    <p>{install.location}</p>
  );

}
