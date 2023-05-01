import Image from 'next/image'
import Link from 'next/link';

function AccessInstalls() {
  return (
    <div className="flex flex-col justify-center w-[100vw] px-6 py-4 md:w-[60vw]">
      <h1 className="font-ptserif text-gray-700 text-4xl mt-[40px]">Access your installs.</h1>
      <h3 className="font-roboto text-gray-600 text-base mt-[30px] mb-[30px]">To access an installation, visit the <Link href="/get-install">FIND INSTALL</Link> page and choose from the available marketing campaigns. The CHOOSE INSTALL dropdown menu will auto-populate with all installations related to that campaign. Choose the correct install location and submit, and you'll be taken to a new page showing all current data for that installation! From there, you may MODIFY or DELETE the install as needed. It's that easy!</h3>
      <div className="shadow-lg">
        <Image
          src="/laptop_1.jpg"
          alt="laptop on desk"
          width="1280"
          height="853"
        />
      </div>
    </div>
  )
}

export default AccessInstalls;