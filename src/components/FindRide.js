import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/Ride.css";

const FindRide = () => {
  const [rides, setRides] = useState([]);
  const [searchType, setSearchType] = useState("startLocation");
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchRides();
  }, []);
  const fetchRides = async () => {
    try {
      const ridesCollection = collection(db, "rides");
      const querySnapshot = await getDocs(ridesCollection);
      const ridesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRides(ridesData);
    } catch (error) {
      console.error("Error fetching rides:", error);
      setMessage("Failed to load rides.");
    }
  };
  const handleSearch = async () => {
    if (!searchValue) {
      setMessage("Enter a location to search.");
      return;
    }
    try {
      const ridesCollection = collection(db, "rides");
      const q = query(ridesCollection, where(searchType, "==", searchValue));
      const querySnapshot = await getDocs(q);
      const filteredRides = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRides(filteredRides);
      setMessage(filteredRides.length ? "" : "No rides found.");
    } catch (error) {
      console.error("Error searching rides:", error);
      setMessage("Search failed.");
    }
  };
  const handleBookRide = async (rideId) => {
    if (!auth.currentUser) {
      alert("You must be logged in to book a ride.");
      return;
    }

    try {
      const userEmail = auth.currentUser.email;
      const otp = Math.floor(1000 + Math.random() * 9000);
      const bookingRef = doc(db, "rides", rideId, "bookings", userEmail);
      await setDoc(bookingRef, {
        otp: otp,
        userEmail: userEmail,
        bookedAt: new Date(),
        status: "Booked",
      });
      setMessage(`Ride booked successfully!`);
    } catch (error) {
      console.error("Error booking ride:", error);
      alert("Failed to book ride. Try again.");
    }
  };
  return (
    <div className="ride-container">
      <h2>Find a Ride</h2>
      {message && <p className="message">{message}</p>}

      <div className="search-container">
        <select onChange={(e) => setSearchType(e.target.value)} value={searchType}>
          <option value="startLocation">Search by Start Location</option>
          <option value="destination">Search by Destination</option>
        </select>
        <input
          type="text"
          placeholder={`Enter The Location`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
      </div>

      <div className="rides-list">
        {rides.length > 0 ? (
          rides.map((ride) => (
            <div key={ride.id} className="ride-item">
              <p><strong>From:</strong> {ride.startLocation}</p>
              <p><strong>To:</strong> {ride.destination}</p>
              <p><strong>Vehicle:</strong> {ride.vehicleType} ({ride.vehicleNumber})</p>
              <p><strong>Time:</strong> {ride.startTime}</p>
              <p><strong>Price:</strong> {ride.price}</p>
              <p><strong>Name:</strong> {ride.fname} {ride.lname}</p>
              <button className="book-ride-btn" onClick={() => handleBookRide(ride.id)}>Book Ride</button>
            </div>
          ))
        ) : (
          <p>No rides available.</p>
        )}
      </div>
    </div>
  );
};
export default FindRide;



