import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About Us</h1>
        <p>Delivering Freshness & Quality to Your Doorstep</p>
      </div>

      {/* Our Story Section */}
      <div className="about-section">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            We started our journey with a simple mission — to provide fresh,
            hygienic and high-quality food products to our customers. 
            From farm-fresh milk to delicious veg and non-veg dishes,
            we ensure every product meets the highest standards.
          </p>
        </div>

        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1506617420156-8e4536971650" alt="Our Story" />
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="mission-vision">
        <div className="card">
          <h3>Our Mission</h3>
          <p>
            To deliver fresh, healthy and affordable food products
            while maintaining quality and customer satisfaction.
          </p>
        </div>

        <div className="card">
          <h3>Our Vision</h3>
          <p>
            To become the most trusted online food platform
            known for freshness, hygiene and reliability.
          </p>
        </div>
      </div>

    </div>
  );
}

export default About;