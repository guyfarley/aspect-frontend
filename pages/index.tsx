import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div className="relative h-screen lg:h-[140vh]">
      <Head>
        <title>Aspect Install Tracker</title>
      </Head>

      <Header />
      <main>
        <section>
          {/* Hero */}
          <Hero />
        </section>
        <section>
          {/* Menu */}
        </section>
      </main>
    </div>
  );
}

export default Home
