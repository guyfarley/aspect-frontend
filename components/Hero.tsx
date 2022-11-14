import Image from 'next/image'

function Hero() {
  return (
    <div className="relative h-[45vh] w-[90vw] px-4 py-4 mt-8 md:h-[45vh]">
      <Image
        src="/../public/deschutes_resized.JPG"
        layout="fill"
        objectFit="cover"
        alt="Deschutes River"
      />
    </div>
  )
}

export default Hero;