import _ from "lodash";
import { useContext } from "react";
import generalStates from "../miscellaneous/context";
import useFetchData, { requestSuccessed } from "../miscellaneous/fetchData";

const useNewsCardHook = () => {
  const states = {};
  _.assign(states, useFetchData());
  _.assign(states, useContext(generalStates));
  class Handler {
    isAdmin() {
      return (
        states.user &&
        (states.user?.role == "admin" || states.user?.role == "super admin")
      );
    }
    onNewsDelete = (news) => async () => {
      if (!confirm("are u sure to delete this news")) return;
      await states.request(`api/news/${news._id}`, {
        method: "DELETE",
        jwt: states.user?.jwt,
        onSuccess: () => {
          alert("OK");
          window.location.reload();
        },
        onFail: (msg) => alert(msg),
      });
    };
  }
  return { handler: new Handler(), states };
};
export default useNewsCardHook;
