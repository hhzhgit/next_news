import { useContext, useState } from "react";
import useSWR from "swr";
import generalStates from "../../miscellaneous/context";
import { fetcher } from "../../miscellaneous/fetchData";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";
const useNavabr = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { user, setUser } = useContext(generalStates);
  const { data, error } = useSWR(
    "getCategories",
    fetcher("api/news/categories")
  );
  const categories = data ? data.data : [];
  function logOutHandler() {
    removeCookies("user");
    setUser(null);
  }
  function handleSearch(e) {
    e.preventDefault();
    router.push(`searchResult/?description=${search}`);
    setSearch("");
  }
  return {
    user,
    logOutHandler,
    categories,
    error,
    search,
    setSearch,
    handleSearch,
  };
};
export default useNavabr;
