import Image from 'next/image'
import Footer from './Footer';
import Link from 'next/link';

function AddInstalls() {
  return (
    <div className="flex flex-col justify-center w-[100vw] px-6 py-4 md:w-[60vw]">
      <h1 className="font-ptserif text-gray-700 text-4xl mt-[40px]">Add your installs.</h1>
      <h3 className="font-roboto text-gray-600 text-base mt-[30px]">To add an installation simply visit the <Link href="/create-install">CREATE INSTALL</Link> page and enter the information. Once submitted, the data for that install will be posted to the central database - where it can then be accessed by your project management team, install crews, or the customer!</h3>

    </div>
  )
}

export default AddInstalls;