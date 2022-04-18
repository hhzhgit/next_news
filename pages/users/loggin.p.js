import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/navbar";
import { useLogginHandler } from "./hooks";
import { LOGGIN_EMAIL, LOGGIN_PASS, LOGGIN_RESET_FORM } from "./stateHandler";
import styles from "../../styles/loggin.module.css";
export default function Loggin() {
  const { dispatch, loading, requestLoggin, state } = useLogginHandler();
  return (
    <>
      <Head>
        <title>sign in to webSite</title>
        <meta name="description" content="news website sign up or loggin" />
      </Head>
      <div className={`${styles.loginPage} row`}>
        <form
          onSubmit={requestLoggin}
          className={`${styles.loginForm} col-12 col-sm-6 col-md-4`}
        >
          <h4 className="text-center text-uppercase">login</h4>
          <label htmlFor="email" className="text-capitalize font-weight-bold">
            insert email
          </label>
          <input
            className={`form-control ${styles.textInput}`}
            type="text"
            placeholder="email"
            id="email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: LOGGIN_EMAIL, payload: e.currentTarget.value })
            }
          />
          <label
            htmlFor="password"
            className="text-capitalize font-weight-bold"
          >
            insert password
          </label>
          <input
            className={`form-control ${styles.textInput}`}
            type="password"
            placeholder="password"
            id="password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: LOGGIN_PASS, payload: e.currentTarget.value })
            }
          />
          <div className="d-flex my-2">
            <button
              type="submit"
              className="btn btn-primary flex-fill mx-1"
              disabled={loading}
            >
              loggin
            </button>
            <button
              className="btn btn-danger flex-fill"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: LOGGIN_RESET_FORM });
              }}
            >
              reset
            </button>
          </div>
          <small className="text-center d-block m-2">
            did not signed yet?
            <Link href="/users/register">
              <a className="text-info">click here</a>
            </Link>
          </small>
        </form>
      </div>
    </>
  );
}
Loggin.customLayout = (page) => {
  return (
    <>
      <Navbar />
      {page}
    </>
  );
};
