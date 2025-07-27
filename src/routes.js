import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import FindRide from "./components/FindRide";
import ShareRide from "./components/ShareRide";
import Profile from "./components/Profile";
import CurrentFoundRides from "./components/CurrentFoundRides";
import CurrentSharedRides from "./components/CurrentSharedRides";
import About from "./components/About";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/find-ride" element={<FindRide />} />
        <Route path="/share-ride" element={<ShareRide />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Login />} /> 
        <Route path="/current-found-rides" element={<CurrentFoundRides />} />
        <Route path="/current-shared-rides" element={<CurrentSharedRides />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;
