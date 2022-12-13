import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  console.log(req.query.secret);
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {

    const body = req.body;
    if (!body) {
      res.status(400).send('Bad request (no body)');
      return;
    }

    const slugToRevalidate = body.storeNum;

    if (slugToRevalidate) {
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      await res.revalidate(`/installs/${slugToRevalidate}`)
      return res.json({ revalidated: true })

    }

  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}