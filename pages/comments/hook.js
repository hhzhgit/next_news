import _ from "lodash";
import { useContext, useState } from "react";
import generalStates from "../../miscellaneous/context";
import useFetchData, { requestSuccessed } from "../../miscellaneous/fetchData";
const useComment = () => {
  const { loading, request } = useFetchData(null);
  const { user } = useContext(generalStates);
  const [comment, setComment] = useState("");
  class CommentRequest {
    loading = loading;
    comment = comment;
    setComment = setComment;
    update =
      (comment, { readByAdmin, allowPublish, description, reload }) =>
      async () => {
        await request(`api/comments/${comment._id}`, {
          method: "PUT",
          body: {
            ..._.omit(comment, "createdAt", "publishedAt"),
            readByAdmin:
              typeof readByAdmin == "undefined"
                ? comment.readByAdmin
                : readByAdmin,
            allowPublish:
              typeof allowPublish == "undefined"
                ? comment.allowPublish
                : allowPublish,
            description:
              typeof description == "undefined"
                ? comment.description
                : this.description,
          },
          jwt: user?.jwt,
          onFail: (msg) => alert(msg),
        });
        reload && window.location.reload();
      };
    async getAComment(commentId) {
      const res = await request(`api/comments/${commentId}`, {
        jwt: user.jwt,
      });
      res.status == requestSuccessed && setComment(res.data);
    }
    async onDescriptionChange(e) {
      setComment({ ...comment, description: e.currentTarget.value });
    }
    async onEditsubmit() {
      this.update(this.comment, {
        reload: true,
      })();
    }
    onUnselect() {
      setComment({ description: "" });
    }
  }
  return { commentRequest: new CommentRequest() };
};
export default useComment;
