import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import logo from "../assets/logo.png";
import "../styles/Auth.css";

function Signup() {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const isValidMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
  const isValidVITEmail = (email) => /^[a-z0-9.]+20(20|21|22|23|24|25)b?@vitstudent\.ac\.in$/.test(email);
  const isValidPassword = (password) => password.length >= 8;

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!isValidMobile(user.mobile)) {
      setMessage("Enter a valid 10-digit mobile number!");
      return;
    }
    if (!isValidVITEmail(user.email)) {
      setMessage("Invalid VIT email format!");
      return;
    }
    if (!isValidPassword(user.password)) {
      setMessage("Password must be at least 8 characters long!");
      return;
    }
    if (user.password !== user.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      await setDoc(doc(db, "users", user.email), {
        fname: user.fname,
        lname: user.lname,
        mobile: user.mobile,
        email: user.email,
      });

      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage("Error signing up! " + error.message);
    }
  };

  return (
    <div className="signup-page">
      <img src={logo} alt="HereVGo Logo" className="logo" />
      <p className="subtitle">VIT Dayscholars' Vehicle Pooling WebApp</p>
      <div className="signup-container">
        <h2>Sign Up</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="First Name" value={user.fname} onChange={(e) => setUser({ ...user, fname: e.target.value })} required />
          <input type="text" placeholder="Last Name" value={user.lname} onChange={(e) => setUser({ ...user, lname: e.target.value })} required />
          <input type="tel" placeholder="Mobile Number" value={user.mobile} onChange={(e) => setUser({ ...user, mobile: e.target.value })} required />
          <input type="email" placeholder="VIT Email ID" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
          <input type="password" placeholder="Confirm Password" value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
