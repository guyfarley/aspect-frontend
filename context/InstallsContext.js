import { createContext, useState } from "react";
import { useRouter } from 'next/router';


const InstallsContext = createContext();

const InstallsProvider = ({ children }) => {

  const [installs, setInstalls] = useState([]);

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
      }
      }
    >
      {children}</InstallsContext.Provider>
  )
}

export { InstallsProvider, InstallsContext };