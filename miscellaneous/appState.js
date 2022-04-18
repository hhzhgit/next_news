import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
export default function useAppStates(pageProps) {
  const [user, setUser] = useState();
  const [activePage, setActivePage] = useState(1);
  const router = useRouter();
  useEffect(() => {
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    setUser(user);
    if (pageProps?.userAccess && !pageProps?.userAccess.includes(user?.role))
      router.push(pageProps?.redirect || "/");
  }, [router, pageProps]);
  return { user, setUser, activePage, setActivePage };
}
