import Image from 'next/image'

function Hero() {
  return (
    <div className="relative h-[45vh] w-[100vw] px-4 py-4 mt-20 md:h-[30vh] md:w-[80vw]">
      <h1 className="font-ptserif text-gray-700 text-4xl">See your marketing,</h1>
      <h1 className="font-ptserif text-gray-700 text-4xl mb-10">delivered.</h1>
      <Image
        src="/install_resized5.jpg"
        alt="retail installation photo"
        width="2359"
        height="1887"
      />
    </div>
  )
}

export default Hero;