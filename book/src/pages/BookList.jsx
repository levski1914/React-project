// src/pages/BookList.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useWishlist } from "./WishContext";
import "./BookList.css";

// Динамично импортиране на изображения с Vite
const images = import.meta.glob("../assets/images/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

const getImage = (imageName) => {
  const matchedImage = Object.keys(images).find((key) =>
    key.includes(imageName)
  );
  return matchedImage ? images[matchedImage].default : null;
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const { addToWishlist } = useWishlist();
  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const booksQuery = query(booksCollection, orderBy("createdAt", "desc")); // Запитване за сортиране по дата на качване
      const booksSnapshot = await getDocs(booksQuery);
      const booksList = booksSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBooks(booksList);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1 className="Title">Book List</h1>
      <ul className="bookList">
        {books.map((book) => (
          <li key={book.id}>
            <img src={getImage(book.imageLink)} alt={book.title} />
            <div className="bookDetails">
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Pages: {book.pages}</p>
              <p>Language: {book.language}</p>
              <p>Year: {book.year}</p>
              <a href={book.link}>More info</a>
              <button onClick={() => addToWishlist(book)}>
                Add to Wishlist
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
