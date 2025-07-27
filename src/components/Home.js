import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/logo.png";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import rideIcon from "../assets/rideIcon.png";
import offerIcon from "../assets/offerIcon.png";
import foundRideIcon from "../assets/foundRideIcon.png";
import sharedRideIcon from "../assets/sharedRideIcon.png";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import ei1 from "../assets/ei1.png"
import ei2 from "../assets/ei2.png"
import ei3 from "../assets/ei3.png"
import ei4 from "../assets/ei4.png"

const Home = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/logout");
  };

  return (
    <div className="home-page">
      <div className="logo-container">
        <img src={logo} alt="HereVGo Logo" className="logo" />
      </div>

      <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
        <div className="nav-links">
          <Link to="/profile">Profile</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQs</Link>
          <span className="logout-link" onClick={handleLogout}>Logout</span>
        </div>
      </nav>

      <div className="features-section">
        <div className="feature">
          <img src={icon1} alt="Traffic & Parking" className="feature-image-left" />
          <p><strong>Traffic & Parking Efficiency</strong><br />
          HereVGo helps reduce congestion by promoting ride-sharing, cutting down the number of vehicles on the road, and easing parking issues. It maximizes vehicle usage, saving time and fuel. With fewer individual vehicles on campus, it ensures smoother traffic flow, lowers travel stress, and minimizes parking struggles. Additionally, optimized routes help reduce unnecessary delays.</p>
        </div>
        <div className="feature">
          <p><strong>Cost-Effective & Social</strong><br />
          Users can split travel costs, making commuting more affordable and stress-free. It eliminates the hassle of expensive solo travel while promoting financial savings. The platform also fosters social connections by enabling verified students to travel together, enhancing campus networking and encouraging a sense of community.</p>
          <img src={icon2} alt="Cost-Effective" className="feature-image-right" />
        </div>
        <div className="feature">
          <img src={icon3} alt="Eco-Friendly" className="feature-image-left" />
          <p><strong>Eco-Friendly & Safe</strong><br />
          By lowering carbon emissions, HereVGo supports a greener planet and contributes to sustainable transportation. Fewer vehicles mean reduced pollution, making the environment cleaner. The app’s verification system ensures a secure and reliable ride-sharing experience by allowing only registered users, enhancing safety and trust among passengers.</p>
        </div>
        <div className="feature">
          <p><strong>User-Friendly & Scalable</strong><br />
          With a modern UI and secure authentication, HereVGo is designed for ease of use and smooth navigation. The platform is scalable, allowing future enhancements such as fare splitting, real-time tracking, and AI-based route optimization. Its intuitive interface ensures a seamless experience for both riders and drivers.</p>
          <img src={icon4} alt="User-Friendly" className="feature-image-right" />
        </div>
      </div>

      <div className="ride-section ride-section1">
        <img src={rideIcon} alt="Find a Ride" className="ride-image-left" />
        <div className="ride-text">
          <p><strong>Find a Ride</strong><br />
            Find a reliable ride with verified users and save on travel expenses.</p>
          <Link to="/find-ride" className="ride-button1">Find a Ride</Link>
        </div>
      </div>

      <div className="ride-section ride-section2">
        <div className="ride-text">
          <p><strong>Share a Ride</strong><br />
            Share your ride, reduce costs, and help others travel conveniently.</p>
          <Link to="/share-ride" className="ride-button2">Share a Ride</Link>
        </div>
        <img src={offerIcon} alt="Share a Ride" className="ride-image-right" />
      </div>

      <div className="ride-section ride-section3">
        <img src={foundRideIcon} alt="Current Found Ride" className="ride-image-left" />
        <div className="ride-text">
          <p><strong>Current Found Ride</strong><br />
            View your currently booked rides and their details.</p>
          <Link to="/current-found-rides" className="ride-button1">View Ride</Link>
        </div>
      </div>
      
      <div className="ride-section ride-section4">
        <div className="ride-text">
          <p><strong>Current Accepted Ride</strong><br />
            Manage and track the rides you are offering to others.</p>
          <Link to="/current-shared-rides" className="ride-button2">Manage Ride</Link>
        </div>
        <img src={sharedRideIcon} alt="Current Shared Ride" className="ride-image-right" />
      </div>



      <table className="ride-table-new">
      <tbody>
        <tr>
          <td>
            <div className="ridesection5-new">
              <img src={ei1} alt="Current Found Ride" className="ride-image-left-new" />
              <div className="ride-text-new">
                <p><strong>Map</strong><br />
                  View current location of the Journey</p>
                <Link to="#" className="ride-button1-new">View Ride</Link>
              </div>
            </div>
          </td>
          <td>
            <div className="ridesection5-new">
              <img src={ei2} alt="Current Found Ride" className="ride-image-left-new" />
              <div className="ride-text-new">
                <p><strong>Chat</strong><br />
                  Message to inform status of the ride</p>
                <Link to="#" className="ride-button1-new">View Ride</Link>
              </div>
            </div>
          </td>
          <td>
            <div className="ridesection5-new">
              <img src={ei3} alt="Current Found Ride" className="ride-image-left-new" />
              <div className="ride-text-new">
                <p><strong>Payment</strong><br />
                  Pay for your current found rides</p>
                <Link to="#" className="ride-button1-new">View Ride</Link>
              </div>
            </div>
          </td>
          <td>
            <div className="ridesection5-new">
              <img src={ei4} alt="Current Found Ride" className="ride-image-left-new" />
              <div className="ride-text-new">
                <p><strong>Rewards</strong><br />
                  Get reward points for your Vehicle Pooling</p>
                <Link to="#" className="ride-button1-new">View Ride</Link>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>



      {showLogoutModal && (
        <div className="logout-modal">
          <div className="logout-box">
            <p>Are you sure you want to log out?</p>
            <button className="confirm-btn" onClick={confirmLogout}>Yes</button>
            <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Links</h3>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Career</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="footer-section newsletter">
            <h3>Connect with us</h3>
            <input type="email" placeholder="Your Email Address" />
            <button>Submit</button>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>VIT Vellore<br />Vellore, Tamilnadu, IN</p>
            <div className="social-icons">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
