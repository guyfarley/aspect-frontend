import { NextApiRequest, NextApiResponse } from 'next';
import allInstalls from '../data';

export default function getOneHandler(req: NextApiRequest, res: NextApiResponse) {

  const { query } = req;
  const { storeNum } = query;
  const oneInstall = allInstalls.filter((install) => (install.storeNum).toString() === storeNum);
  res.status(200).json({ message: 'Install found successfully' })
  // res.status(200).json(oneInstall);
}