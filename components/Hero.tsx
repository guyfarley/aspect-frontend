import Image from 'next/image'

function Hero() {
  return (
    <div className="relative h-[45vh] w-[100vw] px-4 py-4 mt-20 md:h-[30vh] md:w-[80vw]">
      <Image
        src="/deschutes_resized.JPG"
        alt="Deschutes River"
        width="1672"
        height="1254"
      />
    </div>
  )
}

export default Hero;