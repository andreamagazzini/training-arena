import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "../../../libs/prismadb";
import serverAuth from "../../../libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await serverAuth(req, res);
    
    if (req.method === "GET") {
      const series = await prismadb.exerciseSeries.findMany();
      console.log(`${series.length} exercises fetched`)
      return res.status(200).json(series);  
    }

    if (req.method === "POST") {
      const series = await prismadb.exerciseSeries.create({ data: req.body });
      console.log("Series created", series)
      return res.status(200).json(series);
    }

    return res.status(405).end()
  } catch (error: any) {
    console.error(error)
    return res.status(400).end();
  }
}
