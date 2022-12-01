import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getOneHandler(req: NextApiRequest, res: NextApiResponse) {

  const installs = await prisma.install.findMany();

  const { query } = req;
  const { storeNum } = query;
  const install = installs.filter((install) => (install.storeNum).toString() === storeNum);
  const oneInstall = install[0];

  res.status(200).json(oneInstall);
}