import React from "react";
import "../styles/Misc.css"; 
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Have questions? Reach out to us!</p>
      <div className="contact-info">
        <p><strong>Email:</strong> support@herevgo.com</p>
        <p><strong>Phone:</strong> +91 9876543210</p>
        <p><strong>Address:</strong> VIT Vellore, Tamil Nadu, India</p>
      </div>
      <h2>Follow Us</h2>
      <div className="social-icons">
                    <FaFacebook />
                    <FaTwitter />
                    <FaInstagram />
    </div>
    </div>
  );
};

export default Contact;
