import useEditNews from "./hook";
import {
  EDIT_NEWS_CATEGORY,
  EDIT_NEWS_SETSTATES,
  EDIT_NEWS_TITLE,
} from "./stateHandler";
if (typeof window !== "undefined") {
  const Editor = require("react-draft-wysiwyg").Editor;
}
import styles from "../../../styles/editNews.module.css";
import { EditorState } from "draft-js";
export default function EditNews() {
  const {
    getSearchResult,
    handleSearchChange,
    searchedNews,
    isLoading,
    handleSelectNews,
    handleEditNews,
    state,
    dispatch,
    editorState,
    setEditorState,
  } = useEditNews();
  return (
    <section className={`container-fluid ${styles.section} mt-5 shadow-lg`}>
      <h3 className="text-center">Edit News</h3>
      <form onSubmit={getSearchResult} className={`row px-2`}>
        <div className="col-12 col-sm-6 d-flex flex-column flex-sm-row">
          <input
            type="text"
            placeholder="search"
            onChange={handleSearchChange}
            className="form-control"
          />
          <button type="submit" className="btn btn-outline-info">
            search
          </button>
        </div>
        <div className="col-12 col-sm-6 d-flex">
          <select name="field" className="custom-select">
            <option value="title">Title</option>
            <option value="description">Description</option>
            <option value="category">Category</option>
          </select>
          <button className="btn btn-danger" type="reset">
            clear
          </button>
        </div>
      </form>
      <div className={styles.tableAdjust}>
        <table className={`table ${styles.table} table-striped`}>
          <thead className="bg-dark text-white">
            <tr>
              <th>result</th>
              <th>created At:</th>
              <th>operator</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && Array.isArray(searchedNews) ? (
              searchedNews.map((n, i) => (
                <tr key={i}>
                  <td>{n?.title}</td>
                  <td>{n?.createdAt}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      value={n?._id}
                      onClick={handleSelectNews}
                    >
                      select
                    </button>
                    <button className="btn btn-danger">delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>empty</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <form
        encType="multipart/form-data"
        onSubmit={handleEditNews}
        className="row px-2"
      >
        <div className="col-12 col-sm-8">
          <label htmlFor="editTitle">title</label>
          <input
            type="text"
            name="title"
            id="editTitle"
            className="form-control"
            value={state?.title || ""}
            onChange={(e) =>
              dispatch({
                type: EDIT_NEWS_TITLE,
                payload: e.currentTarget.value,
              })
            }
          />
        </div>
        <div className="col-12 col-sm-6">
          <label htmlFor="category">category</label>
          <input
            type="text"
            name="category"
            id="category"
            className="form-control"
            value={state?.category || ""}
            onChange={(e) =>
              dispatch({
                type: EDIT_NEWS_CATEGORY,
                payload: e.currentTarget.value,
              })
            }
          />
        </div>
        <div className="col-12 col-sm-6">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="newImage"
            id="image"
            className="form-control-file"
          />
        </div>
        <div className="col-12">
          <label htmlFor="description" className="d-block text-center">
            Description
          </label>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            editorClassName={styles.editor}
            toolbarClassName={styles.editorToolbar}
            wrapperClassName={styles.editorWrapper}
          ></Editor>
        </div>
        <div className="col-12 text-center mb-4">
          <button type="submit" className="btn btn-primary mx-1">
            edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              dispatch({ type: EDIT_NEWS_SETSTATES, payload: {} });
              setEditorState(EditorState.createEmpty());
            }}
          >
            reset
          </button>
        </div>
      </form>
    </section>
  );
}
