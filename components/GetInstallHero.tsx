import Image from 'next/image';

function GetInstallHero() {
  return (
    <div className="flex flex-col w-[90vw] py-4 md:w-[60vw]">
      <div className="shadow-lg">
        <Image
          src="/store_1.jpg"
          alt="retail store interior"
          width="1279"
          height="853"
        />
      </div>
    </div>
  )
}

export default GetInstallHero;