import React, { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser.uid;
      await addDoc(collection(db, "books"), {
        title,
        author,
        userId: currentUser.uid,
        createdAt: new Date(),
      });
      setBooks([
        ...books,
        { id: docRef.id, title, author, userId: currentUser.uid },
      ]);
      setTitle("");
      setAuthor("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h1>Add book</h1>
        <form onSubmit={handleAddBook}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />

          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            required
          />

          <button type="submit">Add book</button>
        </form>
      </div>
    </>
  );
};

export default AddBooks;
