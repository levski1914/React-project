// src/components/Card.js
import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Card.css";
import RatingStars from "../components/Rating";

const Cards = ({ book, addToWishlist, getImage }) => {
  const cardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });

  useEffect(() => {
    const card = cardRef.current;
    const updateDimensions = () => {
      setDimensions({ width: card.offsetWidth, height: card.offsetHeight });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const handleMouseMove = (event) => {
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - rect.width / 2;
    const mouseY = event.clientY - rect.top - rect.height / 2;
    setMousePosition({ mouseX, mouseY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ mouseX: 0, mouseY: 0 });
  };

  const { width, height } = dimensions;
  const { mouseX, mouseY } = mousePosition;

  const mousePX = mouseX / width;
  const mousePY = mouseY / height;

  const cardStyle = {
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
  };

  const cardBgTransform = {
    transform: `translateX(${mousePX * -30}px) translateY(${mousePY * -30}px)`,
    backgroundImage: `url(${getImage(book.imageLink)})`,
  };

  return (
    <div className="card-container">
      <div
        className="card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={cardStyle}
      >
        <img src={getImage(book.imageLink)} alt={book.title} />
        <div className="card-content">
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
        </div>
        <span onClick={() => addToWishlist(book)} className="wishIcon">
          <FontAwesomeIcon icon="fa-regular fa-heart" />
        </span>
      </div>
    </div>
  );
};

export default Cards;
