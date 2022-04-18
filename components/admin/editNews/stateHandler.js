export const EDIT_NEWS_TITLE = "EDIT_NEWS_TITLE";
export const EDIT_NEWS_DESCRIPTION = "EDIT_NEWS_DESCRIPTION";
export const EDIT_NEWS_CATEGORY = "EDIT_NEWS_CATEGORY";
export const EDIT_NEWS_AUTHOR = "EDIT_NEWS_AUTHOR";
export const EDIT_NEWS_SETSTATES = "EDIT_NEWS_SETSTATES";
export const editNewsInitialState = {
  title: "",
  description: "",
};
export const editNewsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case EDIT_NEWS_TITLE:
      return { ...state, title: payload };
    case EDIT_NEWS_DESCRIPTION:
      return { ...state, description: payload };
    case EDIT_NEWS_CATEGORY:
      return { ...state, category: payload };
    case EDIT_NEWS_AUTHOR:
      return { ...state, author: payload };
    case EDIT_NEWS_SETSTATES:
      const { title, category, author, description } = payload;
      return { title, category, author, description };
    default:
      return state;
  }
};
