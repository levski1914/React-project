import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import Books from "./Books";
import { useWishlist } from "../pages/WishContext";

const images = import.meta.glob("../assets/images/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

const getImage = (imageName) => {
  const matchedImage = Object.keys(images).find((key) =>
    key.includes(imageName)
  );
  return matchedImage ? images[matchedImage].default : null;
};

const CarouselSlider = ({ limit = 9 }) => {
  const [books, setBooks] = useState([]);
  const { addToWishlist } = useWishlist();
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
  const sliders = limit ? books.slice(0, limit) : books;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div>
      <h1>Carousel</h1>

      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {sliders.map((book) => (
          <Books
            key={book.id}
            book={book}
            addToWishlist={addToWishlist}
            getImage={getImage}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
