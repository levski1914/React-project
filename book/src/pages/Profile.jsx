// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authcontext";

const Profile = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser) {
        try {
          console.log("Fetching data for user with uid:", currentUser.uid);
          const userDoc = doc(db, "users", currentUser.uid);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            console.log("User data:", userSnapshot.data());
            setUser(userSnapshot.data());
          } else {
            console.log("No such document!");
            setError("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError(
            "Failed to fetch user data. Please check your internet connection."
          );
        }
      } else {
        navigate("/login"); // Пренасочете потребителя към страницата за вход
      }
      setLoading(false);
    };

    fetchUser();
  }, [currentUser, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          {/* Добавете повече детайли при необходимост */}
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default Profile;
