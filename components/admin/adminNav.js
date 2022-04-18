import {
  faEdit,
  faEnvelope,
  faEnvelopeOpen,
  faInbox,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import styles from "../../styles/adminNavbar.module.css";
import useComments from "./commentsBadge/hooks";
export default function AdminNav() {
  const { data, handleLogOut } = useComments();
  const {
    count,
    countOfPublishedComments,
    countOfReadComments,
    countOfUnreadComments,
  } = data ? data.data : {};
  return (
    <nav className={`navbar navbar-expand flex-wrap ${styles.adminNavbar}`}>
      <div className="navbar-brand text-uppercase font-weight-bold mx-auto ml-sm-0">
        Admin Dashboard
      </div>
      <ul className="nav navbar-nav mr-sm-0 mx-auto px-0">
        <li className="nav-item active order-1">
          <Link href="/">
            <a className="nav-link">
              Home <span className="sr-only">(current)</span>
            </a>
          </Link>
        </li>
        <li className="nav-item order-2">
          <button className="btn nav-link font-weight-bold" onClick={handleLogOut}>
            LogOut
          </button>
        </li>
        <li className={`${styles.comments} order-3`}>
          <div>
            <FontAwesomeIcon icon={faPaperPlane} className={styles.faIcon} />
            <span className="badge badge-warning">
              {countOfPublishedComments}
            </span>
          </div>
          <div>
            <FontAwesomeIcon icon={faEnvelope} className={styles.faIcon} />
            <span className="badge badge-danger">{countOfUnreadComments}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faEnvelopeOpen} className={styles.faIcon} />
            <span className="badge badge-success">{countOfReadComments}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faInbox} className={styles.faIcon} />
            <span className="badge badge-info">{count}</span>
          </div>
          <Link href="comments">
            <a>
              <FontAwesomeIcon icon={faEdit} className={styles.faIcon} />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
