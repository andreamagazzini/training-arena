import useSwr from "swr";
import fetcher from "../libs/fetcher";

const usePlayers = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/players", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  
  return {
    players: data,
    error,
    isLoading,
    mutate,
  };
};

export default usePlayers;
