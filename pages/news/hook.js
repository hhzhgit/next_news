import { useRouter } from "next/router";
import useFetchData from "../../miscellaneous/fetchData";
import { useContext } from "react";
import generalStates from "../../miscellaneous/context";
const usePostComment = () => {
  const { user } = useContext(generalStates);
  const router = useRouter();
  const { data, request, setData, loading } = useFetchData("");
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await request("/api/comments", {
      method: "POST",
      body: {
        description: data,
        news: router.query.newsId[0],
        user: user?._id,
      },
      onSuccess: () => alert("comment sent"),
      onFail: (err) => alert(err || "error :("),
    });
    setData("");
  };
  return {
    comment: data,
    handleCommentSubmit,
    loading,
    setComment: setData,
    router,
  };
};
export default usePostComment;
