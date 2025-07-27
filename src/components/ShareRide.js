import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import "../styles/Ride.css";

const ShareRide = () => {
  const [message, setMessage] = useState("");
  const [userDetails, setUserDetails] = useState({
    fname: "",
    lname: "",
    mobile: "",
  });
  const [rideDetails, setRideDetails] = useState({
    startLocation: "",
    destination: "",
    vehicleType: "",
    vehicleNumber: "",
    startTime: "",
    price: "",
  });
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setMessage("User is not authenticated.");
          return;
        }
        const userEmail = user.email;
        console.log("Fetching user details for:", userEmail); 
        const userRef = doc(db, "users", userEmail);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          console.log("User Data Fetched:", userSnap.data());
          setUserDetails(userSnap.data());
        } else {
          setMessage("User details not found.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setMessage("Failed to fetch user details.");
      }
    };
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchUserDetails();
    });
    return () => unsubscribe(); 
  }, []);
  const handleChange = (e) => {
    setRideDetails({ ...rideDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userDetails.fname) {
      setMessage("Fetching user details... Please wait.");
      return;
    }
    if (!rideDetails.startLocation || !rideDetails.destination || !rideDetails.vehicleType || 
        !rideDetails.vehicleNumber || !rideDetails.startTime || !rideDetails.price) {
      setMessage("All fields are required.");
      return;
    }
    console.log("User Details before submission:", userDetails); // Debugging step
    try {
      await addDoc(collection(db, "rides"), {
        ...rideDetails,
        fname: userDetails.fname,
        lname: userDetails.lname,
        mobile: userDetails.mobile,
        userEmail: auth.currentUser.email,
        timestamp: new Date(),
      });
      setMessage("Ride shared successfully!");
    } catch (error) {
      console.error("Error sharing ride:", error);
      setMessage("Failed to share ride.");
    }
  };
  return (
    <div className="ride-container">
      <h2>Share a Ride</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="share-form">
        <div className="input-group">
          <input type="text" name="startLocation" placeholder="Start Location" onChange={handleChange} />
          <input type="text" name="destination" placeholder="Destination" onChange={handleChange} />
        </div>
        <div className="input-group">
          <input type="text" name="vehicleType" placeholder="Vehicle Type" onChange={handleChange} />
          <input type="text" name="vehicleNumber" placeholder="Vehicle Number" onChange={handleChange} />
        </div>
        <div className="input-group">
          <input type="time" name="startTime" onChange={handleChange} />
          <input type="text" name="price" placeholder="Price" onChange={handleChange} />
        </div>
        <button type="submit" className="share-ride-btn">Submit Ride</button>
      </form>
    </div>
  );
};
export default ShareRide;



