import { createContext, useState } from "react";

const InstallsContext = createContext();

const InstallsProvider = ({ children }) => {

  const [installs, setInstalls] = useState([]);
  // const [formData, setFormData] = useState({
  //   id: install.id,
  //   pm: install.pm,
  //   storeNum: install.storeNum,
  //   location: install.location,
  //   campaign: install.campaign,
  //   vendorName: install.vendorName,
  //   vendorPhone: install.vendorPhone,
  //   installDate: install.installDate,
  //   installTime: install.installTime,
  //   installer: install.installer,
  //   installerPhone: install.installerPhone,
  //   installerNotes: install.installerNotes,
  //   complete: install.complete,
  //   completionPics: install.completionPics,
  //   revisitNeeded: install.revisitNeeded,
  //   revisitDate: install.revisitDate,
  //   pmNotes: install.pmNotes,
  // });
  // const [formData, setFormData] = useState({});

  const updateInstall = (formData) => {

    let updatedInstalls = installs.map(install => {
      if (install.id === formData.id) {
        install = formData;
      }
      return install;
    })
    setInstalls(updatedInstalls);
  }

  console.log('NEW installs', installs);

  return (
    <InstallsContext.Provider
      value={{
        installs,
        setInstalls,
        updateInstall,
      }
      }
    >
      {children}</InstallsContext.Provider>
  )
}

export { InstallsProvider, InstallsContext };