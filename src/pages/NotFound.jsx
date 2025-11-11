import React from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hook/useDocumentTitle";

const NotFound = () => {
    useDocumentTitle("NotFound");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-400 mb-6 text-center">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-gradient-to-r from-[#0FB7D1] to-[#4C1D71] rounded-lg font-semibold text-black hover:opacity-90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
