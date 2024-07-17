import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useWishlist } from "./WishContext";
import Cards from "./Cards";
import ImageSlider from "../components/ImageSlider";

import RatingStars from "../components/Rating";
import Books from "../components/Books";
import CarouselSlider from "../components/CarouselSlider";
const images = import.meta.glob("../assets/images/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

const getImage = (imageName) => {
  const matchedImage = Object.keys(images).find((key) =>
    key.includes(imageName)
  );
  return matchedImage ? images[matchedImage].default : null;
};

const Home = ({ limit = 8, one = 1, six = 4, slides }) => {
  const { wishlistCount } = useWishlist();
  const [books, setBooks] = useState([]);
  const { addToWishlist } = useWishlist();
  const [value, setValue] = useState(2);
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

  const getRandomBook = (books) => {
    if (books.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * books.length);
    return books[randomIndex];
  };
  const displayedBooks = limit ? books.slice(0, limit) : books;
  const todayDeal = six ? books.slice(0, six) : books;
  const OneBook = one ? [getRandomBook(books)] : books;
  return (
    <>
      <main className="mainContainer">
        <div className="mainHeader">
          <nav>
            <div className="menuCategory">
              <div className="toggle-cat-wrap">
                <FontAwesomeIcon icon="fa-solid fa-bars-staggered" />
              </div>
              <ul></ul>
            </div>

            <ul className="mainHeader-col2">
              <li>
                <Link to="/">Blog</Link>
              </li>
              <li>
                <Link to="/">Shop</Link>
              </li>
              <li>
                <Link to="/">Most Popular</Link>
              </li>
              <li>
                <Link to="/">New Arrival</Link>
              </li>
              <li>
                <Link to="/">on Sale</Link>
              </li>
              <li>
                <Link to="/">Contact us</Link>
              </li>
            </ul>
            <section className="mainHeader-col3">
              <div className="header-support">
                <a href="#" className="btn-main-header">
                  Order Your Book now
                </a>
              </div>
            </section>
          </nav>
        </div>

        <div className="Container">
          <div className="logIn">
            <ul>
              <li>
                <FontAwesomeIcon icon="fa-solid fa-lock" />
              </li>
              <li>
                <Link to="/wishlist">
                  <FontAwesomeIcon icon="fa-regular fa-heart" />
                  <span>({wishlistCount})</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mainArea">
            <div className="primaryContent">
              <h2>All in one Book store</h2>
              <div className="Books">
                <ul className="bookList main">
                  {displayedBooks.map((book) => (
                    <Cards
                      key={book.id}
                      book={book}
                      addToWishlist={addToWishlist}
                      getImage={getImage}
                    >
                      <h2 slot="header">{book.title}</h2>
                      <p slot="content">Author: {book.author}</p>
                    </Cards>
                  ))}
                </ul>
              </div>
              <section className="Today">
                <h2>Today's deal</h2>
                <div className="Content">
                  <div className="tabContent">
                    <ul className="bookList today">
                      {todayDeal.map((book) => (
                        <Cards
                          key={book.id}
                          book={book}
                          addToWishlist={addToWishlist}
                          getImage={getImage}
                        />
                      ))}
                      {OneBook.map(
                        (book) =>
                          book && (
                            <li key={book.id} className="wrap">
                              <img src={getImage(book.imageLink)} alt="" />
                              <div className="bookDetails">
                                <h2>{book.title}</h2>
                                <span
                                  onClick={() => addToWishlist(book)}
                                  className="wishIcon"
                                >
                                  <FontAwesomeIcon icon="fa-regular fa-heart" />
                                </span>
                              </div>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                </div>
              </section>
              <section className="populart">
                <ImageSlider
                  books={books}
                  addToWishlist={addToWishlist}
                  getImage={getImage}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
