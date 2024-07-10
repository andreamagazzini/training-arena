import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "../../../libs/prismadb";
import serverAuth from "../../../libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);

    const exercises = await prismadb.exercise.findMany();

    return res.status(200).json(exercises);
  } catch (error: any) {
    console.error(error)
    return res.status(400).end();
  }
}
