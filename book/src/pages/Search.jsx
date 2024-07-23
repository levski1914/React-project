import React, { useState } from "react";
import Aside from "./Aside";
import { Link } from "react-router-dom";
import './Search.css'
import { fetchBooksQuery } from "../Helpers";
import RatingStars from "../components/Rating";
import { useWishlist } from "./WishContext";
const images = import.meta.glob("../assets/images/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });
  
  const getImage = (imageName) => {
    const matchedImage = Object.keys(images).find((key) =>
      key.includes(imageName)
    );
    return matchedImage ? images[matchedImage].default : null;
  };
  

const Search = () => {
    const [books,setBooks]=useState([]);
    const [searchTerm,setSearchTerm]=useState("");
    const { addToWishlist } = useWishlist();
    const handleSearch=books.filter((book)=>book.title?book.title.toLowerCase().includes(searchTerm.toLowerCase()):false)
  return (
    <>
    <div className="Search">

      <div className="aside search">
        <article className="aside-cards">
          <div className="aside-card-main">
            <h2>Search by any or all of the criteria below. </h2>
            <div className="search-input">
                <h3>All or part of the book name:</h3>
              <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}  />
            </div>
            <div className="btns">
                <div className="back btn">
                    <Link to="/">
                        Back
                    </Link>
                </div>
                <div className="srch btn">
                    <button onClick={handleSearch}>
                        Search

                    </button>
                    
                </div>
            </div>
          </div>
        </article>
        <img style={{width:"100px",height:"100px"}} src="../../images/Image_29.webp" alt="" />
      </div>
      <div className="searchPlace">
        {handleSearch.map((book)=(
              <li key={book.id}>
              <img src={getImage(books.imageLink)} alt={books.title} />
              <div className="bookDetails">
                <h2>{book.title}</h2>
                <p>Author: {books.author}</p>
                <p>Pages: {books.pages}</p>
                <p>Language: {books.language}</p>
                <p>Year: {books.year}</p>
                <a href={books.link}>More info</a>

                <div className="button">
                  <button onClick={() => addToWishlist(books)}>
                    Add to Wishlist
                  </button>
                  <RatingStars bookId={books.id} initialRating={books.rating} />
                </div>
              </div>
            </li>
        ))}



        <div className="watermark">
            <img src="../../images/Windows Icons - PNG/shell32.dll_14_23-8.png" alt="" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Search;
