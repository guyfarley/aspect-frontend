import Image from 'next/image'
import Footer from './Footer';
import Link from 'next/link';

function Hero() {
  return (
    <div className="flex flex-col h-[45vh] w-[100vw] px-6 py-4 mt-[100px] md:h-[30vh] md:w-[60vw]">
      <h1 className="font-ptserif text-gray-700 text-4xl">See your marketing,</h1>
      <h1 className="font-ptserif text-gray-700 text-4xl mb-10">delivered.</h1>
      <div className="shadow-lg">
        <Image
          src="/install_resized5.jpg"
          alt="retail installation photo"
          width="2359"
          height="1887"
        />
      </div>
      <h3 className="font-roboto text-gray-600 text-base mt-[30px]">With Aspect, tracking your retail graphic and fixture installations has never been easier. Aspect allows you to add install information to a central database held securely in the cloud. Then you may access that install, modify its details, or delete it entirely!</h3>
      <h1 className="font-ptserif text-gray-700 text-4xl mt-[40px]">Add your installs.</h1>
      <h3 className="font-roboto text-gray-600 text-base mt-[30px]">To add an installation simply visit the <Link href="/create-install">CREATE INSTALL</Link> page and enter the information. Once submitted, the data for that install will be posted to the central database - where it can then be accessed by your project management team, install crews, or the customer!</h3>
      <h1 className="font-ptserif text-gray-700 text-4xl mt-[40px]">Access your installs.</h1>
      <h3 className="font-roboto text-gray-600 text-base mt-[30px] mb-[30px]">To access an installation, visit the <Link href="/get-install">FIND INSTALL</Link> page and choose from the available marketing campaigns. The CHOOSE INSTALL dropdown menu will auto-populate with all installations related to that campaign. Choose the correct install location and submit, and you'll be taken to a new page showing all current data for that installation! From there, you may MODIFY or DELETE the install as needed. It's that easy!</h3>
      <div className="shadow-lg">
        <Image
          src="/rounds_resized1.jpg"
          alt="retail installation photo"
          width="1200"
          height="897"
        />
      </div>
      <Footer />
    </div>
  )
}

export default Hero;