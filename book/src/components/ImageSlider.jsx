import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ImageSlider.css';

import Cards from '../pages/Cards';

const ImageSlider = ({ book, addToWishlist, getImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [books, setBooks] = useState([]);
  const slidesToShow = 5;
  const slidesToScroll = 1;

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, 'books');
      const booksQuery = query(booksCollection, orderBy("createdAt", "desc"));
      const booksSnapshot = await getDocs(booksQuery);
      const booksList = booksSnapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id,
      }));
      setBooks(booksList);
    }
    fetchBooks();
  }, []);

  const goToNext = () => {
    const newIndex = (currentIndex + slidesToScroll) % books.length;
    setCurrentIndex(newIndex);
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - slidesToScroll + books.length) % books.length;
    setCurrentIndex(newIndex);
  };

  const getSlidesToShow = () => {
    const slides = [];
    for (let i = 0; i < slidesToShow; i++) {
      const index = (currentIndex + i) % books.length;
      if (books[index]) {
        slides.push(books[index]);
      }
    }
    return slides;
  };

  return (
    <>
      <div className="slider-container">
        <div className="controls">

            <div className="slider-arrow left-arrow" onClick={goToPrevious}>
            ❰
            </div>
            <div className="slider-arrow right-arrow" onClick={goToNext}>
            ❱
            </div>
        </div>
        <div className="slider">
          {getSlidesToShow().map((book, index) => (
              <Cards key={book.id} book={book} addToWishlist={addToWishlist} getImage={getImage} />
          ))}
        </div>

      </div>
    </>
  );
}

export default ImageSlider;
