import useSWR from "swr";
import fetcher from "../libs/fetcher";

const useExercises = () => {
  const { data, error, isLoading } = useSWR("/api/exercises", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    exercises: data,
    error,
    isLoading,
  };
};

export default useExercises;
