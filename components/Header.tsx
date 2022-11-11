function Header() {
  return (
    <>
      <header>
        {/* left side menu */}
        <div className="flex items-center space-x-2 md:space-x-10">
          <ul className="hidden space-x-4 md:flex">
            <li className="headerLink">Home</li>
            <li className="headerLink">Find</li>
            <li className="headerLink">Create</li>
            <li className="headerLink">Campaign Report</li>
          </ul>
        </div>

        {/* title */}
        <div className="flex items-center">
          <h1>ASPECT</h1>
        </div>

        {/* login/logout button */}
        <div className="flex items-center">
          <h1 className="headerLink">Log In</h1>
        </div>
      </header>
    </>
  );
}

export default Header;