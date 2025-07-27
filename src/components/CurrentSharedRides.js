import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import "../styles/Ride.css";

const CurrentSharedRides = () => {
  const [sharedRides, setSharedRides] = useState([]);
  const [otpInputs, setOtpInputs] = useState({});
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.currentUser) {
      fetchSharedRides();
    } else {
      alert("You need to be logged in to view shared rides.");
    }
  }, []);

  const fetchSharedRides = async () => {
    try {
      const userEmail = auth.currentUser.email;
      const ridesCollection = collection(db, "rides");
      const q = query(ridesCollection, where("userEmail", "==", userEmail));
      const ridesSnapshot = await getDocs(q);

      let rides = [];
      for (const rideDoc of ridesSnapshot.docs) {
        const bookingsCollection = collection(db, "rides", rideDoc.id, "bookings");
        const bookingSnapshot = await getDocs(bookingsCollection);
        bookingSnapshot.forEach((bookingDoc) => {
          const bookingData = bookingDoc.data();
          if (bookingData.status !== "Completed") {
            rides.push({
              id: rideDoc.id,
              bookingId: bookingDoc.id,
              ...rideDoc.data(),
              otp: bookingData.otp,
              status: bookingData.status,
              bookedByEmail: bookingData.userEmail,
            });
          }
        });
      }
      setSharedRides(rides);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching shared rides:", error);
      setLoading(false);
    }
  };

  const handleOtpChange = (event, rideId) => {
    setOtpInputs({ ...otpInputs, [rideId]: event.target.value });
  };

  const handleVerifyOtp = (rideId, correctOtp) => {
    const enteredOtp = (otpInputs[rideId] || "").trim();
    const storedOtp = String(correctOtp).trim();

    if (enteredOtp === storedOtp) {
      setMessages({ ...messages, [rideId]: "Verified" });
    } else {
      setMessages({ ...messages, [rideId]: "Incorrect OTP" });
    }
  };

  if (loading) {
    return <div>Loading shared rides...</div>;
  }

  return (
    <div className="ride-container">
      <h2>Current Shared Rides</h2>
      {sharedRides.length > 0 ? (
        sharedRides.map((ride) => (
          <div key={ride.id} className="ride-item">
            <p><strong>Booked By: </strong>{ride.bookedByEmail.split('.')[0]} [{ride.mobile}]</p>
            <p><strong>From:</strong> {ride.startLocation}</p>
            <p><strong>To:</strong> {ride.destination}</p>
            <p><strong>Time:</strong> {ride.startTime}</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otpInputs[ride.id] || ""}
              onChange={(e) => handleOtpChange(e, ride.id)}
              className="otp-input"
            />
            <button className="verify-btn" onClick={() => handleVerifyOtp(ride.id, ride.otp)}>
              Verify OTP
            </button>
            {messages[ride.id] && <p className="message">{messages[ride.id]}</p>}
          </div>
        ))
      ) : (
        <p>No shared rides available.</p>
      )}
    </div>
  );
};

export default CurrentSharedRides;
