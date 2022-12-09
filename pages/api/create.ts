import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../db';

export default async function createHandler(req: NextApiRequest, res: NextApiResponse) {

  const installData = JSON.parse(req.body);
  console.log(installData);

  const savedInstall = await prisma.install.create({
    data: installData
  })

  res.status(200).json(savedInstall);
}