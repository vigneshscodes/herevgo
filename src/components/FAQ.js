import React from "react";
import "../styles/Misc.css"; 

const FAQ = () => {
  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>

      <div className="faq-item">
        <h2>1. How does HereVGo work?</h2>
        <p>HereVGo connects students looking for travel with those offering it.</p>
      </div>

      <div className="faq-item">
        <h2>2. Is it safe?</h2>
        <p>Yes, only verified users from VIT can participate, ensuring safety.</p>
      </div>

      <div className="faq-item">
        <h2>3. Is there a cost for using HereVGo?</h2>
        <p>Riders can share costs, making travel affordable.</p>
      </div>

      <div className="faq-item">
        <h2>4. How do I offer a ride?</h2>
        <p>Go to "Share a Ride" and enter your details to post your ride.</p>
      </div>
    </div>
  );
};

export default FAQ;
