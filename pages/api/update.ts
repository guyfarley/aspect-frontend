import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function updateHandler(req: NextApiRequest, res: NextApiResponse) {

  const installData = await JSON.parse(req.body);

  const updatedInstall = await prisma.install.update({
    where: {
      storeNum: installData.storeNum,
    },
    data: installData,
  })

  res.status(200).json(updatedInstall);
}