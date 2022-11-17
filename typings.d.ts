export interface Install {
  id: number
  pm: string
  storeNum: number
  location: string
  campaign: string
  vendorName: string
  vendorPhone: string
  installDate: string
  installTime: string
  installer: string
  installerPhone: string
  installerNotes: string
  complete: boolean
  completionPics: object
  revisitNeeded: boolean
  revisitDate: string
  pmNotes: string
}