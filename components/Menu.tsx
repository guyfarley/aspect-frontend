import Link from 'next/link';

function Menu() {
  return (
    <div className="flex flex-col md:flex-row justify-center mt-[16vh]">
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
  )
}

export default Menu;