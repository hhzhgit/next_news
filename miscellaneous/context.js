import { createContext } from "react";
const generalStates = createContext({
  user: null,
  setUser: null,
  activePage: 1,
  setActivePage: null,
});
export default generalStates;
