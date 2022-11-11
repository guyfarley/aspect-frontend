import Head from 'next/head'
import Image from 'next/image'
import { allInstalls } from '../data';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

// initial request for all item data from database - runs at buildtime

// export async function getStaticProps() {

//   const res = await fetch('https://5juvutwp5d.execute-api.us-west-2.amazonaws.com/beta/flies');
//   const data = await res.json();

//   return {
//     props: {
//       allItemsData: data
//     }
//   }
// }

export const getStaticProps: GetStaticProps = () => {
  const data = { allInstalls };

  console.log(data);
  return {
    props: {
      allInstallData: data.allInstalls
    }
  }
};

export default function Report({ allInstallData }): JSX.Element {

  console.log(allInstallData);

  return (
    <Layout home>
      <Head></Head>
      <section>
        <div>
          {allInstallData.map((install) => (
            console.log(install.location),
            <p className={styles.description} key={install.storeNum}>{install.location}</p>
          ))}
        </div>
      </section>
    </Layout>
  );
}