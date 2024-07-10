import type { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import InfoModal from "../components/InfoModal";
import useInfoModal from "../hooks/useInfoModal";
import useExercises from "../hooks/useExercises";
import usePlayers from "../hooks/usePlayers";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

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
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="flex flex-col gap-2">
        {
          exercises?.map((exercise: any) => <div key={exercise.id}>{exercise.Name}</div>)
        }
      </div>

      <div className="flex flex-col gap-2">
        {
          players?.map((player: any) => <div key={player.id}>{player.Name}</div>)
        }
      </div>
    </>
  );
};

export default Home;
