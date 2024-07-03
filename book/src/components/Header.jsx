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
        <div className="container">
          <h1 className="logo">Book Social Network</h1>
          <section className="search">
            <input type="text" />
            <select name="types" id="types">
              <option value="Type">Book type</option>
              <option value="Audio">Audio book</option>
              <option value="E-book">E-book</option>
              <option value="Paper">Paper book</option>
            </select>
            <button>Search</button>
          </section>
          <ul className="prof">
            <li>
              <FontAwesomeIcon icon="fa-solid fa-bookmark" />
            </li>
            <li>
              <FontAwesomeIcon icon="fas fa-shopping-cart" />
            </li>
            {currentUser ? (
              <>
                <li>
                  <Link to="/profile">
                    <FontAwesomeIcon icon="fa-solid fa-user" />
                  </Link>
                </li>
                <li>
                  <Link to="/manage-books">Manage Books</Link>
                </li>
                <li>
                  <Link to="/logout">
                    <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="container">
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/books">
                  <FontAwesomeIcon icon="fa-solid fa-book" /> Books
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <section className="header-part">
        <img
          style={{ width: "100%", zIndex: -1 }}
          src="https://wpthemes.themehunk.com/book-store/wp-content/uploads/sites/230/2022/04/book-store-slider-1.png"
        />
      </section>
    </>
  );
};

export default Header;
