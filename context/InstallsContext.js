import { createContext, useState } from "react";

const InstallsContext = createContext();

const InstallsProvider = ({ children }) => {

  const [installs, setInstalls] = useState([]);
  const [dynamicOptions, setDynamicOptions] = useState([]);


  const updateStateInstall = (formData) => {

    let updatedInstalls = installs.map(install => {
      if (install.storeNum === formData.storeNum) {
        install = formData;
      }
      return install;
    })
    setInstalls(updatedInstalls);
    console.log('NEW installs', installs);
  }

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
        dynamicOptions,
        setDynamicOptions
      }}
    >
      {children}
    </InstallsContext.Provider>
  )
}

export { InstallsProvider, InstallsContext };