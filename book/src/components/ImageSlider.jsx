import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import AliceCarousel from "react-alice-carousel";
import "./ImageSlider.css";

import Cards from "../pages/Cards";

const ImageSlider = ({ book, addToWishlist, getImage, limit = 4 }) => {
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

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
    1224: { items: 4 },
  };

  const sliderBooks = limit ? books.slice(0, limit) : books;
  const sliderItems = sliderBooks.map((book) => (
    <Cards
      key={book.id}
      book={book}
      addToWishlist={addToWishlist}
      getImage={getImage}
    />
  ));
  return (
    <>
      <div className="slider-container">
        <AliceCarousel
          items={sliderItems}
          mouseTracking
          responsive={responsive}
          controlsStrategy="alternate"
          infinite
        />
      </div>
    </>
  );
};

export default ImageSlider;
