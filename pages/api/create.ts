import { NextApiRequest, NextApiResponse } from "next";

export default function createHandler(req: NextApiRequest, res: NextApiResponse) {
  const newInstall = JSON.parse(req.body);
  console.log(newInstall);

  res.status(200).json({ message: "Post created successfully" });
}