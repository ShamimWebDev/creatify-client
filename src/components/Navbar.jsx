import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, signOutFunc, loading } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const avatarRef = React.useRef(null);
  const closeTimerRef = React.useRef(null);

  // Close dropdown when clicking outside and on Escape
  React.useEffect(() => {
    const onDocClick = (e) => {
      // if click is outside avatarRef, close
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") setShowDropdown(false);
    };

    if (showDropdown) {
      document.addEventListener("click", onDocClick);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [showDropdown]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const startCloseTimer = (delay = 150) => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setShowDropdown(false), delay);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutFunc();
      setShowDropdown(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleDropdown = (e) => {
    e && e.stopPropagation();
    setShowDropdown((s) => !s);
  };

  const onAvatarKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDropdown(e);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow">
      {/* Left: Logo + Name */}
      <Link to="/">
        <div className="flex items-center">
          <div className="p-2 rounded-full">
            <img src="logo.PNG" alt="Logo" className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 ml-2">
            Creatify
          </h1>
        </div>
      </Link>

      {/* Center: Navigation Links */}
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
          <Link to="/add-artwork" className="hover:text-purple-600">
            Add Artwork
          </Link>
        </li>
        <li>
          <Link to="/my-gallery" className="hover:text-purple-600">
            My Gallery
          </Link>
        </li>
        <li>
          <Link to="/favorites" className="hover:text-purple-600">
            My Favorites
          </Link>
        </li>
      </ul>

      {/* Right: Auth Buttons / Profile */}
      {loading ? (
        // while auth is initializing, keep space to avoid layout shift
        <div className="w-40" />
      ) : user ? (
        <div className="flex items-center gap-4">
          {/* Profile Image */}
          <div
            ref={avatarRef}
            className="relative w-12 h-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
            onMouseEnter={() => {
              clearCloseTimer();
              setShowDropdown(true);
            }}
            onMouseLeave={() => startCloseTimer()}
            onClick={toggleDropdown}
            role="button"
            tabIndex={0}
            onKeyDown={onAvatarKeyDown}
            aria-expanded={showDropdown}
            aria-haspopup="true"
            title={user.displayName || "Profile"}
          >
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt={user.displayName || "Profile"}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#00FFFF] transition-transform duration-200 ease-in-out"
            />
            <div
              className={`absolute top-14 left-1/2 -translate-x-1/2 bg-gray-800 p-3 rounded shadow-lg text-center z-50 w-max min-w-40 transform origin-top transition-all duration-150 ${
                showDropdown
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
              }`}
              onMouseEnter={() => clearCloseTimer()}
              onMouseLeave={() => startCloseTimer()}
              onClick={(e) => e.stopPropagation()}
              role="menu"
              aria-hidden={!showDropdown}
            >
              <p className="text-white font-semibold text-sm">
                {user.displayName || "N/A"}
              </p>
              <div className="mt-2">
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition text-white text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link to="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-white text-purple-700 border border-purple-500 hover:bg-purple-50">
              Register
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
