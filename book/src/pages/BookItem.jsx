// src/components/BookItem.js
import React from "react";
// import { useWishlist } from "./WishlistContext";
import { useWishlist } from "./WishContext";
const BookItem = ({ book }) => {
  const { addToWishlist } = useWishlist();

  const images = import.meta.glob("../assets/images/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });

  const getImage = (imageName) => {
    const matchedImage = Object.keys(images).find((key) =>
      key.includes(imageName)
    );
    return matchedImage ? images[matchedImage].default : null;
  };

  return (
    <li className="book-item">
      <img src={getImage(book.imageLink)} alt={book.title} />
      <div className="bookDetails">
        <h2>{book.title}</h2>
        <p>Author: {book.author}</p>
        <p>Pages: {book.pages}</p>
        <p>Language: {book.language}</p>
        <p>Year: {book.year}</p>
        <p>Uploaded: {book.createdAt?.toDate().toDateString()}</p>
        <a href={book.link}>More info</a>
        <button onClick={() => addToWishlist(book)}>Add to Wishlist</button>
      </div>
    </li>
  );
};

export default BookItem;
