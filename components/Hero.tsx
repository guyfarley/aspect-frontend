import Image from 'next/image'

function Hero() {
  return (
    <div className="flex flex-col h-[45vh] w-[100vw] px-6 py-4 mt-[100px] md:h-[30vh] md:w-[60vw]">
      <h1 className="font-ptserif text-gray-700 text-4xl">See your marketing,</h1>
      <h1 className="font-ptserif text-gray-700 text-4xl mb-10">delivered.</h1>
      <Image
        src="/install_resized5.jpg"
        alt="retail installation photo"
        width="2359"
        height="1887"
      />
      <h3 className="font-roboto text-gray-600 text-base mt-[30px]">With Aspect, tracking your retail graphic and fixture installations has never been easier.</h3>
    </div>
  )
}

export default Hero;