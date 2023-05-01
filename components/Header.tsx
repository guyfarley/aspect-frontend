import { GiFeatheredWing } from 'react-icons/gi';
import BasicMenu from './BasicMenu';
import Link from 'next/link';

function Header() {

  return (
    <>
      <header>
        <Link href="/">
          <button className="flex">
            <div>
              <GiFeatheredWing className="text-3xl text-gray-800 mr-[2px] mt-[2px]" />
            </div>
            <div className="flex items-center">
              <h1 className="font-alata text-3xl text-gray-800">Aspect</h1>
            </div>
          </button>
        </Link>
        <div className="hidden md:flex flex-row justify-between ml-[4vw]">
          <button className="menuButton">
            <Link href="/get-install">
              FIND INSTALL
            </Link>
          </button>
          <button className="menuButton">
            <Link href="/create-install">
              CREATE INSTALL
            </Link>
          </button>
        </div>
        <BasicMenu />
      </header>
    </>
  );
}

export default Header;