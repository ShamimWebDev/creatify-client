import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, signOutFunc } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const avatarRef = React.useRef(null);

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

  const handleLogout = async () => {
    try {
      await signOutFunc();
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
      <div className="flex items-center">
        <div className="p-2 rounded-full">
          <img src="logo.PNG" alt="Logo" className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 ml-2">Creatify</h1>
      </div>

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

      {/* Right: Auth Buttons / Profile */}
      {user ? (
        <div className="flex items-center gap-4">
          {/* Profile Image */}
          <div
            ref={avatarRef}
            className="relative w-12 h-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
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
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              onClick={(e) => e.stopPropagation()}
              role="menu"
              aria-hidden={!showDropdown}
            >
              <p className="text-white font-semibold text-sm">
                {user.displayName || "N/A"}
              </p>
              <p className="text-white text-xs mb-2">{user.email}</p>
              <div className="flex flex-col gap-2">
                <Link
                  to="/profile"
                  className="text-sm text-white/90 hover:text-purple-400 px-3 py-1 rounded"
                >
                  View Profile
                </Link>
                <Link
                  to="/update-profile"
                  className="text-sm text-white/90 hover:text-purple-400 px-3 py-1 rounded"
                >
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition text-white font-semibold cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link to="/login" className="hover:text-[#00FFFF] transition">
              Login
            </Link>
          </Button>
          <Button className="bg-white text-purple-700 border border-purple-500 hover:bg-purple-50">
            <Link to="/register" className="hover:text-[#00FFFF] transition">
              Register
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
