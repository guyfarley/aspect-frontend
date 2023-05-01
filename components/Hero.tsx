import Image from 'next/image'

function Hero() {
  return (
    <div className="flex flex-col justify-center mt-[8rem] w-[100vw] px-6 py-4 md:w-[60vw]">
      <h1 className="font-ptserif text-gray-700 text-4xl">See your marketing,</h1>
      <h1 className="font-ptserif text-gray-700 text-4xl mb-10">delivered.</h1>
      <div className="shadow-lg">
        <Image
          src="/lights_cropped.jpg"
          alt="hands holding string lights"
          width="1280"
          height="960"
        />
      </div>
      <h3 className="font-roboto text-gray-600 text-base mt-[30px]">With Aspect, tracking your retail graphic and fixture installations has never been easier. Aspect allows you to add install information to a central database held securely in the cloud. Then you may access that install, modify its details, or delete it entirely!</h3>
    </div>
  )
}

export default Hero;