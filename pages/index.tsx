import Head from 'next/head'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div className="relative flex justify-center h-screen px-4 py-4 lg:h-[140vh]">
      <Head>
        <title>Aspect Install Tracker</title>
      </Head>

      <Header />
      <main>
        <Menu />
        <Hero />
      </main >
    </div >
  );
}

export default Home
