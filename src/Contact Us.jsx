import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-container">

      {/* Header */}
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We would love to hear from you!</p>
      </div>

      {/* Contact Section */}
      <div className="contact-content">

        {/* Contact Info */}
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p><strong>📍 Address:</strong> Hyderabad, Telangana, India</p>
          <p><strong>📞 Phone:</strong> +91 9876543210</p>
          <p><strong>📧 Email:</strong> support@freshfood.com</p>
          <p>
            Feel free to contact us for any queries regarding orders,
            products, or delivery details.
          </p>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send Message</h2>

          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea rows="5" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;