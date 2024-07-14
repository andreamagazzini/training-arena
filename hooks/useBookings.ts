import useSwr from "swr";
import fetcher from "../libs/fetcher";

const useBookings = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/bookings", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  
  return {
    bookings: data,
    error,
    isLoading,
    mutate,
  };
};

export default useBookings;
