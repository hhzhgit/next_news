import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import generalStates from "../miscellaneous/context";
const useHomePage = () => {
  const { setActivePage } = useContext(generalStates);
  const router = useRouter();
  useEffect(() => {
    const { skip, limit } = router.query;
    (!skip || !limit) && setActivePage(1);
  });
};
export default useHomePage;
