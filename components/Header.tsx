import { GiFeatheredWing } from 'react-icons/gi';

function Header() {
  return (
    <>
      <header>
        <div className="flex">
          <div>
            <GiFeatheredWing className="text-4xl mr-[2px]" />
          </div>
          <div className="flex items-center">
            <h1 className="font-alata text-4xl">Aspect</h1>
          </div>
        </div>
        <div>
          {/* right menu */}
        </div>
      </header>
    </>
  );
}

export default Header;