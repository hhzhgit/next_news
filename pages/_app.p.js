import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/footer";
import generalStates from "../miscellaneous/context";
import useAppStates from "../miscellaneous/appState";
import Head from "next/head";
import "../styles/global.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
// import '@fortawesome/fontawesome-free/css/all.css';
if (typeof window !== "undefined") {
  require("jquery");
  require("bootstrap/dist/js/bootstrap.bundle");
}
config.autoAddCss = false;
function MyApp({ Component, pageProps }) {
  const appStates = useAppStates(pageProps);
  if (
    pageProps?.userAccess &&
    !pageProps?.userAccess.includes(appStates?.user?.role)
  ) {
    return <div>access band redirecting...</div>;
  }
  if (Component.customLayout) {
    return (
      <generalStates.Provider value={appStates}>
        {Component.customLayout(<Component {...pageProps} />)}
      </generalStates.Provider>
    );
  }
  return (
    <>
      <Head>
        <title>fake news</title>
        <meta name="description" content="news" />
      </Head>
      <generalStates.Provider value={appStates}>
        <div
          className="container-fluid px-2 px-sm-0 overflow-auto"
          style={{ minHeight: "100vh" }}
        >
          <Navbar />
          <Component {...pageProps} />
        </div>
        <Footer />
      </generalStates.Provider>
    </>
  );
}

export default MyApp;
