import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db';

export default async function deleteOneHandler(req: NextApiRequest, res: NextApiResponse) {

  const deleteStoreNum = (req.query.storeNum)?.toString();

  const deleteInstall = await prisma.install.delete({
    where: {
      storeNum: deleteStoreNum,
    }
  });

  res.status(200).json(deleteInstall);
}