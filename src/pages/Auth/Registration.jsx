import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import useDocumentTitle from "../../hook/useDocumentTitle";

const Registration = () => {
  useDocumentTitle("Registration");

  const {
    user,
    loading,
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    sendEmailVerificationFunc,
    setLoading,
    signOutFunc,
    setUser,
    signInWithGoogleFunc,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // already logged in — redirect to home
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const [form, setForm] = useState({
    name: "",
    photo: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, photo, email, password } = form;

    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+]).{8,}$/;
    if (!regExp.test(password)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number & special char"
      );
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPasswordFunc(email, password);
      await updateProfileFunc(name, photo);
      await sendEmailVerificationFunc();

      // Sign out immediately to redirect user to login page
      await signOutFunc();
      setUser(null);

      toast.success("Registered successfully! Please login.");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      toast.error(err.message || "Registration failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await signInWithGoogleFunc();
      toast.success("Signed in with Google!");
      navigate("/"); // Home page after Google login
    } catch (err) {
      toast.error(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  // don't render while auth initializes to avoid flashing login/register
  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-700/70 to-pink-500/70 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl text-white"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
          Create account
        </h2>
        <p className="text-sm text-white/85 mb-6">
          Join Creatify — showcase your art and connect with the community.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            required
          />
          <input
            name="photo"
            value={form.photo}
            onChange={handleChange}
            placeholder="Photo URL (optional)"
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            required
          />
          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              required
            />
            <span
              className="absolute right-3 top-2/4 -translate-y-2/4 cursor-pointer text-white/80"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-white text-purple-700 font-semibold shadow-md cursor-pointer"
          >
            Create account
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleGoogle}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-transparent border-2 border-white/20 text-white mt-2 cursor-pointer"
          >
            <FcGoogle className="text-2xl " /> Continue with Google
          </motion.button>
        </form>

        <p className="mt-4 text-center text-s">
          Already have an account?{" "}
          <Link to="/login" className="text-white underline ml-1">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Registration;
