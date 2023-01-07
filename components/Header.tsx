import { GiFeatheredWing } from 'react-icons/gi';
import BasicMenu from './BasicMenu';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

function Header() {

  const { user } = useUser();

  return (
    user ?
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
              <Link href="/api/auth/logout">
                LOG OUT
              </Link>
            </button>
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
            {/* <button className="menuButton">
              <Link href="/report">
                CAMPAIGN REPORT
              </Link>
            </button> */}
          </div>
          <BasicMenu />
        </header>
      </> :
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
              <Link href="/api/auth/login">
                LOG IN
              </Link>
            </button>
          </div>
          <BasicMenu />
        </header>
      </>
  );
}

export default Header;