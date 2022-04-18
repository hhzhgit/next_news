import axios from "axios";
import { EditorState, convertToRaw } from "draft-js";
import { useRef, useContext, useState } from "react";
import generalStates from "../../miscellaneous/context";

const usePostNews = () => {
  const { user } = useContext(generalStates);
  const formRef = useRef();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const description = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    const newsForm = new FormData(formRef.current);
    newsForm.set("author", user._id);
    newsForm.set("description", description);
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_SERVER_BASE_URL + "api/news",
        newsForm,
        { headers: { authorization: `Bearer ${user.jwt}` } }
      );
      alert("news sent");
      formRef.current.reset();
    } catch (e) {
      console.log(e.response);
      const errMsg = e?.response?.data && e?.response?.data?.msg;
      errMsg && alert(errMsg);
    }
  };
  return { user, formRef, handleFormSubmit, editorState, setEditorState };
};
export default usePostNews;
