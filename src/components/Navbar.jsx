import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Button from "../ui/Button";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-4 ">
      <div className="flex items-center">
        <div className=" p-2 rounded-full">
          <span className="text-white font-bold text-xl">
            <img src="logo.PNG" alt="Logo" />
          </span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">Creatify</h1>
      </div>
      <ul className="hidden md:flex items-center gap-8 text-gray-600 text-sm font-medium">
        <li>
          <Link to="/" className="hover:text-purple-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/explore" className="hover:text-purple-600">
            Explore Artworks
          </Link>
        </li>
        <li>
          <Link to="/add" className="hover:text-purple-600">
            Add Artwork
          </Link>
        </li>
        <li>
          <Link to="/gallery" className="hover:text-purple-600">
            My Gallery
          </Link>
        </li>
        <li>
          <Link to="/favorites" className="hover:text-purple-600">
            My Favorites
          </Link>
        </li>
      </ul>
      <div className="flex gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Login
        </Button>
        <Button className="bg-white text-purple-700 border border-purple-500 hover:bg-purple-50">
          Register
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
