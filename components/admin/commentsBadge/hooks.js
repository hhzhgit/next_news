import { useContext, useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../../../miscellaneous/fetchData";
import { removeCookies } from "cookies-next";
import generalStates from "../../../miscellaneous/context";
const useComments = () => {
  const { data, error } = useSWR(
    "commentsCount",
    fetcher("api/comments/count")
  );
  const { setUser } = useContext(generalStates);
  const { mutate } = useSWRConfig();
  useEffect(() => {
    setInterval(async () => {
      mutate("commentsCount");
    }, 10000);
  }, [mutate]);
  const handleLogOut = () => {
    removeCookies("user");
    setUser(null);
  };
  return { data, error, handleLogOut };
};
export default useComments;
