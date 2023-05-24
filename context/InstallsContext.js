import { createContext, useState } from "react";

const InstallsContext = createContext();

const InstallsProvider = ({ children }) => {

  const [installs, setInstalls] = useState([]);
  const [installOptions, setInstallOptions] = useState([]);

  // update a specific install with submitted form data
  const updateStateInstall = (formData) => {

    let updatedInstalls = installs.map(install => {
      if (install.storeNum === formData.storeNum) {
        install = formData;
      }
      return install;
    })
    setInstalls(updatedInstalls);
  }

  // add an install to state installs, from submitted form data
  const addStateInstall = (formData) => {
    setInstalls([...installs, formData]);
  }

  return (
    <InstallsContext.Provider
      value={{
        installs,
        setInstalls,
        updateStateInstall,
        addStateInstall,
        installOptions,
        setInstallOptions
      }}
    >
      {children}
    </InstallsContext.Provider>
  )
}

export { InstallsProvider, InstallsContext };