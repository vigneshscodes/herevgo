import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";
import "../styles/Ride.css";

const CurrentFoundRides = () => {
  const [bookedRides, setBookedRides] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (auth.currentUser) {
      fetchBookedRides();
    } else {
      alert("You need to be logged in to view booked rides.");
    }
  }, []);
  const fetchBookedRides = async () => {
    try {
      const userEmail = auth.currentUser.email;
      const ridesCollection = collection(db, "rides");
      const ridesSnapshot = await getDocs(ridesCollection);
      let foundRides = [];
      for (const rideDoc of ridesSnapshot.docs) {
        const bookingsCollection = collection(db, "rides", rideDoc.id, "bookings");
        const q = query(bookingsCollection, where("userEmail", "==", userEmail));
        const bookingSnapshot = await getDocs(q);
        bookingSnapshot.forEach((bookingDoc) => {
          const bookingData = bookingDoc.data();
          if (bookingData.status !== "Completed") {
            foundRides.push({
              id: rideDoc.id,
              bookingId: bookingDoc.id,
              ...rideDoc.data(),
              otp: bookingData.otp,
              status: bookingData.status,
            });
          }
        });
      }
      setBookedRides(foundRides);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching booked rides:", error);
      setLoading(false);
    }
  };
  const handleCancelRide = async (rideId, bookingId) => {
    try {
      await deleteDoc(doc(db, "rides", rideId, "bookings", bookingId));
      setBookedRides((prevRides) => prevRides.filter((ride) => ride.id !== rideId));

      alert("Ride booking canceled.");
    } catch (error) {
      console.error("Error canceling ride:", error);
      alert("Failed to cancel the ride.");
    }
  };
  const handleCompleteRide = async (rideId, bookingId) => {
    try {
      const bookingRef = doc(db, "rides", rideId, "bookings", bookingId);
      await updateDoc(bookingRef, { status: "Completed" });
      setBookedRides((prevRides) =>
        prevRides.map((ride) =>
          ride.id === rideId ? { ...ride, status: "Completed" } : ride
        )
      );
      alert("Ride marked as completed.");
    } catch (error) {
      console.error("Error completing ride:", error);
      alert("Failed to mark the ride as completed.");
    }
  };
  if (loading) {
    return <div>Loading booked rides...</div>;
  }
  return (
    <div className="ride-container">
      <h2>Current Found Rides</h2>
      {bookedRides.length > 0 ? (
        bookedRides.map((ride) => (
          <div key={ride.id} className="ride-item">
            <p>{ride.fname} {ride.lname} [{ride.mobile}]</p>
            <p><strong>From:</strong> {ride.startLocation}</p>
            <p><strong>To:</strong> {ride.destination}</p>
            <p><strong>Time:</strong> {ride.startTime}</p>
            <p><strong>OTP:</strong> {ride.otp}</p>
            <p><strong>Status:</strong> {ride.status}</p>
            {ride.status !== "Completed" && (
              <button className="cancel-btn" onClick={() => handleCancelRide(ride.id, ride.bookingId)}>
                Cancel Ride
              </button>
            )}
            {ride.status === "Booked" && (
              <button className="complete-btn" onClick={() => handleCompleteRide(ride.id, ride.bookingId)}>
                Ride Completed
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No rides booked or all rides are completed.</p>
      )}
    </div>
  );
};
export default CurrentFoundRides;





