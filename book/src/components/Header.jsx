// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Импортиране на CSS файла за стилове
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../Authcontext";
const Header = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <header className="header" style={{ position: "relative" }}>
        <div className="title-bar">
          <h1>
            <img
              src="../../images/download (10).png"
              alt=""
              style={{ width: "30px", height: "30px" }}
            />
            Book Social Network
          </h1>
        </div>
        <div className="under-title">
          <ul>
            <li className="profile">
              Profile
              <div className="semiMenu">
                {currentUser ? (
                  <>
                    <li>
                      <Link to="/profile">Edit profile</Link>
                    </li>
                    <li>
                      <Link to="/manage-books">Manage Books</Link>
                    </li>
                    <li>
                      <Link to="/logout">Log out</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login">Log in</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </>
                )}
              </div>
            </li>
            <li>Tools</li>
            <li>Favorites</li>
            <li>Help</li>
          </ul>

          <div className="logo">
            <img src="../../images/download.png" alt="" />
          </div>
        </div>
        <div className="container">
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">
                  <img
                    src="../../images/download (1).png"
                    alt=""
                    style={{ paddingRight: "10px" }}
                  />
                  Home
                </Link>
              </li>

              <li>
                <Link to="/search">
                  <img
                    src="../../images/download (3).png"
                    alt=""
                    style={{ paddingRight: "10px" }}
                  />
                  Search
                </Link>
              </li>
              <li>
                <Link to="/books">
                  <img
                    src="../../images/download (2).png"
                    alt=""
                    style={{ paddingRight: "10px" }}
                  />
                  Books
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img
                    src="../../images/download (4).png"
                    alt=""
                    style={{ paddingRight: "10px" }}
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
