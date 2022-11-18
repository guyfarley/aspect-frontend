import { createContext, useState } from "react";

const InstallsContext = createContext();

const InstallsProvider = ({ children }) => {

  const [installs, setInstalls] = useState([]);

  return (
    <InstallsContext.Provider
      value={{
        installs,
        setInstalls
      }
      }
    >
      {children}</InstallsContext.Provider>
  )
}

export { InstallsProvider, InstallsContext };