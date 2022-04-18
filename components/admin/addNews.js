import usePostNews from "./addNewsHook";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "../../styles/addNews.module.css";
if (typeof window !== "undefined") {
  const { Editor } = require("react-draft-wysiwyg");
}
export default function AddNews({ categories = [] }) {
  const { formRef, user, handleFormSubmit, editorState, setEditorState } =
    usePostNews();
  return (
    <section className="row bg-light shadow-lg rounded-lg mx-2 my-4">
      <h3 className="col-12 text-center border-bottom">Add News</h3>
      <form
        ref={formRef}
        encType="multipart/form-data"
        onSubmit={handleFormSubmit}
        className={`row p-2 ${styles.form}`}
      >
        <div className="col-12 col-sm-6 order-sm-1">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" className="form-control" />
        </div>
        <div className="col-12 col-sm-6 order-sm-0">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            name="image"
            accept=".jpg"
          />
        </div>
        <div className="col-12 col-sm-8 order-sm-3">
          <label htmlFor="description"> Description</label>
          <div className={styles.editor}>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName={styles.editorWarpperClass}
              editorClassName={styles.editor}
              toolbarClassName={styles.editorToolbar}
            />
          </div>
        </div>
        <div className="col-12 col-sm-4 order-sm-2">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={user?.name}
            className="form-control"
            disabled
          />
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              className="form-control"
            />
            <select
              className="form-control"
              name=""
              id="selectCats"
              onClick={(e) => {
                const category = formRef.current.querySelector("#category");
                category.value = e.currentTarget.value;
              }}
            >
              {categories.map((cat, i) => (
                <option value={cat} key={i} className="custom-select">
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
