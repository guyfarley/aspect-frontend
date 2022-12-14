import { createContext, useState } from "react";

const InstallsContext = createContext();

const InstallsProvider = ({ children }) => {

  const [installs, setInstalls] = useState([
    {
      pm: "Guy Farley",
      storeNum: "1122",
      location: "Bend, OR",
      campaign: "New Campaign",
      vendorName: "New Vendor",
      vendorPhone: "Vendor Phone",
      // installDate: install.installDate,
      // installTime: install.installTime,
      installer: "New Installer",
      installerPhone: "Installer Phone",
      installerNotes: "Installer Notes",
      // complete: install.complete,
      // completionPics: install.completionPics,
      // revisitNeeded: install.revisitNeeded,
      // revisitDate: install.revisitDate,
      pmNotes: "pmNotes",
    }
  ]);
  const [newStore, setNewStore] = useState("");

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

  const createNewStore = (storeNum) => setNewStore(storeNum);

  return (
    <InstallsContext.Provider
      value={{
        installs,
        setInstalls,
        updateStateInstall,
        addStateInstall,
        newStore,
        setNewStore,
        createNewStore
      }}
    >
      {children}
    </InstallsContext.Provider>
  )
}

export { InstallsProvider, InstallsContext };