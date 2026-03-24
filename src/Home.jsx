import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();

  return (
    <>
    <div className="home">
      <div className="overlay">
        <div className="home-content">
          <h1>Welcome to Food Court 🍽</h1>
          <p>Delicious Food Delivered Fresh & Fast</p>
          <p> welcome to the Home page.click the button .</p>
          <button 
            className="explore-btn"
            onClick={() => navigate("/veg")}>
            Explore Menu
          </button>
          {/* <button onClick={()=> navigate("/Profile")}> 
            Go to profile</button> */}
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
