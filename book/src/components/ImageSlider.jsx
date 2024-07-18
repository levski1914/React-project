import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import AliceCarousel from 'react-alice-carousel';
import "./ImageSlider.css";

import Cards from "../pages/Cards";

const ImageSlider = ({ book, addToWishlist, getImage }) => {
  
  const [books, setBooks] = useState([]);


  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const booksQuery = query(booksCollection, orderBy("createdAt", "desc"));
      const booksSnapshot = await getDocs(booksQuery);
      const booksList = booksSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBooks(booksList);
    };
    fetchBooks();
  }, []);
  const handleDragStart=(e)=>e.preventDefault();

  return (
    <>
      <div className="slider-container">
        <div className="slider">
          {books.map((book, index) => (
            <Cards
              key={book.id}
              book={book}
              addToWishlist={addToWishlist}
              getImage={getImage}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
