import { createContext, useState } from "react";

const InstallsContext = createContext();

const InstallsProvider = ({ children }) => {

  const [installs, setInstalls] = useState([]);

  const addInstall = (formData) => {
    setInstalls([...installs, formData])
  }

  const updateInstall = (formData) => {
    let updatedInstalls = installs.map(install => {
      if (install.id === formData.id) {
        install = formData;
      }
      return install;
    })
    setInstalls(updatedInstalls);
  }

  const setInitialInstalls = data => setInstalls(data);

  return (
    <InstallsContext.Provider
      value={{
        installs,
        setInstalls,
        setInitialInstalls,
        updateInstall,
        addInstall,
      }}
    >
      {children}
    </InstallsContext.Provider>
  )
}

export { InstallsProvider, InstallsContext };