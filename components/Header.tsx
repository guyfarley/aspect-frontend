import { GiFeatheredWing } from 'react-icons/gi';
import { AiOutlineMenu } from 'react-icons/ai';
import BasicMenu from './BasicMenu';
import Link from 'next/link';

function Header() {
  return (
    <>
      <header>
        <Link href="/">
          <button className="flex">

            <div>
              <GiFeatheredWing className="text-3xl mr-[2px] mt-[2px]" />
            </div>
            <div className="flex items-center">
              <h1 className="font-alata text-3xl">Aspect</h1>
            </div>
          </button>
        </Link>

        <div className="hidden md:flex flex-row justify-between ml-[4vw]">
          <button className="menuButton">Log In</button>
          <button className="menuButton">
            <Link href="/get-install">
              Find an Install
            </Link>
          </button>
          <button className="menuButton">
            <Link href="/create-install">
              Create an Install
            </Link>
          </button>
          <button className="menuButton">
            <Link href="/report">
              Campaign Report
            </Link>
          </button>
        </div>

        {/* <div>
          <AiOutlineMenu className="text-3xl mr-[2px] mt-[4px] md:hidden" /> */}
        {/* right menu */}
        {/* mobile view: menu icons
          at medium (or large) breakpoint, becomes visible horizontal menu
          if not logged in, only contains login option
          if logged in, shows log out + all other options */}
        {/* </div> */}
        <BasicMenu />

      </header>
    </>
  );
}

export default Header;