import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import useDocumentTitle from "../../hook/useDocumentTitle";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  useDocumentTitle("Signin");
  const { signInWithEmailAndPasswordFunc, signInWithGoogleFunc, setLoading } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPasswordFunc(email, password)
      .then(() => {
        toast.success("Logged in successfully!");
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message || "Login failed"))
      .finally(() => setLoading(false));
  };

  const handleGoogle = () => {
    setLoading(true);
    signInWithGoogleFunc()
      .then(() => {
        toast.success("Signed in with Google!");
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message || "Google sign-in failed"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700/70 to-pink-500/70">
      <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
          Welcome back
        </h2>
        <p className="text-sm text-white/85 mb-6">
          Sign in to continue to <span className="font-semibold">Creatify</span>
          .
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <span
              className="absolute right-3 top-2/4 -translate-y-2/4 cursor-pointer text-white/80"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="text-right">
            <Link
              to="/forget-password"
              state={{ email }}
              className="text-sm text-white/90 underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-white text-purple-700 font-semibold shadow-md"
          >
            Sign in
          </button>
        </form>

        <div className="my-4 text-center text-gray-400">or</div>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-transparent border-2 border-white/20 text-white cursor-pointer"
        >
          <FcGoogle className="text-2xl" /> Continue with Google
        </button>

        <p className="mt-4 text-center text-sm ">
          Don’t have an account?{" "}
          <Link to="/register" className="text-white underline ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
