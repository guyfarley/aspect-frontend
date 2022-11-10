import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout';


const Home: NextPage = () => {
  return (
    <Layout home>
      <Head></Head>
      {/* <section>
        <div>
          {allInstallData.map((install) => (
            console.log(install.location),
            <p className={styles.description} key={install.storeNum}>{install.location}</p>
          ))}
        </div>
      </section> */}
    </Layout>
  );
}

export default Home
