import Home from "./Home";
import NonVeg from "./NonVeg";
import Veg from "./Veg";
import Milk from "./Milk";
import Deserts from "./Deserts";
import About from "./About Us";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./cart";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faLeaf,
  faFish,
  faCow,
  faIceCream,
  faBasketShopping,
  faCircleInfo,
  faPhone,
  faUser,
  faBoxOpen
} from "@fortawesome/free-solid-svg-icons";
import Contact from "./Contact Us";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./NotFound";
import Orders from "./Orders";
import Register from "./Register";
import { useState, useEffect } from "react";
import Login from "./login";


function App() {
  const cartItems = useSelector((state) => state.cart);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      {/* ✅ NAVBAR */}
      <nav className="navbar">
        <div className="logo">🍽 Food Court</div>

        <div className="nav-links">
          <Link to="/"><FontAwesomeIcon icon={faHouse} /> Home</Link>
          <Link to="/veg"><FontAwesomeIcon icon={faLeaf} style={{ color: "green" }} /> Veg</Link>
          <Link to="/nonveg"><FontAwesomeIcon icon={faFish} style={{ color: "teal" }} /> NonVeg</Link>
          <Link to="/milk"><FontAwesomeIcon icon={faCow} style={{ color: "#795548" }} /> Milk</Link>
          <Link to="/deserts"><FontAwesomeIcon icon={faIceCream} style={{ color: "pink" }} /> Deserts</Link>
          <Link to="/cart"><FontAwesomeIcon icon={faBasketShopping} /> Cart {totalQuantity}</Link>
          <Link to="/orders"><FontAwesomeIcon icon={faBoxOpen} /> Orders</Link>
          <Link to="/about"><FontAwesomeIcon icon={faCircleInfo} /> AboutUs</Link>
          <Link to="/contact"><FontAwesomeIcon icon={faPhone} /> ContactUs</Link>
          <Link to="/register">Register</Link>

          {/* ✅ USER SECTION */}
          {currentUser ? (
            <>
              <span className="welcome-text">
                Welcome, {currentUser.username} 👋
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <FontAwesomeIcon icon={faUser} /> Login
            </Link>
          )}
        </div>
      </nav>

      {/* ✅ ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<NonVeg />} />
        <Route path="/milk" element={<Milk />} />
        <Route path="/deserts" element={<Deserts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;