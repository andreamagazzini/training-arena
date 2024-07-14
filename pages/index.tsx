import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth/next";
import useExercises from "../hooks/useExercises";
import usePlayers from "../hooks/usePlayers";
import Link from "next/link";
import { Exercise, PlayerInfo } from "@prisma/client";
import { authOptions } from "./api/auth/[...nextauth]"

export const getServerSideProps : GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home: NextPage = () => {
  const { exercises } = useExercises();
  const { players } = usePlayers();

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="relative w-80 bg-white p-3 pb-20 rounded flex flex-col gap-2">
        <div className="text-xl border-b">Esercizi</div>
        {
          exercises?.map((exercise: Exercise) => <div key={exercise.id}>{exercise.Name}</div>)
        }
        <Link href="/exercises/create">
          <button className="absolute bottom-3 right-3 w-40 bg-teal-500 rounded p-3">Crea esercizio</button>
        </Link>
      </div>

      <div className="relative w-80 bg-white p-3 pb-20 rounded flex flex-col gap-2">
        <div className="text-xl border-b">Giocatori</div>
        {
          players?.map((player: PlayerInfo) => <div key={player.id}>{player.Name}</div>)
        }
        <button className="absolute bottom-3 right-3 w-40 bg-teal-500 rounded p-3">Crea giocatore</button>
      </div>
    </div>
  );
};

export default Home;
