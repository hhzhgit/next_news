import { useContext, useReducer, useEffect } from "react";
import generalStates from "../../miscellaneous/context";
import useFetchData from "../../miscellaneous/fetchData";
import registerReducer, {
  logginInitialStates,
  logginReducer,
  registerInitialState,
} from "./stateHandler";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
export const useHandleRegister = (e) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(registerReducer, registerInitialState);
  const { loading, request } = useFetchData(null);
  const { user, setUser } = useContext(generalStates);
  const regitserRequest = async (e) => {
    e.preventDefault();
    await request("api/users/register", {
      body: {
        ...state,
        country: state.country.split(","),
      },
      method: "POST",
      navigate: "/",
      onSuccess: (data) => {
        alert("congratulations you have been regitserd :)");
        // localStorage.setItem("user", JSON.stringify(data));
        Cookies.set("user", JSON.stringify(user), {
          expires: parseFloat(process.env.NEXT_PUBLIC_cookieExpInDays),
        });
        setUser(data);
      },
      onFail: (err) => alert(err),
    });
  };
  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  return { loading, regitserRequest, state, dispatch };
};
export const useLogginHandler = () => {
  const [state, dispatch] = useReducer(logginReducer, logginInitialStates);
  const { user, setUser } = useContext(generalStates);
  const { request, loading } = useFetchData();
  const router = useRouter();
  const requestLoggin = async (e) => {
    e.preventDefault();
    await request("api/users/loggin", {
      body: state,
      method: "POST",
      onSuccess: (user) => {
        alert(`hi ${user.name}`);
        // localStorage.setItem("user", JSON.stringify(user));
        Cookies.set("user", JSON.stringify(user), {
          expires: parseFloat(process.env.NEXT_PUBLIC_cookieExpInDays),
        });
        setUser(user);
      },
      onFail: (err) => alert(err),
    });
  };
  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);
  return { state, dispatch, requestLoggin, loading };
};
