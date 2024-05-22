import { useQuery } from "@tanstack/react-query";
import { UserSchema, fetchMe } from "../components/Api/User";
import { queryClient } from "../components/Api/queryClient";
import { useEffect, useState } from "react";
import { z } from "zod";

type UserType = z.infer<typeof UserSchema>;

export const useMe = () => {
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const [me, setMe] = useState<UserType | null>(initialUser);

  const { data, isLoading, isError } = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ["users", "me"],
      retry: 0,
    },
    queryClient
  );

  useEffect(() => {
    if (!me && data) {
      try {
        setMe(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (e) {
        console.error("Invalid user data:", e);
      }
    }
  }, [me, data]);

  return { me, data, isLoading, isError };
};
