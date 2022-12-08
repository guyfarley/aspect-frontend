import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../db';

export default async function updateHandler(req: NextApiRequest, res: NextApiResponse) {

  const installData = await JSON.parse(req.body);
  console.log('data received by updates/[storeNum]:', installData)

  const updatedInstall = await prisma.install.update({
    where: {
      storeNum: installData.storeNum,
    },
    data: installData,
  })

  res.status(200).json(updatedInstall);
}