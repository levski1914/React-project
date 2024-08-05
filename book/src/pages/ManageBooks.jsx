// src/pages/ManageBooks.js
import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../Authcontext";
import Aside from "./Aside";
import "./Styles/Manage.css";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [editBook, setEditBook] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newImage, setNewImage] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      if (currentUser) {
        const booksCollection = collection(db, "books");
        const q = query(
          booksCollection,
          where("userId", "==", currentUser.uid)
        );
        const booksSnapshot = await getDocs(q);
        const booksList = booksSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBooks(booksList);
      }
    };

    fetchBooks();
  }, [currentUser]);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `book-images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }
      const docRef = await addDoc(collection(db, "books"), {
        title,
        author,
        imageUrl,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setBooks([
        ...books,
        {
          id: docRef.id,
          title,
          author,
          imageUrl,
          userId: currentUser.uid,
        },
      ]);
      setTitle("");
      setAuthor("");
      setImage(null);
    } catch (error) {
      console.error("Error adding book: ", error);
    }
  };

  const handleEditBook = (book) => {
    setEditBook(book);
    setNewTitle(book.title);
    setNewAuthor(book.author);
    setNewImage(null);
  };
  const handleUpdateBook = async (e) => {
    e.preventDefault();
    const bookDoc = doc(db, "books", editBook.id);
    let imageUrl = editBook.imageUrl;

    if (newImage) {
      const imageRef = ref(storage, `book-images/${newImage.name}`);
      await uploadBytes(imageRef, newImage);
      imageUrl = await getDownloadURL(imageRef);
    }

    await updateDoc(bookDoc, {
      title: newTitle,
      author: newAuthor,
      imageUrl,
    });

    setBooks(
      books.map((book) =>
        book.id === editBook.id
          ? { ...book, title: newTitle, author: newAuthor, imageUrl }
          : book
      )
    );

    setEditBook(null);
    setNewTitle("");
    setNewAuthor("");
    setNewImage(null);
  };

  const handleDeleteBook = async (id) => {
    const bookDoc = doc(db, "books", id);
    await deleteDoc(bookDoc);
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="Manage">
      <Aside />
      <div className="Manage-Container">
        <h1>Manage Books</h1>

        <form onSubmit={editBook ? handleUpdateBook : handleAddBook}>
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
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          {image && <img src={URL.createObjectURL(image)} alt="Preview" />}
          <button type="submit">Add Book</button>
        </form>

        <ul>
          {books.map((book) => (
            <li key={book.id} className="userBooks">
              {book.title} by {book.author}
              {book.imageUrl && <img src={book.imageUrl} alt={book.title} />}
              {book.userId === currentUser.uid && (
                <>
                  <button onClick={() => handleEditBook(book)}>Edit</button>
                  <button onClick={() => handleDeleteBook(book.id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      {editBook && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleUpdateBook}>
              <input
                type="text"
                placeholder="New Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="New Author"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                required
              />
              <input
                type="file"
                onChange={(e) => setNewImage(e.target.files[0])}
              />
              {newImage && (
                <img src={URL.createObjectURL(newImage)} alt="Preview" />
              )}
              <button type="submit">Update Book</button>
              <button type="button" onClick={() => setEditBook(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
