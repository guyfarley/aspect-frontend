import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db';

export default async function deleteOneHandler(req: NextApiRequest, res: NextApiResponse) {

  const deleteInstall = await prisma.install.delete({
    where: {
      storeNum: req.query.storeNum,
    }
  });

  res.status(200).json(deleteInstall);
}