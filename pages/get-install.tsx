import React from "react"
import Header from '../components/Header'

export default function GetInstallForm() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('form submitted');
    // this function will handle the data fetching upon form submission
    // on submission, routes to pages/one-install/[id]
  }

  return (
    <>
      <Header />
      {/* We pass the event to the handleSubmit() function on submit. */}
      <form className="flex items-center justify-center my-[24vh]" onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <label htmlFor="storeNumber">Store Number:</label>
          <div className="flex flex-col justify-center items-center ml-2">
            <input className="w-[100px] border rounded" type=" text" id="storeNumber" name="storeNumber" required />
            <button className="submitButton" type="submit">Submit</button>
          </div>
        </div>
      </form>
      {/* footer */}
    </>
  )
}