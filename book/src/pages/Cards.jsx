// src/components/Card.js
import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Card.css";
import RatingStars from "../components/Rating";

const Cards = ({ book, addToWishlist, getImage }) => {
  const cardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState({});

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

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentsSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    const comment = {
      id: comments.length + 1,
      user: currentUser ? currentUser.name : "User",
      text: newComment,
      timestamp: new Date(),
      likes: 0,
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleLike = (commentId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [commentId]: (prevLikes[commentId] || 0) + 1,
    }));
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
    <div className={`card-container ${showComments ? "expanded" : ""}`}>
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
        <button className="Show" onClick={toggleComments}>
          <FontAwesomeIcon icon="fa-solid fa-comments" />
        </button>

        <div className={`comments ${showComments ? "show" : ""}`}>
          <ul className="comment-list">
            {comments.map(())

            }
            <li className="comment">
              <div className="comment-header">
                <h4>User</h4>
                <h5>
                  Posted: 2min{" "}
                  <span>
                    {" "}
                    <FontAwesomeIcon icon="fa-regular fa-thumbs-up" />
                  </span>{" "}
                  <span>
                    {" "}
                    <FontAwesomeIcon icon="fa-regular fa-thumbs-up" />
                  </span>{" "}
                </h5>
              </div>
              <div className="comment-body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et,
                repellendus.
              </div>
              <div className="likes">
                <ul className="icons">
                  <li className="like-btn">
                    <FontAwesomeIcon icon="fa-regular fa-thumbs-up" />
                  </li>
                  <li className="like-btn">
                    <FontAwesomeIcon icon="fa-regular fa-thumbs-down" />
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <form className="send">
            <input type="text" placeholder="Type your comment here" />
            <button type="submit"> send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cards;
