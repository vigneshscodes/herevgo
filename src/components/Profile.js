import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig"; // Import Firestore
import { doc, getDoc } from "firebase/firestore"; // Firestore methods
import { onAuthStateChanged } from "firebase/auth"; // Auth listener
import { useNavigate } from "react-router-dom";
import userImg from "../assets/userS.png";
import "../styles/Home.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.email);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.log("No user data found!");
        }
        setLoading(false);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div className="profile-page">Loading user data...</div>;

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      <div className="profile-container">
        <img src={userImg} alt="User profile" className="profile-pic" />
        {userData ? (
          <>
            <p><strong>Hi </strong> {userData.fname} {userData.lname}</p>
            <p><strong>Mobile:</strong> {userData.mobile}</p>
            <p><strong>Email:</strong> {userData.email}</p>
          </>
        ) : (
          <p>User data not found!</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
