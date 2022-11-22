import { NextApiRequest, NextApiResponse } from 'next';
import allInstalls from './data';

export default function getOneHandler(req: NextApiRequest, res: NextApiResponse) {

  console.log(allInstalls);
  res.status(200).send(allInstalls);
  // res.status(200).json(oneInstall);
}