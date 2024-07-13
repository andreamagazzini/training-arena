import { useRouter } from "next/router";
import useMovie from "../../hooks/useMovie";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ReactPlayer from "react-player";

const Watch = () => {
  const router = useRouter();
  const { exerciseId } = router.query;

  const { data } = useMovie(exerciseId as string);

  return (
    <div className="h-screen w-screen bg-black">
      {JSON.stringify(data)}
    </div>
  );
};

export default Watch;
