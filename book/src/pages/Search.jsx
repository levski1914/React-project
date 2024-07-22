import React from "react";
import Aside from "./Aside";
import { Link } from "react-router-dom";
const Search = () => {
  return (
    <>
      <div className="aside">
        <article className="aside-cards">
          <div className="aside-card-main">
            <h2>Search by any or all of the criteria below. </h2>
            <div className="search-input">
              <input type="text" />
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default Search;
