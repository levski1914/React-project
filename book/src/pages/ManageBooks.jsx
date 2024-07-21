// src/pages/ManageBooks.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../Authcontext";
import booksData from "../books.json";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBooks(booksList);
    };

    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "books"), {
        title,
        author,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setBooks([
        ...books,
        { id: docRef.id, title, author, userId: currentUser.uid },
      ]);
      setTitle("");
      setAuthor("");
    } catch (error) {
      console.error("Error adding book: ", error);
    }
  };

  // const handleAddBooksFromJson = async () => {
  //   try {
  //     const booksCollection = collection(db, "books");
  //     for (const book of booksData) {
  //       await addDoc(booksCollection, {
  //         ...book,
  //         createdAt: serverTimestamp(),
  //       });
  //     }
  //     const booksSnapshot = await getDocs(booksCollection);
  //     const booksList = booksSnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setBooks(booksList);
  //   } catch (error) {
  //     console.error("Error adding books from JSON: ", error);
  //   }
  // };

  const handleUpdateBook = async (id) => {
    const newTitle = prompt("Enter new title");
    const newAuthor = prompt("Enter new author");
    const bookDoc = doc(db, "books", id);
    await updateDoc(bookDoc, { title: newTitle, author: newAuthor });
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, title: newTitle, author: newAuthor } : book
      )
    );
  };

  const handleDeleteBook = async (id) => {
    const bookDoc = doc(db, "books", id);
    await deleteDoc(bookDoc);
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div>
      <h1>Manage Books</h1>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>
      {/* <button onClick={handleAddBooksFromJson}>Add Books from JSON</button> */}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
            {book.userId === currentUser.uid && (
              <>
                <button onClick={() => handleUpdateBook(book.id)}>Edit</button>
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBooks;
