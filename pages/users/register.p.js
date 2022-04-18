import Head from "next/head";
import React from "react";
import Navbar from "../../components/navbar";
import { useHandleRegister } from "./hooks";
import {
  REGISTER_AGE,
  REGISTER_COUNTRY,
  REGISTER_EMAIL,
  REGISTER_NAME,
  REGISTER_PASS,
  REGISTER_RESET_FORM,
  REGISTER_WEBSITE,
} from "./stateHandler";
import styles from "../../styles/register.module.css";
export default function Register() {
  const { loading, regitserRequest, state, dispatch } = useHandleRegister();
  return (
    <>
      <Head>
        <title>register user</title>
        <meta name="description" content="sign up user in news webSite" />
      </Head>
      <section className={`row ${styles.regitserPage}`}>
        <form
          onSubmit={(e) => regitserRequest(e)}
          className={`col-12 col-sm-6 col-lg-4 ${styles.registerForm}`}
        >
          <h5 className="text-uppercase text-center">register</h5>
          <label htmlFor="name">name</label>
          <input
            className="form-control"
            type="text"
            placeholder="name"
            id="name"
            value={state.name}
            onChange={(e) =>
              dispatch({
                payload: e.currentTarget.value,
                type: REGISTER_NAME,
              })
            }
          />
          <label htmlFor="age">age</label>
          <input
            className="form-control"
            type="number"
            placeholder="age"
            id="age"
            value={state.age}
            onChange={(e) =>
              dispatch({ payload: e.currentTarget.value, type: REGISTER_AGE })
            }
          />
          <label htmlFor="email">email</label>
          <input
            className="form-control"
            type="text"
            placeholder="email"
            id="email"
            value={state.email}
            onChange={(e) =>
              dispatch({ payload: e.currentTarget.value, type: REGISTER_EMAIL })
            }
          />
          <label htmlFor="password">password</label>
          <input
            className="form-control"
            type="password"
            placeholder="password"
            id="password"
            value={state.password}
            onChange={(e) =>
              dispatch({ payload: e.currentTarget.value, type: REGISTER_PASS })
            }
          />
          <label htmlFor="personal_webSite">personalWebSite</label>
          <input
            className="form-control"
            type="text"
            placeholder="personal_webSite"
            id="personal_webSite"
            value={state.website}
            onChange={(e) =>
              dispatch({
                payload: e.currentTarget.value,
                type: REGISTER_WEBSITE,
              })
            }
          />
          <label htmlFor="country">country</label>
          <input
            className="form-control"
            type="text"
            placeholder="country , seperated"
            id="country"
            value={state.country}
            onChange={(e) =>
              dispatch({
                payload: e.currentTarget.value,
                type: REGISTER_COUNTRY,
              })
            }
          />
          <div className="d-flex my-2">
            <button
              type="submit"
              className="btn btn-primary flex-fill mx-1"
              disabled={loading}
            >
              register
            </button>
            <button
              className="btn btn-danger flex-fill mx-1"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: REGISTER_RESET_FORM });
              }}
            >
              reset
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
Register.customLayout = (page) => {
  return (
    <>
      <Navbar />
      {page}
    </>
  );
};
