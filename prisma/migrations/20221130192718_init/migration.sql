-- CreateTable
CREATE TABLE "Install" (
    "storeNum" TEXT NOT NULL,
    "pm" TEXT,
    "location" TEXT NOT NULL,
    "campaign" TEXT NOT NULL,
    "vendorName" TEXT NOT NULL,
    "vendorPhone" TEXT,
    "installDate" TEXT,
    "installTime" TEXT,
    "installer" TEXT,
    "installerPhone" TEXT,
    "installerNotes" TEXT,
    "complete" BOOLEAN,
    "completionPics" TEXT,
    "revisitNeeded" BOOLEAN,
    "revisitDate" TEXT,
    "pmNotes" TEXT,

    CONSTRAINT "Install_pkey" PRIMARY KEY ("storeNum")
);
