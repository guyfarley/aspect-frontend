function Menu() {
  return (
    <div className="flex flex-col md:flex-row justify-center mt-[16vh]">
      <button className="menuButton">Log In</button>
      <button className="menuButton">Find an Install</button>
      <button className="menuButton">Create an Install</button>
      <button className="menuButton">Campaign Report</button>

    </div>
  )
}

export default Menu;