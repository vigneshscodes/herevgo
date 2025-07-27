import React from "react";
import "../styles/Misc.css"; 

const About = () => {
  return (
    <div className="about-page">
      <h1>About HereVGo</h1>
      <p>
        HereVGo is a smart vehicle pooling platform designed to reduce traffic congestion, 
        minimize travel costs, and promote a greener environment. Our mission is to 
        make transportation efficient, cost-effective, and socially connected.
      </p>
      <h2>Our Vision</h2>
      <p>We aim to revolutionize shared mobility by providing a seamless and secure ride-sharing experience.</p>
      <h2>Why Choose Us?</h2>
      <ul>
        <li>Reliable and verified ride-sharing</li>
        <li>Cost-effective travel solutions</li>
        <li>Eco-friendly transportation</li>
        <li>Modern and user-friendly interface</li>
      </ul>
    </div>
  );
};

export default About;
