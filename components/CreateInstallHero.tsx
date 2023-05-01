import Image from 'next/image';

function CreateInstallHero() {
  return (
    <div className="flex flex-col w-[90vw] py-4 md:w-[60vw]">
      <div className="shadow-lg">
        <Image
          src="/shoes_cropped.jpg"
          alt="shoes on pedestal"
          width="1280"
          height="960"
        />
      </div>
    </div>
  )
}

export default CreateInstallHero;