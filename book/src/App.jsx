// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BookList from "./pages/BookList";
// import BookDetails from "./pages/BookDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./Authcontext";
import { WishlistProvider } from "./pages/WishContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import "react-alice-carousel/lib/alice-carousel.css";
import Game from "./Xp apps/minesweeper/minesweeper/src/Game";
// import your icons
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { playClickSound } from "./audio";
import Logout from "./pages/Logout";
import ManageBooks from "./pages/ManageBooks";
import WishList from "./pages/WishList";
import Search from "./pages/Search";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.addEventListener("click", playClickSound);
    return () => {
      document.removeEventListener("click", playClickSound);
    };
  });
  return (
    <AuthProvider>
      <WishlistProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/search" element={<Search />} />
            <Route path="/minesweeper" element={<Game />} />
            <Route
              path="/manage-books"
              element={
                <ProtectedRoute>
                  <ManageBooks />
                </ProtectedRoute>
              }
            />

            <Route path="/wishlist" element={<WishList />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>

          <Footer />
          <ToastContainer />
        </Router>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
library.add(fab, fas, far);
