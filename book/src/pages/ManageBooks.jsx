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
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../Authcontext";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
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
  const handleUpdateBook = async (id) => {
    const newTitle = prompt("Enter new title");
    const newAuthor = prompt("Enter new author");
    const newImage = promt("Enter new Author");
    const bookDoc = doc(db, "books", id);
    await updateDoc(bookDoc, {
      title: newTitle,
      author: newAuthor,
      image: newImage,
    });
    setBooks(
      books.map((book) =>
        book.id === id
          ? { ...book, title: newTitle, author: newAuthor, image: newImage }
          : book
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
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        {/* {image && <img src={URL.createObjectURL(image)} alt="Preview" />} */}
        <button type="submit">Add Book</button>
      </form>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
            {book.image && <img src={book.image} alt={book.title} />}
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
