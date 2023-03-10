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
    "complete" BOOLEAN,
    "revisitNeeded" BOOLEAN,
    "revisitDate" TEXT,
    "installer" TEXT NOT NULL,
    "installerPhone" TEXT,
    "installerNotes" TEXT,
    "pmNotes" TEXT,

    CONSTRAINT "Install_pkey" PRIMARY KEY ("storeNum")
);
