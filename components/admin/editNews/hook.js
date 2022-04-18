import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
import { useState, useContext, useReducer } from "react";
import useSWR, { useSWRConfig } from "swr";
import { swrKeys, swrOptions } from "../../../miscellaneous/constants";
import generalStates from "../../../miscellaneous/context";
import { isJsonLike } from "../../../miscellaneous/functions";
import useFetchData, {
  fetcher,
  requestSuccessed,
} from "../../../miscellaneous/fetchData";
import {
  editNewsInitialState,
  editNewsReducer,
  EDIT_NEWS_SETSTATES,
} from "./stateHandler";
const useEditNews = () => {
  const { user } = useContext(generalStates);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [endPoint, setEndPoint] = useState("api/news/search");
  const {
    data: searchedNews,
    isValidating: isLoading,
    mutate: setSearchedNews,
  } = useSWR(
    swrKeys.apiNewsSearch,
    fetcher(endPoint),
    swrOptions.preventOnMount
  );
  const { data: selectedNews, request } = useFetchData(null);
  const { mutate } = useSWRConfig();
  const [state, dispatch] = useReducer(editNewsReducer, editNewsInitialState);
  const getSearchResult = (e) => {
    e.preventDefault();
    mutate(swrKeys.apiNewsSearch);
  };
  const handleSearchChange = (e) => {
    const searchForm = e.currentTarget.parentElement.parentElement;
    const searchField = searchForm.querySelector("select").value;
    const searchValue = searchForm.querySelector("input").value;
    setEndPoint(`api/news/search/?${searchField}=${searchValue}`);
  };
  const handleSelectNews = async (e) => {
    const res = await request(`api/news/${e.currentTarget.value}`);
    if (res.status == requestSuccessed) {
      dispatch({ type: EDIT_NEWS_SETSTATES, payload: res.data });
      const description = res.data.description;
      const editorState = EditorState.createWithContent(
        isJsonLike(description)
          ? convertFromRaw(JSON.parse(description))
          : ContentState.createFromText(description)
      );
      setEditorState(editorState);
    }
  };
  const handleEditNews = async (e) => {
    e.preventDefault();
    const newForm = new FormData(e.currentTarget);
    newForm.append("author", selectedNews.author);
    newForm.set(
      "description",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
    const res = await request(`api/news/${selectedNews._id}`, {
      method: "PUT",
      body: newForm,
      jwt: user.jwt,
      onSuccess: () => alert("OK"),
      onFail: (err) => alert(err),
    });
    res.status === requestSuccessed &&
      dispatch({ type: EDIT_NEWS_SETSTATES, payload: res.data });
    mutate(swrKeys.apiNewsSearch);
  };
  return {
    getSearchResult,
    handleSearchChange,
    searchedNews: searchedNews?.data,
    isLoading,
    handleSelectNews,
    selectedNews,
    handleEditNews,
    state,
    dispatch,
    editorState,
    setEditorState,
    setSearchedNews,
  };
};
export default useEditNews;
