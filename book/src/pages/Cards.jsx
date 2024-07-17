// src/components/Card.js
import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Card.css';

const Cards = ({ book, addToWishlist, getImage }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const halfWidth = rect.width / 2;
      const halfHeight = rect.height / 2;
      const rotateX = ((y - halfHeight) / halfHeight) * 10;
      const rotateY = ((x - halfWidth) / halfWidth) * -10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="card-container">
      <div className="card" ref={cardRef}>
        <img src={getImage(book.imageLink)} alt={book.title} />
        <div className="card-content">
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <span onClick={() => addToWishlist(book)} className="wishIcon">
            <FontAwesomeIcon icon="fa-regular fa-heart" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
