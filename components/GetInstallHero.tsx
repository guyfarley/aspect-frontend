import Image from 'next/image';
import Footer from './Footer';

function GetInstallHero() {
  return (
    <div className="flex flex-col h-[45vh] w-[90vw] py-4 md:h-[30vh] md:w-[60vw]">
      {/* <h1 className="font-ptserif text-gray-700 text-4xl">See your marketing,</h1>
      <h1 className="font-ptserif text-gray-700 text-4xl mb-10">delivered.</h1> */}
      <div className="shadow-lg">

        <Image
          src="/store_1.jpg"
          alt="retail store interior"
          width="1279"
          height="853"
        />
      </div>
      {/* <h3 className="font-roboto text-gray-600 text-base mt-[30px]">With Aspect, tracking your retail graphic and fixture installations has never been easier.</h3> */}
      <Footer />
    </div>
  )
}

export default GetInstallHero;