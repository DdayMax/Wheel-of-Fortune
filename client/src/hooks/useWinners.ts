import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Winner, fetchWinners } from "../components/Api/Winners";
import { queryClient } from "../components/Api/queryClient";

export const useWinners = () => {
  const [winners, setWinners] = useState<Winner[] | null>(null);

  const { data, isError, isLoading } = useQuery(
    {
      queryFn: () => fetchWinners(),
      queryKey: ["winners"],
      retry: 0,
    },
    queryClient
  );

  useEffect(() => {
    if (data) {
      setWinners(data);
    }
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["winners"] });
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  return { winners, isError, isLoading };
};
