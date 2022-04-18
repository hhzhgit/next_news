import Link from "next/dist/client/link";
import useNavabr from "./hook";
import Spinner from "../spinner";
import styles from "../../styles/navbar.module.css";
export default function Navbar() {
  const {
    user,
    logOutHandler,
    categories,
    error,
    search,
    setSearch,
    handleSearch,
  } = useNavabr();
  return (
    <nav className={`navbar navbar-expand-md ${styles.nav}`}>
      <Link href="/">
        <a className="navbar-brand">FakeNews</a>
      </Link>
      <button
        className="navbar-toggler d-lg-none navbar-light"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown order-2">
            <a
              className="nav-link dropdown-toggle font-weight-bold"
              href="#"
              id="dropdownId"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              categories
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              {error ? (
                <div className="dropdown-item">error happend</div>
              ) : !categories ? (
                <Spinner className="dropdown-item" />
              ) : (
                categories.map((cat, i) => (
                  <Link href={`/category/${cat}`} key={i}>
                    <a className={`dropdown-item ${styles.dropdownLink}`}>
                      {cat}
                    </a>
                  </Link>
                ))
              )}
            </div>
          </li>
          {!user && (
            <li className="nav-item active oreder-1">
              <Link href="/users/loggin">
                <a className="nav-link font-weight-bold">loggin/sign up</a>
              </Link>
            </li>
          )}
          {user && (
            <li className="nav-item dropdown order-1">
              <div
                className="nav-link dropdown-toggle btn text-left font-weight-bold"
                data-toggle="dropdown"
                id="userDropDown"
              >
                Hi {user.name}
              </div>
              <div className="dropdown-menu" id="userDropDown">
                {(user?.role == "admin" || user?.role == "super admin") && (
                  <Link href="/admin">
                    <a className={`btn dropdown-item ${styles.dropdownLink}`}>
                      admin dashboard
                    </a>
                  </Link>
                )}
                <button
                  className={`btn dropdown-item ${styles.dropdownLink}`}
                  onClick={logOutHandler}
                >
                  logout
                </button>
              </div>
            </li>
          )}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <div className="col-12 col-sm-3 px-1">
            <button
              className="btn btn-success my-2 my-sm-0 w-100"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
}
