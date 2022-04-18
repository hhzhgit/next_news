export const REGISTER_EMAIL = "REGISTER_EMAIL";
export const REGISTER_PASS = "REGISTER_PASS";
export const REGISTER_NAME = "REGISTER_NAME";
export const REGISTER_AGE = "REGISTER_AGE";
export const REGISTER_WEBSITE = "REGISTER_WEBSITE";
export const REGISTER_COUNTRY = "REGISTER_COUNTRY";
export const REGISTER_RESET_FORM = "REGISTER_RESET_FORM";
export const LOGGIN_EMAIL = "LOGGIN_EMAIL";
export const LOGGIN_PASS = "LOGGIN_PASS";
export const LOGGIN_RESET_FORM = "LOGGIN_RESET_FORM";
export const registerInitialState = {
  email: "",
  password: "",
  country: "",
  age: "",
  name: "",
};
const registerReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_COUNTRY:
      return { ...state, country: action.payload };
    case REGISTER_AGE:
      return { ...state, age: action.payload };
    case REGISTER_EMAIL:
      return { ...state, email: action.payload };
    case REGISTER_NAME:
      return { ...state, name: action.payload };
    case REGISTER_PASS:
      return { ...state, password: action.payload };
    case REGISTER_RESET_FORM:
      return registerInitialState;
    default:
      return state;
  }
};
export default registerReducer;
export const logginInitialStates = {
  email: "",
  password: "",
};
export const logginReducer = (state, action) => {
  switch (action.type) {
    case LOGGIN_EMAIL:
      return { ...state, email: action.payload };
    case LOGGIN_PASS:
      return { ...state, password: action.payload };
    case LOGGIN_RESET_FORM:
      return logginInitialStates;
    default:
      return state;
  }
};
