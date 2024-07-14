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
      const exercises = await prismadb.exercise.findMany();
      console.log(`${exercises.length} exercises fetched`)
      return res.status(200).json(exercises);  
    }

    if (req.method === "POST") {
      // TODO: remove isCustom in case it is not used
      const { Series, ...body } = req.body; 
      const exercise = await prismadb.exercise.create({ data: { ...body, ExerciseSeries: { connect: Series.map((s: string) => ({ id: s })) }, isCustom: true } });
      console.log("Exercise created", exercise)
      return res.status(200).json(exercise);
    }

    return res.status(405).end()
  } catch (error: any) {
    console.error(error)
    return res.status(400).end();
  }
}
