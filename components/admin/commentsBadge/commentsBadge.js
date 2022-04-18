import useComments from "./hooks";
export default function CommentsBadge({}) {
  const { data, error } = useComments();
  const {
    count,
    countOfPublishedComments,
    countOfReadComments,
    countOfUnreadComments,
  } = data ? data.data : {};
  return error ? (
    <div>{error?.response?.data?.msg || "error"}</div>
  ) : (
    <div className="bg-info">
      <p>
        total comments:
        <span className="badge badge-info">{count || "calcualting"}</span>
      </p>
      <p>
        publishedComments:
        <span className="badge badge-success">{countOfPublishedComments || "calcualting"}</span>
      </p>
      <p>
        unReadComments:<span className="badge badge-danger">{countOfUnreadComments || "calculating"}</span>
      </p>
      <p>
        readByAdminComments:<span className="badge badge-warning">{countOfReadComments || "calculating"}</span>
      </p>
    </div>
  );
}
