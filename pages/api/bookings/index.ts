import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "../../../libs/prismadb";
import serverAuth from "../../../libs/serverAuth";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await serverAuth(req, res);
    const session = await getServerSession(req, res, authOptions);

    console.log("Session", session)
    
    if (req.method === "GET") {
      const bookings = await prismadb.game.findMany({
        include: {
          currentExercise: true, 
          currentPlayerInfo: true
        }
      });
      console.log(`${bookings.length} bookings fetched`)
      return res.status(200).json(bookings);  
    }

    if (req.method === "POST") {
      const { body } = req; 
      console.log("Body", body)
      const booking = await prismadb.game.create({ 
        data: { 
          currentExercise: { 
            connect: { id: body.exerciseId } 
          },
          currentPlayerInfo: {
            connect: { id: body.playerId }
          }
        }
      });
      console.log("Booking created", booking)
      return res.status(200).json(booking);
    }

    return res.status(405).end()
  } catch (error: any) {
    console.error(error)
    return res.status(400).end();
  }
}
