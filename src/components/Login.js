import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import logo from "../assets/logo.png";
import "../styles/Auth.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const isValidVITEmail = (email) =>
    /^[a-z0-9.]+20(20|21|22|23|24|25)b?@vitstudent\.ac\.in$/.test(email);
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!isValidVITEmail(email)) {
      setMessage("Invalid VIT email format!");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      const userRef = doc(db, "users", userEmail);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        localStorage.setItem("user", JSON.stringify(userData)); 
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/home"), 1500);
      } else {
        setMessage("User data not found in database.");
      }
    } catch (error) {
      setMessage("Login failed! " + error.message);
    }
  };
  return (
    <div className="login-page">
      <img src={logo} alt="HereVGo Logo" className="logo" />
      <p className="subtitle">VIT Dayscholars' Vehicle Pooling WebApp</p>
      <div className="login-container">
        <h2>Login</h2>
        {message && <p className="message1">{message}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="VIT Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/Signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
export default Login;
