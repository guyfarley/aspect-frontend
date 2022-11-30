import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createHandler(req: NextApiRequest, res: NextApiResponse) {

  const installData = JSON.parse(req.body);
  console.log(installData);

  const savedInstall = await prisma.install.create({
    data: installData
  })

  res.status(200).json(savedInstall);
}