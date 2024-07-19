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
        <h1>Book Social Network</h1>
      </div>
        <div className="under-title">
          <ul>
            <li>
              Profile
              <div className="semiMenu">
              { currentUser?(
                <>
                  <li>
                    <Link to="/profile">
                      Edit profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/manage-books">Manage Books</Link>
                  </li>
                  <li>
                    <Link to="/logout">
                        Log out
                    </Link>
                  </li>
                </>
              ):(
                <>
                    <li>
                      <Link to="/login">
                        Log in
                      </Link>
                    </li>
                </>
              )

              }

              </div>
            </li>
            <li>
              Tools
            </li>
            <li>
              Favorites
            </li>
            <li>
              Help
            </li>
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
                  <img src="../../images/download (1).png" alt=""  style={{paddingRight:"10px"}}/>
                 Home</Link>
                </li>
        
                <li>
                <Link to="/">
                  <img src="../../images/download (3).png" alt="" style={{paddingRight:"10px"}} />
                 
                    Search
                  </Link>
                  
                </li>
                <li>
                <Link to="/books">
                  <img src="../../images/download (2).png" alt=""  style={{paddingRight:"10px"}}/>
                  
                   Books
                  </Link>
                </li>
                <li>
                <Link to="/">
                  <img src="../../images/download (4).png" alt=""  style={{paddingRight:"10px"}}/>
                 
                  </Link>
                </li>
              </ul>
            </nav>
          
          {/* <section className="search">
            <input type="text" />
            <select name="types" id="types">
              <option value="Type">Book type</option>
              <option value="Audio">Audio book</option>
              <option value="E-book">E-book</option>
              <option value="Paper">Paper book</option>
            </select>
            <button>Search</button>
          </section> */}
          <ul className="prof">
            {currentUser ? (
              <>
               
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
        
      </header>

    </>
  );
};

export default Header;
