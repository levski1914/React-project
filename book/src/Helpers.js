import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchBooksQuery = async (searchTerm = " ") => {
  const booksCollection = collection(db, "books");
  let booksQuery;

  if (searchTerm) {
    booksQuery = query(
      booksCollection,
      where("title", ">=", searchTerm),
      where("title", "<=", searchTerm + "\uf8ff")
    );
  } else {
    booksQuery = query(booksCollection);
  }
  const booksSnapshot = await getDocs(booksQuery);
  return booksSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};
